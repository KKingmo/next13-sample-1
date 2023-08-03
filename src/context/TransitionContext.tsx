import React, { createContext, useState, FC, ReactNode } from "react";

interface TransitionContextType {
  completed: boolean;
  toggleCompleted: (value: boolean) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  completed: false,
  toggleCompleted: () => {},
});

interface TransitionProviderProps {
  children: ReactNode;
}

export const TransitionProvider: FC<TransitionProviderProps> = ({
  children,
}) => {
  const [completed, setCompleted] = useState<boolean>(false);

  const toggleCompleted = (value: boolean) => {
    setCompleted(value);
  };

  return (
    <TransitionContext.Provider
      value={{
        toggleCompleted,
        completed,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export default TransitionContext;