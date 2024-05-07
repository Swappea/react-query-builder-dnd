import { useDraggable, useDroppable } from '@dnd-kit/core';
import { useCombinedRefs } from './useCombinedRefs';

const getIfDraggableRectIsAtTopOrBottomOfDroppableRect = ({
  droppableRect,
  draggableRect,
}) => {
    console.log('getIfDraggableRectIsAtTopOrBottomOfDroppableRect', droppableRect, draggableRect);
};

export const useDragAndDrop = ({ id, data }) => {
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
  getIfDraggableRectIsAtTopOrBottomOfDroppableRect({
    droppableRect,
    draggableRect,
  });
  return {
    setNodeRef,
    listeners,
    attributes,
    transform,
    over,
    isDragging,
    isOver,
    active,
  };
};
