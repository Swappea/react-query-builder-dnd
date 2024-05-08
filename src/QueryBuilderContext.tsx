import { createContext, useContext, useState } from 'react';

type SortingState = {
  position: 'top' | 'bottom' | null;
  droppedPath: number[];
  setQBStateHandler: (state: Omit<SortingState, 'setQBStateHandler'>) => void;
};

const context = createContext<SortingState | undefined>(undefined);

export const useQBContext = () => {
  const sContext = useContext(context);
  if (!sContext) {
    throw Error();
  }
  return sContext;
};

export const QBContextProvider = ({ children }) => {
  const [{ droppedPath, position }, setQBState] = useState<
    Omit<SortingState, 'setQBStateHandler'>
  >({
    droppedPath: [],
    position: null,
  });

  const setQBStateHandler = (state: Omit<SortingState, 'setQBStateHandler'>) => {
    setQBState(state);
  };

  return (
    <context.Provider value={{ droppedPath, position, setQBStateHandler }}>
      {children}
    </context.Provider>
  );
};
