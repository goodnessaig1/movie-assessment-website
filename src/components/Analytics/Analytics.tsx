import PageLayout from "../Common/PageLayout";
import { useMovie } from "../Contexts/movies";
import GenreLineChart from "./GenreLineChart";
import GenrePopularityChart from "./PieChart";

const Analytics = () => {
  const { movies } = useMovie();
  return (
    <PageLayout>
      <div className="px-4 lg:px-20 min-h-screen py-10 pb-16">
        <h2 className="w-full text-center font-semibold text-2xl">
          Statistics Dashboard
        </h2>
        <div className="flex flex-col w-full gap-10">
          <GenreLineChart data={movies} />
          <GenrePopularityChart />
        </div>
      </div>
    </PageLayout>
  );
};

export default Analytics;
