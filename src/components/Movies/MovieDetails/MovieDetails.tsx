import { useNavigate, useParams } from "react-router";
import PageLayout from "../../Common/PageLayout";
import { useMovie } from "../../hooks/movie.hook";
import { RotatingLines } from "react-loader-spinner";
import VideoPlayer from "./VideoPlayer";
import { IoIosArrowForward } from "react-icons/io";
import { formatDate } from "../../utils/utils";
import OtherMovies from "./OtherMovies";
import { FiShare2 } from "react-icons/fi";

const MovieDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const { isLoading: loadingMovieDetails, data, error } = useMovie(Number(id));
  const movieDetails = data?.data;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Check out this page!",
          url: window.location.href,
        });
        console.log("Page shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.log("Web Share API not supported.");
    }
  };

  return (
    <PageLayout>
      <div className="px-4 lg:px-20 min-h-screen py-16 flex flex-col gap-6">
        <div className="flex flex-row items-center gap-2">
          <div
            onClick={() => navigate(-1)}
            className="flex flex-row items-center gap-2 hover:cursor-pointer hover:text-gray-400 transition duration-300"
          >
            <span className="">Movies</span>
            <IoIosArrowForward />
          </div>
          <span className="text-sm">Movie Details</span>
        </div>
        {error ? (
          <div className="w-full items-center pt-20 text-center text-red-500">
            An error occured, please try again later
          </div>
        ) : loadingMovieDetails ? (
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
          <div className="flex flex-col gap-16a lg:gap-24">
            {movieDetails && (
              <div className="flex flex-col gap-4">
                {movieDetails?.trailerLink && (
                  <VideoPlayer youtubeLink={movieDetails?.trailerLink} />
                )}
                <div className="px-2 md:px-4 flex flex-col gap-2">
                  <div className="flex flex-row items-center justify-between gap-16 w-full">
                    <h3 className="text-2xl font-semibold">
                      {movieDetails.title}({movieDetails.releaseYear})
                    </h3>
                    <div>
                      <div
                        onClick={handleShare}
                        className="bg-gray-100 hover:cursor-pointer hover:bg-gray-200 transition duration-300 size-10 rounded-full flex items-center justify-center"
                      >
                        <FiShare2 color="gray" />
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {formatDate(movieDetails.createdAt)}
                  </span>
                  <div className="text-gray-500 pt-4">
                    <span className="font-medium">Description:</span>{" "}
                    {movieDetails.description}
                  </div>
                  <div className="text-gray-500">
                    <span className="font-medium">Genre:</span>{" "}
                    {movieDetails.genre}
                  </div>
                  <div className="text-gray-500">
                    <span className="font-medium">Language:</span>{" "}
                    {movieDetails.language}
                  </div>
                </div>
              </div>
            )}
            <OtherMovies id={Number(id)} />
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default MovieDetails;
