import { Link } from "react-router";
import PageLayout from "../Common/PageLayout";
import { IoAddSharp } from "react-icons/io5";
import { useMovie } from "../Contexts/movies";
import { CiYoutube } from "react-icons/ci";
import { BiMoviePlay } from "react-icons/bi";
import GenreLineChart from "./GenreLineChart";
import { formatDate } from "../utils/utils";
import { MdVideoLibrary } from "react-icons/md";
import CountryColumnChart from "./ColumnChart";
import Loading from "../utils/Loading";

const Dashboard = () => {
  const { movies, isLoading, moviesError } = useMovie();
  return (
    <PageLayout>
      <div className="px-4 lg:px-20 min-h-screen flex flex-col gap-8 py-6">
        <div className="flex flex-row items-end justify-end">
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
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
          <div className="shadow-lg w-full border border-[#E0E2E7] h-[130px] rounded-lg p-4 flex flex-col gap-2.5">
            <div className="size-7 rounded-full items-center justify-center flex bg-gray-100">
              <MdVideoLibrary />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-medium text-gray-900">
                Total Movies
              </span>
              <div className="flex flex-row items-center gap-2">
                <span className="font-inter font-semibold text-[#333843]">
                  {movies?.length}
                </span>
              </div>
            </div>
          </div>
          <div className="shadow-lg w-full border border-[#E0E2E7] h-[130px] rounded-lg p-4 flex flex-col gap-2.5">
            <div className="size-7 rounded-full items-center justify-center flex bg-gray-100">
              <CiYoutube color="red" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-medium text-gray-900">
                Most Watched genre
              </span>
              <div className="flex flex-row items-center gap-2">
                <span className="font-inter font-semibold text-[#333843]">
                  Action
                </span>
              </div>
            </div>
          </div>
          <div className="shadow-lg w-full border border-[#E0E2E7] h-[130px] rounded-lg p-4 flex flex-col gap-2.5">
            <div className="size-7 rounded-full items-center justify-center flex bg-gray-100">
              <BiMoviePlay color="gray" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-medium text-gray-900">
                Views today
              </span>
              <div className="flex flex-row items-center gap-2">
                <span className="font-inter font-semibold text-[#333843]">
                  560,802
                </span>
              </div>
            </div>
          </div>
        </div>
        {moviesError ? (
          <div className="w-full items-center pt-20 text-center text-red-500">
            An error occured, please try again later
          </div>
        ) : isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col lg:flex-row items-start w-full gap-10">
            <div className="w-full lg:w-[60%] flex flex-col gap-10">
              <div className="border border-[#E0E2E7] rounded-xl p-4 lg:p-6 shadow-lg">
                <GenreLineChart data={movies} />
              </div>
              <div className="border border-[#E0E2E7] rounded-xl p-4 lg:p-6 shadow-lg">
                <CountryColumnChart />
              </div>
            </div>
            <div className="w-full lg:w-[40%] rounded-xl p-4 lg:p-6 border border-[#E0E2E7] shadow-lg flex flex-col gap-2">
              <h2 className="text-xl font-semibold pb-2">Latest movies</h2>
              {movies &&
                movies.slice(0, 8).map((movie, index) => (
                  <div
                    key={index}
                    className="flex py-2 border-b border-[#f1f1f1] flex-row items-center gap-4"
                  >
                    <div className="size-12">
                      <img
                        src={movie?.poster}
                        className="size-12 rounded-full object-cover"
                        alt="poster-img"
                      />
                    </div>
                    <div className="w-[80%] flex flex-col gap-1">
                      <h3 className="font-medium line-clamp-1">
                        {movie?.title}
                      </h3>
                      <span className="text-gray-400 text-sm">
                        {formatDate(movie?.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              <div className="flex items-center justify-center pt-4">
                <Link
                  to={"/movies"}
                  className="bg-black hover:bg-gray-600 rounded-xl transition duration-300 text-white px-6 py-2"
                >
                  View all
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Dashboard;
