import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BackendResponseFormat, request } from "../utils/api";
import { Movie, MoviesResponse } from "../types/movie";

const CACHE_KEY = "movies";

export const useMovies = () => {
  return useQuery<BackendResponseFormat<MoviesResponse>>({
    queryFn: () =>
      request({
        url: `/movies`,
      }),
    queryKey: [CACHE_KEY],
  });
};

export const useMovie = (id: number) => {
  return useQuery<BackendResponseFormat<Movie>>({
    queryFn: () =>
      request({
        url: `/movies/${id}`,
      }),
    queryKey: [CACHE_KEY, id],
  });
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();
  return useMutation<BackendResponseFormat<Movie>, unknown, number>({
    mutationFn: (id: number) =>
      request({
        url: `/movies/${id}`,
        method: "DELETE",
      }),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY] });
    },
  });
};

export const useCreateMovie = () => {
  const queryClient = useQueryClient();
  return useMutation<BackendResponseFormat<Movie>, unknown, FormData>({
    mutationFn: (formData: FormData) =>
      request({
        url: `/movies`,
        method: "POST",
        body: formData,
      }),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY] });
    },
  });
};

type UpdateMovieData = { id: number; formData: FormData };

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();
  return useMutation<BackendResponseFormat<Movie>, unknown, UpdateMovieData>({
    mutationFn: (data: UpdateMovieData) =>
      request({
        url: `/movies/${data.id}`,
        method: "PUT",
        body: data.formData,
      }),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY] });
    },
  });
};
