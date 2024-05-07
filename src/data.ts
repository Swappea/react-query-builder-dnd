import { v4 as uuid } from 'uuid';

export const DATA = {
  id: uuid(),
  combinator: 'AND',
  rules: [
    {
      id: uuid(),
      name: 'Factor A',
    },
    {
      id: uuid(),
      name: 'Factor B',
    },
    {
      id: uuid(),
      name: 'Factor C',
    },
    {
      id: uuid(),
      combinator: 'OR',
      rules: [
        {
          id: uuid(),
          name: 'Factor D',
        },
        {
          id: uuid(),
          name: 'Factor E',
        },
      ],
    },
  ],
};
