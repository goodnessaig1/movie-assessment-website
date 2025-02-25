import { Link } from "react-router";
import { Movie } from "../types/movie";
import { HiOutlineDotsVertical } from "react-icons/hi";

interface Props {
  movie: Movie;
  index: number;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setMovieId: React.Dispatch<React.SetStateAction<number | null>>;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MovieCard: React.FC<Props> = ({
  movie,
  index,
  activeIndex,
  setActiveIndex,
  setMovieId,
  setOpenDeleteModal,
}) => {
  const handleDeleteOpen = () => {
    setMovieId(movie.id);
    setActiveIndex(null);
    setOpenDeleteModal(true);
  };
  return (
    <div className="flex w-full flex-col gap-4 shadow-lg pb-4 rounded-lg">
      <div className="w-full">
        <img
          src={movie.poster}
          className="rounded-lg h-[230px] w-full"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-1 px-2">
        <div className="flex flex-row items-center justify-between gap-14">
          <h3 className="line-clamp-1 text-lg font-medium">{movie.title}</h3>
          <div className="">
            <div onClick={() => setActiveIndex(index)}>
              <HiOutlineDotsVertical size={22} color="gray" />
            </div>
            {activeIndex === index && (
              <div className="absolute ml-[-24px] bg-white shadow-lg rounded-lg z-[20]">
                <div className="flex flex-col">
                  <Link
                    to={`/movies/${movie.id}/update-movie`}
                    className="h-9 text-sm items-center flex hover:bg-gray-200  hover:text-gray-500 hover:cursor-pointer rounded-t-lg px-4 "
                  >
                    <span>Edit</span>
                  </Link>
                  <div
                    onClick={handleDeleteOpen}
                    className="h-9 text-sm items-center flex hover:bg-gray-200  hover:text-gray-500 hover:cursor-pointer rounded-t-lg px-4 "
                  >
                    <span>Delete</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <span className="text-gray-500 text-sm">{movie.releaseYear}</span>
        <div className="flex flex-row items-center gap-0.5">
          <span className="font-medium text-sm text-gray-500">Genre:</span>
          <span className="text-gray-500 text-sm">{movie.genre}</span>
        </div>
        <Link
          to={`/movies/${movie.id}/${encodeURIComponent(movie?.title)}`}
          className="mt-2 mb-2 group hover:bg-red-500 transition duration-300 hover:cursor-pointer border border-red-500 rounded-2xl h-10 w-full flex justify-center items-center flex"
        >
          <span className="text-red-500 group-hover:text-white group-hover:font-semibold group-transition group-duration-400 transition duration-300 ease-in-out">
            Watch Video
          </span>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
