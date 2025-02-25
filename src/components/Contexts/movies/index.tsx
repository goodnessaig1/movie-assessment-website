import type { FC, PropsWithChildren } from "react";
import { createContext } from "../../utils/context";
import useMovieHookState from "./movie.hook";

const MovieContext = createContext<ReturnType<typeof useMovieHookState>>();

export const useMovie = MovieContext.useContext;

const MovieProvider: FC<PropsWithChildren> = ({ children }) => {
  const state = useMovieHookState();

  return (
    <MovieContext.Provider value={state}>{children}</MovieContext.Provider>
  );
};

export default MovieProvider;
