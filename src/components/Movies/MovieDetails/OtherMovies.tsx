import { useMovie } from "../../Contexts/movies";
import OtherMoviesCard from "./OtherMoviesCard";

interface Props {
  id: number;
}

const OtherMovies = ({ id }: Props) => {
  const { movies } = useMovie();
  const otherMovies = movies && movies.filter((movie) => movie.id !== id);
  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-2xl font-semibold">You might also enjoy watching</h4>
      {otherMovies && otherMovies.length > 0 ? (
        <div className="flex flex-col gap-4 md:gap-8">
          {otherMovies.map((movie, index) => (
            <OtherMoviesCard key={index} movie={movie} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default OtherMovies;
