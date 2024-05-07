import React from 'react';
import styled from '@emotion/styled';
import { useDragAndDrop } from './useDragAndDrop';
import { CSS } from '@dnd-kit/utilities';
import { DragMoveEvent, useDndMonitor } from '@dnd-kit/core';

const RuleContainer = styled.div<{
  isDragging: boolean;
  isOver: boolean;
  isDifferentPath: boolean;
}>`
  width: 100%;
  border: 1px solid blue;
  margin: 20px 0;
  cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'grab')};
  ${({ isOver }) => {
    if (isOver) {
      return `
            background-color: green;
        `;
    }
  }}
  ${({ isDifferentPath }) => {
    if (isDifferentPath) {
      return `
        border-top: 3px dashed black;
        border-bottom: 3px dashed black;
    `;
    }
  }}
`;

export const Rule = ({ rule, path }) => {
  //   useDndMonitor({
  //     onDragMove: (event: DragMoveEvent, active) => {
  //       console.log('in Rule = onDragMove', event);
  //       let draggableCenterY;
  //       if (active?.rect.current.translated) {
  //         draggableCenterY =
  //           active.rect.current.translated?.top +
  //           active.rect.current.translated?.height / 2;
  //       }
  //       let overCenterY;
  //       if (over) {
  //         overCenterY = over.rect.top + over.rect.height / 2;
  //       }

  //       console.log('draggableCenterY: ', draggableCenterY);
  //       console.log('overCenterY: ', overCenterY);
  //     },
  //   });

  const {
    active,
    setNodeRef,
    attributes,
    listeners,
    transform,
    isDragging,
    isOver,
    over,
  } = useDragAndDrop({
    id: rule.id,
    data: {
      rule,
      path,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  const overDroppablePath = over?.data.current?.path;
  const activeDraggablePath = active?.data.current?.path;

  const isDifferentPath =
    Boolean(over) &&
    JSON.stringify(overDroppablePath) !== JSON.stringify(activeDraggablePath);
  const isOverPathSameAsActivePath =
    JSON.stringify(overDroppablePath) === JSON.stringify(path);
  let x = false;
  // draggable and droppable paths are different...
  // droppable path and active hook path are same
  if (isOver && isOverPathSameAsActivePath) {
    // console.table({ overDroppablePath, activeDraggablePath, path, isDifferentPath })
    x = true;
  }

  return (
    <RuleContainer
      isDifferentPath={x}
      isOver={isOver}
      data-path={JSON.stringify(path)}
      isDragging={isDragging}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}>
      {rule.name}
    </RuleContainer>
  );
};
