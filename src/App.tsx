import styled from '@emotion/styled';

import './App.css';
import { RuleGroup } from './RuleGroup';

import { DATA } from './data';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import { useState } from 'react';
import { QBContextProvider, useQBContext } from './QueryBuilderContext';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const MainContainer = styled.div`
  width: 1000px;
  height: 500px;
  border: 1px solid black;
  padding: 20px;
`;

const findRuleByPath = (query, path) => {
  let level = 0;
  let rule = query;

  while (level < path.length) {
    const index = path[level];
    rule = rule.rules[index];
    level++;
  }

  return rule;
};

const findRuleGroupByPath = (query, path) => {};

const QB = () => {
  const [query, setQuery] = useState(DATA);

  const { position, droppedPath } = useQBContext();

  const onDragStartHandler = (event: DragStartEvent) => {
    console.log('onDragStartHandler', event);
  };
  const onDragOverHandler = (event: DragOverEvent) => {
    console.log('onDragOverHandler', event);
  };
  const onDragEndHandler = (event: DragEndEvent) => {
    if (event) {
      if (
        event.over &&
        event.over.data.current &&
        event.active &&
        event.active.data.current
      ) {
        if (
          JSON.stringify(event.over.data.current.path) ===
          JSON.stringify(event.active.data.current.path)
        ) {
          return;
        }
        console.log(
          '=============onDragEndHandler=============',
          event,
          position,
          droppedPath,
          event.over.data.current.path
        );
        const currentPath: string[] = event.active.data.current.path;
        const targetPath: string[] = event.over.data.current.path;
        // const currentRule = findRuleByPath(query, currentPath);
        // console.log('currentRule', currentPath, currentRule);
      }
    }

    console.log('==========================');
  };
  return (
    <MainContainer>
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragStart={onDragStartHandler}
        onDragOver={onDragOverHandler}
        onDragEnd={onDragEndHandler}>
        <RuleGroup isRootQuery={true} query={query} path={[]} />
      </DndContext>
    </MainContainer>
  );
};

const App = () => {
  return (
    <QBContextProvider>
      <QB />
    </QBContextProvider>
  );
};

export default App;
