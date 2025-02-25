export interface Movie {
  id: number;
  title: string;
  genre: string;
  releaseYear: string;
  language: string;
  rating: string;
  description: string;
  poster: string;
  trailerLink: string | null;
  createdAt: string;
  updatedAt: string;
}

export type MoviesResponse = Movie[];

export interface MovieFormValues {
  title: string;
  genre: string;
  releaseYear: string;
  language: string;
  rating: string;
  description: string;
  poster: File | null | string;
  trailerLink: string;
}
