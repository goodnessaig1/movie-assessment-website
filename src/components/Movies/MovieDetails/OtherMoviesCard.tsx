import { Link } from "react-router";
import { Movie } from "../../types/movie";
import { formatDate } from "../../utils/utils";

interface Props {
  movie: Movie;
}

const OtherMoviesCard = ({ movie }: Props) => {
  return (
    <Link
      to={`/movies/${movie.id}/${movie.title}`}
      className="flex flex-col md:flex-row gap-4 w-full items-start"
    >
      <div className="w-full md:w-[150px]">
        <img
          src={movie.poster}
          className="h-[240px] md:h-[190px] w-full md:w-[150px] rounded-xl object-cover"
          alt="movie-banner-image"
        />
      </div>
      <div className="flex w-full md:w-[80%] flex-col gap-1">
        <h2 className="line-clamp-1 text-lg md:text-xl font-semibold">
          {movie.title}
          <span className="text-gray-500 text-sm md:text-base">
            ({movie.releaseYear})
          </span>
        </h2>
        <span className="text-gray-400 text-sm">
          {formatDate(movie.createdAt)}
        </span>
        <div className="text-gray-500 line-clamp-3">
          <span className="font-medium">Description:</span> {movie.description}
        </div>
        <div className="text-gray-500">
          <span className="font-medium">Genre:</span> {movie.genre}
        </div>
        <div className="text-gray-500">
          <span className="font-medium">Language:</span> {movie.language}
        </div>
      </div>
    </Link>
  );
};

export default OtherMoviesCard;
