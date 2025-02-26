import { RotatingLines } from "react-loader-spinner";

const Loading = () => {
  return (
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
  );
};

export default Loading;
