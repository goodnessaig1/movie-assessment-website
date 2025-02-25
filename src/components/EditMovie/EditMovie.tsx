import { useParams } from "react-router";
import PageLayout from "../Common/PageLayout";
import MovieUploadForm from "../CreateMovie/MovieUploadForm";
import { useMovie } from "../hooks/movie.hook";
import { RotatingLines } from "react-loader-spinner";

const EditMovie = () => {
  const params = useParams();
  const { id } = params;
  const { isLoading: loadingMovieDetails, data } = useMovie(Number(id));
  const movieDetails = data?.data;
  return (
    <PageLayout>
      <div className="px-4 lg:px-20 min-h-screen py-10 flex gap-4 flex-col w-full items-center">
        <h2 className="text-gray-900 font-semibold text-2xl">Update movie</h2>
        {loadingMovieDetails ? (
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
          <div className="w-full mdl:w-[80%]">
            <div className="w-full mdl:border mdl:border-gray-200 rounded-lg mdl:p-8">
              <MovieUploadForm movieData={movieDetails} />
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default EditMovie;
