import { useMovies } from "../../hooks/movie.hook";
import { MoviesResponse } from "../../types/movie";

type MovieState = {
  isLoading: boolean;
  movies: MoviesResponse;
  moviesError: Error | null;
};

const useMovieHookState = (): MovieState => {
  const { isLoading, data, error } = useMovies();

  return {
    isLoading,
    movies: data?.data || [],
    moviesError: error,
  };
};

export default useMovieHookState;
