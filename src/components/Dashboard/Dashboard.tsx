import { Link } from "react-router";
import PageLayout from "../Common/PageLayout";

const Dashboard = () => {
  return (
    <PageLayout>
      <div className="px-4 lg:px-20 min-h-screen gap-4 text-center h-full flex bg-black justify-center items-center flex-col w-full">
        <h2 className="text-3xl text-white font-bold">
          Welcome to Goody Streams
        </h2>
        <p className="text-lg text-gray-300">
          Discover the latest movies and TV shows, all in one place.
        </p>
        <div className="mt-6">
          <Link
            to="/movies"
            className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700"
          >
            Explore Movies
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
