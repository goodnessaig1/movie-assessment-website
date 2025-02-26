import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ImageUpload from "./ImageDropbox";
import { useCreateMovie, useUpdateMovie } from "../hooks/movie.hook";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Movie, MovieFormValues } from "../types/movie";
import { useNavigate } from "react-router";

export const genres = ["Action", "Comedy", "Horror", "Romance", "Drama"];
const languages = ["English", "French", "Spanish"];

interface Props {
  movieData?: Movie;
}

const MovieUploadForm: React.FC<Props> = ({ movieData }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 25 }, (_, i) => currentYear - i);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const isEditing = !!movieData;

  const {
    mutate: createMovie,
    isPending: isCreatingMovie,
    isSuccess: isMovieCreated,
  } = useCreateMovie();

  const {
    mutate: updateMovie,
    isPending: isUpdatingMovie,
    isSuccess: isMovieUpdated,
  } = useUpdateMovie();

  const isRequesting = isCreatingMovie || isUpdatingMovie;

  useEffect(() => {
    if (isMovieCreated || isMovieUpdated) {
      toast(`Successfully ${isEditing ? "updated!" : "created!"}`, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    }
  }, [isMovieCreated, isMovieUpdated]);

  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]+/;

  const validationSchema = Yup.object({
    title: Yup.string().required("Movie title is required"),
    genre: Yup.string().required("Genre is required"),
    releaseYear: Yup.number()
      .min(1900, "Year must be valid")
      .max(new Date().getFullYear(), "Year cannot be in the future")
      .required("Release year is required"),
    language: Yup.string().required("Language is required"),
    rating: Yup.string().required("Rating is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .required("Description is required"),
    poster: isEditing
      ? Yup.mixed()
      : Yup.mixed().required("Poster image is required"),
    trailerLink: Yup.string()
      .matches(youtubeRegex, "Enter a valid YouTube link")
      .required("Movie link is required"),
  });

  const initialValues: MovieFormValues = {
    title: movieData?.title || "",
    genre: movieData?.genre || "",
    releaseYear: movieData?.releaseYear || "",
    language: movieData?.language || "",
    rating: movieData?.rating || "",
    description: movieData?.description || "",
    poster: movieData?.poster || null,
    trailerLink: movieData?.trailerLink || "",
  };

  const handleSubmit = async (values: MovieFormValues) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("genre", values.genre);
    formData.append("releaseYear", values.releaseYear);
    formData.append("language", values.language);
    formData.append("trailerLink", values.trailerLink);
    formData.append("rating", values.rating);
    formData.append("description", values.description);
    if (values.poster instanceof File) {
      formData.append("poster", values.poster);
    }
    if (isEditing) {
      updateMovie(
        {
          id: movieData.id,
          formData: formData,
        },
        {
          onSuccess: () => {
            navigate("/movies");
          },
        }
      );
    } else {
      createMovie(formData, {
        onSuccess: () => {
          navigate("/movies");
        },
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form
          role="form"
          data-testid="create-movie-form"
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5 w-full">
              <label htmlFor="title" className="text-sm md:text-base">
                Movie Title*
              </label>
              <Field
                className="border rounded-lg border-gray-200 h-10 px-2 outline-none"
                type="text"
                id="title"
                name="title"
                placeholder="Enter movie title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="px-2 text-xs text-red-500"
              />
            </div>

            <div className="flex flex-col md:flex-row items-start gap-6 w-full">
              <div className="flex flex-col gap-1.5 w-full md:w-1/2">
                <label htmlFor="genre" className="text-sm md:text-base">
                  Genre:
                </label>
                <Field
                  as="select"
                  id="genre"
                  name="genre"
                  className="w-full text-gray-600 outline-none px-2 py-2 rounded-lg shadow-[#1018280D] border border-[#D0D5DD]"
                  value={values?.genre}
                  onChange={(e: { target: { value: string } }) =>
                    setFieldValue("genre", e.target.value)
                  }
                >
                  <option value="">Select Genre</option>
                  {genres.map((genre, index) => (
                    <option className="text-gray-600" key={index} value={genre}>
                      {genre}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="genre"
                  component="div"
                  className="px-2 text-xs text-red-500"
                />
              </div>

              <div className="flex flex-col gap-1.5 w-full md:w-1/2">
                <label htmlFor="releaseYear" className="text-sm md:text-base">
                  Release Year:
                </label>
                <Field
                  as="select"
                  id="releaseYear"
                  name="releaseYear"
                  className="w-full text-gray-600 outline-none px-2 py-2 rounded-lg shadow-[#1018280D] border border-[#D0D5DD]"
                  value={values?.releaseYear}
                  onChange={(e: { target: { value: string } }) =>
                    setFieldValue("releaseYear", e.target.value)
                  }
                >
                  <option value="">Select Release Year</option>
                  {years.map((year, index) => (
                    <option
                      className="w-full text-gray-600"
                      key={index}
                      value={year}
                    >
                      {year}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="releaseYear"
                  component="div"
                  className="px-2 text-xs text-red-500"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-6 w-full">
              <div className="flex flex-col gap-1.5 w-full md:w-1/2">
                <label htmlFor="language" className="text-sm md:text-base">
                  Language:
                </label>
                <Field
                  as="select"
                  id="language"
                  name="language"
                  className="w-full text-gray-600 outline-none px-2 py-2 rounded-lg shadow-[#1018280D] border border-[#D0D5DD]"
                  value={values?.language}
                  onChange={(e: { target: { value: string } }) =>
                    setFieldValue("language", e.target.value)
                  }
                >
                  <option value="">Select Language</option>
                  {languages.map((language, index) => (
                    <option
                      className=" text-gray-600"
                      key={index}
                      value={language}
                    >
                      {language}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="language"
                  component="div"
                  className="px-2 text-xs text-red-500"
                />
              </div>

              <div className="flex flex-col gap-1.5 w-full md:w-1/2">
                <label htmlFor="rating" className="text-sm md:text-base">
                  Rating (e.g. PG-13, R, G):
                </label>
                <Field
                  type="text"
                  id="rating"
                  className="border rounded-lg border-gray-200 h-10 px-2 outline-none"
                  name="rating"
                />
                <ErrorMessage
                  name="rating"
                  component="div"
                  className="px-2 text-xs text-red-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="trailerLink" className="text-sm md:text-base">
                Movie Link:
              </label>
              <Field
                type="text"
                id="trailerLink"
                className="border rounded-lg border-gray-200 h-10 px-2 outline-none"
                name="trailerLink"
                placeholder="eg: https://youtu.be/nv....."
              />
              <ErrorMessage
                name="trailerLink"
                component="div"
                className="px-2 text-xs text-red-500"
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label htmlFor="description" className="text-sm md:text-base">
                Description:
              </label>
              <Field
                as="textarea"
                rows={3}
                id="description"
                placeholder="Enter description..."
                className="border rounded-lg resize-none border-gray-200 p-2 outline-none"
                name="description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="px-2 text-xs text-red-500"
              />
            </div>

            <ImageUpload
              setFieldValue={setFieldValue}
              name="poster"
              setPosterPreview={setPosterPreview}
              posterPreview={posterPreview}
              posterImg={movieData?.poster}
            />

            <div className="flex items-center pt-6 justify-center">
              {isRequesting ? (
                <div className="py-1">
                  <ThreeDots color="black" />
                </div>
              ) : (
                <button
                  className="px-4 py-2 rounded-xl bg-black hover:bg-gray-500 transiton duration-300 text-white"
                  type="submit"
                >
                  {isEditing ? "Update Movie" : "Upload Movie"}
                </button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MovieUploadForm;
