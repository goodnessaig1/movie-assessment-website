import PageLayout from "../Common/PageLayout";
import MovieUploadForm from "./MovieUploadForm";

const CreateMovie = () => {
  return (
    <PageLayout>
      <div className="px-4 lg:px-20 min-h-screen py-10 flex gap-4 flex-col w-full items-center justify-center">
        <h2 className="text-gray-900 font-semibold text-2xl">
          Add a new movie
        </h2>
        <div className="w-full mdl:w-[80%]">
          <div className="w-full mdl:border mdl:border-gray-200 rounded-lg mdl:p-8">
            <MovieUploadForm />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CreateMovie;
