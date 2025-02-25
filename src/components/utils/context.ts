import {
  Provider,
  createContext as createContextReact,
  useContext as useReactContext,
} from "react";

type ContextCreateResult<ContextType> = {
  Provider: Provider<ContextType | undefined>;
  useContext: () => ContextType;
};

export function createContext<ContextType>(): ContextCreateResult<ContextType> {
  const context = createContextReact<ContextType | undefined>(undefined);
  function useContext() {
    const contextValue = useReactContext(context);

    if (!contextValue) {
      throw new Error("useContext must be inside a Provider with a value");
    }
    return contextValue;
  }
  return { Provider: context.Provider, useContext };
}
