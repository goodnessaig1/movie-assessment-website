import { IoAddSharp } from "react-icons/io5";
import PageLayout from "../Common/PageLayout";
import { Link } from "react-router";
import { useMovie } from "../Contexts/movies";
import { RotatingLines } from "react-loader-spinner";
import MovieCard from "./MovieCard";
import { CiSearch } from "react-icons/ci";
import { useMemo, useState } from "react";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { genres } from "../CreateMovie/MovieUploadForm";
import { useDeleteMovie } from "../hooks/movie.hook";
import { DeleteMovieModal } from "../Modals/DeleteMovieModal";
import { toast } from "react-toastify";

const Movies = () => {
  const { movies, isLoading } = useMovie();
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [movieId, setMovieId] = useState<number | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { mutate, isPending } = useDeleteMovie();

  const [selectedGenre, setSelectedGenre] = useState("All");

  const filteredMovies = useMemo(() => {
    return movies
      ? movies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase()) &&
            (selectedGenre === "All" || movie.genre === selectedGenre)
        )
      : [];
  }, [movies, search, selectedGenre]);

  const sortedMovies = useMemo(() => {
    return [...filteredMovies].sort(
      (a, b) => genres.indexOf(a.genre) - genres.indexOf(b.genre)
    );
  }, [filteredMovies]);

  const toggleDelete = () => {
    setOpenDeleteModal(false);
    setMovieId(null);
  };

  const deleteMovie = () => {
    if (movieId) {
      mutate(movieId, {
        onSuccess: () => {
          toast("Successfully deleted!", {
            position: "top-right",
            autoClose: 5000,
            theme: "light",
          });
          toggleDelete();
        },
        onError: () => {
          toast.error("An error occured", { position: "top-right" });
        },
      });
    }
  };

  return (
    <PageLayout>
      <div className="px-4 lg:px-20 min-h-screen flex flex-col gap-10 py-6">
        {activeIndex && (
          <div
            onClick={() => setActiveIndex(null)}
            className="w-full z-[10] fixed hover:cursor-pointer h-screen top-0 left-0 right-0 bottom-0 md:px-[28px] md:px-0 flex  items-center justify-center"
          />
        )}

        {openDeleteModal && (
          <DeleteMovieModal
            deleteMovie={deleteMovie}
            toggle={toggleDelete}
            loading={isPending}
          />
        )}

        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 bg-gray-100 px-2 items-center rounded-xl h-10 max-w-[340px] w-full">
              <CiSearch color="gray" />
              <input
                type="text"
                placeholder="Search movies by title..."
                value={search}
                className="bg-transparent text-gray-400 text-sm outline-none w-full"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              value={selectedGenre}
              className="w-[150px] text-gray-600 outline-none px-2 py-2 rounded-lg shadow-[#1018280D] border border-[#D0D5DD]"
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="All">Sort by genre</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <Link
            to={"/movies/create-movie"}
            className="py-2 px-4 rounded-xl bg-black hover:bg-gray-700 transition duration-300 flex flex-row items-center gap-2"
          >
            <IoAddSharp className="size-6 md:size-4" color="white" />
            <span className="hidden md:block text-center text-white font-medium">
              Add Movie
            </span>
          </Link>
        </div>
        {isLoading ? (
          <div className="w-full flex items-center justify-center h-[40vh]">
            <RotatingLines
              visible={true}
              width="60"
              strokeColor="gray"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          </div>
        ) : (
          <div className="">
            {sortedMovies.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedMovies.map((movie, index) => (
                  <MovieCard
                    movie={movie}
                    index={index}
                    key={index}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    setMovieId={setMovieId}
                    setOpenDeleteModal={setOpenDeleteModal}
                  />
                ))}
              </div>
            ) : (
              <div className="h-[40vh] w-full flex flex-col gap-3 items-center justify-center gap-2">
                <HiOutlineEmojiHappy color="gray" size={34} />
                <p>No movies found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Movies;
