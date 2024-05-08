import { useState } from 'react';
import {
  DragMoveEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import { useCombinedRefs } from './useCombinedRefs';
import { useQBContext } from './QueryBuilderContext';

export const useDragAndDrop = ({ id, data }) => {
  const { setQBStateHandler } = useQBContext();

  const [position, setPosition] = useState<'top' | 'bottom' | null>(null);
  const {
    rect: droppableRect,
    // node,
    isOver,
    setNodeRef: setDroppableNodeRef,
  } = useDroppable({
    id,
    data,
  });
  const {
    active,
    // activatorEvent,
    activeNodeRect: draggableRect,
    attributes,
    setNodeRef: setDraggableNodeRef,
    listeners,
    isDragging,
    over,
    // setActivatorNodeRef,
    transform,
  } = useDraggable({
    id,
    data,
  });
  const setNodeRef = useCombinedRefs(setDroppableNodeRef, setDraggableNodeRef);

  const overDroppablePath = over?.data.current?.path;
  const activeDraggablePath = active?.data.current?.path;
  const hookActivePath = data.path;

  const isDifferentPath =
    Boolean(over) &&
    JSON.stringify(overDroppablePath) !== JSON.stringify(activeDraggablePath);
  const isOverPathSameAsHookActivePath =
    JSON.stringify(overDroppablePath) === JSON.stringify(hookActivePath);

  useDndMonitor({
    onDragMove: (event: DragMoveEvent) => {
      if (
        isOver &&
        active &&
        event.over &&
        isDifferentPath &&
        isOverPathSameAsHookActivePath
      ) {
        console.log('in Rule = onDragMove', event);
        let draggableCenterY;
        if (active.rect.current.translated) {
          draggableCenterY =
            active.rect.current.translated?.top +
            active.rect.current.translated?.height / 2;
        }
        let overCenterY;
        if (over) {
          overCenterY = over.rect.top + over.rect.height / 2;
        }

        if (!draggableCenterY || !overCenterY) {
          return;
        }

        console.log('draggableCenterY: ', draggableCenterY);
        console.log('overCenterY: ', overCenterY);

        if (draggableCenterY < overCenterY) {
          console.log('top', hookActivePath);
          //   if (position === 'top') {
          setPosition('top');
          setQBStateHandler({
            position: 'top',
            droppedPath: overDroppablePath,
          });
          //   }
        } else {
          console.log('bottom', hookActivePath);
          //   if (position === 'bottom') {
          setPosition('bottom');
          setQBStateHandler({
            position: 'bottom',
            droppedPath: overDroppablePath,
          });
          //   }
        }
      }
    },
  });
  //   if (isDifferentPath) {
  //     console.log('useDragAndDrop.ts', hookActivePath, position);
  //   }

  return {
    setNodeRef,
    listeners,
    attributes,
    transform,
    over,
    isDragging,
    isOver,
    active,
    position,
    isDifferentPath,
    isOverPathSameAsHookActivePath,
  };
};
