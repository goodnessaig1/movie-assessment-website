import { useMovies } from "../../hooks/movie.hook";
import { MoviesResponse } from "../../types/movie";

type MovieState = {
  isLoading: boolean;
  movies: MoviesResponse;
};
const useMovieHookState = (): MovieState => {
  const { isLoading, data } = useMovies();

  return {
    isLoading,
    movies: data?.data || [],
  };
};

export default useMovieHookState;
