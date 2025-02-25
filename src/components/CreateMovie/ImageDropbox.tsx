// import { useState } from "react";
import { ErrorMessage, FormikProps } from "formik";
import { FiUploadCloud } from "react-icons/fi";

interface ImageUploadProps {
  name: string;
  posterImg?: string;
  posterPreview: string | null;
  setPosterPreview: React.Dispatch<React.SetStateAction<string | null>>;
  setFieldValue: FormikProps<{ [key: string]: File | null }>["setFieldValue"];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  name,
  setFieldValue,
  posterPreview,
  setPosterPreview,
  posterImg,
}) => {
  const handleFileChange = (file: File | null) => {
    if (file) {
      setFieldValue(name, file);
      setPosterPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0] || null;
    handleFileChange(file);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor="fileInput">Poster Image:</label>
      <div
        className="border-2 w-[230px] h-[250px] border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer transition duration-300 hover:bg-gray-100"
        onClick={() => document.getElementById("fileInput")?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {posterPreview || posterImg ? (
          <img
            src={posterPreview ?? posterImg}
            alt="Poster Preview"
            className="size-full rounded-lg object-cover mx-auto"
          />
        ) : (
          <div className="flex flex-col h-full gap-4 items-center justify-center">
            <p className="text-gray-500">Click or Drag & Drop an image here</p>
            <FiUploadCloud color="gray" size={28} />
          </div>
        )}
      </div>

      <input
        id="fileInput"
        type="file"
        name={name}
        accept="image/*"
        className="hidden"
        onChange={(event) => handleFileChange(event.target.files?.[0] || null)}
      />

      <ErrorMessage
        name={name}
        component="div"
        className="px-2 text-xs text-red-500"
      />
    </div>
  );
};

export default ImageUpload;
