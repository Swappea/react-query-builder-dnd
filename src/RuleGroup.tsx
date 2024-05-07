import React from 'react';
import styled from '@emotion/styled';
import { Rule } from './Rule';

const RuleGroupContainer = styled.div<{ isRootQuery: boolean }>`
  margin-left: ${({ isRootQuery }) => (isRootQuery ? '0px' : '20px')};
  border: 1px solid red;
  margin-top: 20px;
`;

export const RuleGroup = ({ isRootQuery, query, path }) => {
  return (
    <RuleGroupContainer isRootQuery={isRootQuery}>
      {query.rules.map((rule, index) => {
        if ('combinator' in rule) {
          return (
            <RuleGroup
              key={rule.id}
              isRootQuery={false}
              query={rule}
              path={[...path, index]}
            />
          );
        }
        return <Rule path={[...path, index]} key={rule.id} rule={rule}></Rule>;
      })}
      <button>Add</button>
    </RuleGroupContainer>
  );
};
