import { motion, AnimatePresence } from "framer-motion";
import { RotatingLines } from "react-loader-spinner";

interface DeleteProps {
  deleteMovie: () => void;
  toggle: () => void;
  loading: boolean;
}

export const DeleteMovieModal: React.FC<DeleteProps> = ({
  deleteMovie,
  toggle,
  loading,
}) => {
  return (
    <div className="fixed z-4 h-screen top-0 left-0 right-0 bottom-0 md:px-7 md:px-0 flex  items-center justify-center bg-transparent">
      <div
        onClick={toggle}
        className="w-full z-4 fixed hover:cursor-pointer h-screen top-0 left-0 right-0 bottom-0 md:px-7 md:px-0 flex  items-center justify-center md:bg-[#758093] md:opacity-[0.5] "
      ></div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          exit={{ opacity: 0, scale: 0.2 }}
          className="bg-white z-[10] flex p-4  gap-2 flex-col md:mt-0 w-full md:w-[320px] h-full md:h-[224px] md:rounded-lg"
        >
          <div className="flex flex-col gap-10 p-3.5">
            <h2 className="text-2xl font-semibold text-main text-center">
              Are you sure you want to delete this movie?
            </h2>
            <div className="flex flex-row gap-4 items-center">
              <button
                onClick={toggle}
                className="bg-gray-400 hover:bg-gray-500 hover:cursor-pointer transition duration-300 rounded-lg w-1/2 h-12 flex items-center justify-center text-white"
              >
                CANCEL
              </button>
              {loading ? (
                <div className="w-1/2 h-12 flex items-center justify-center">
                  <RotatingLines
                    visible={true}
                    width="36"
                    strokeColor="gray"
                    strokeWidth="3"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                  />
                </div>
              ) : (
                <button
                  onClick={() => deleteMovie()}
                  className="bg-red-500 hover:bg-red-600 hover:cursor-pointer transition duration-300 rounded-lg w-1/2 h-12 flex items-center justify-center text-white"
                >
                  YES
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
