import React from 'react';
import styled from '@emotion/styled';
import { useDragAndDrop } from './useDragAndDrop';
import { CSS } from '@dnd-kit/utilities';
import { DragMoveEvent, useDndMonitor } from '@dnd-kit/core';
import { useQBContext } from './QueryBuilderContext';

const RuleContainer = styled.div<{
  isDragging: boolean;
  isOverPathSameAsHookActivePath: boolean;
  position: 'top' | 'bottom' | null;
}>`
  position: relative;
  width: 100%;
  border: 1px solid blue;
  margin: 20px 0;
  cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'grab')};

  ${({ position, isOverPathSameAsHookActivePath, isDragging }) => {
    if (!position || isDragging) {
      return;
    }
    if (position === 'top' && isOverPathSameAsHookActivePath) {
      return `
            &:before {
                content:'';
                position: absolute;
                border: 1px dashed red;
                top: 0%;
                left: 0%;
                width: 100%;
                transform: translate(0, -10px);
            }
        `;
    }
    if (position === 'bottom' && isOverPathSameAsHookActivePath) {
      return `
            &:after {
                content:'';
                position: absolute;
                border: 1px dashed red;
                bottom: 0%;
                left: 0%;
                width: 100%;
                transform: translate(0, 10px);
            }
        `;
    }
  }}
`;

export const Rule = ({ rule, path }) => {
  const {
    isOverPathSameAsHookActivePath,
    isDifferentPath,
    // position,
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

  const { position } = useQBContext();

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <RuleContainer
      isOverPathSameAsHookActivePath={isOverPathSameAsHookActivePath}
      position={position}
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
