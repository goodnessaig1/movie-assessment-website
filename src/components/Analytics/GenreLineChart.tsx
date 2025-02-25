import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Movie } from "../types/movie";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  data: Movie[];
};

const GenreLineChart: React.FC<Props> = ({ data }) => {
  const genreCounts = data.reduce<Record<string, number>>((acc, movie) => {
    acc[movie.genre] = (acc[movie.genre] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(genreCounts),
    datasets: [
      {
        label: "Number of Movies",
        data: Object.values(genreCounts),
        borderColor: "#8884d8",
        backgroundColor: "rgba(136, 132, 216, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Movies by Genre",
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default GenreLineChart;
