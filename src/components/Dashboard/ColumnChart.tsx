import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CountryColumnChart: React.FC = () => {
  const countryData = [
    { country: "USA", streams: 5000 },
    { country: "UK", streams: 3000 },
    { country: "India", streams: 7000 },
    { country: "Nigeria", streams: 4000 },
    { country: "Germany", streams: 2000 },
    { country: "Canada", streams: 2500 },
    { country: "France", streams: 1800 },
  ];

  const chartData = {
    labels: countryData.map((item) => item.country),
    datasets: [
      {
        label: "Total Streams",
        data: countryData.map((item) => item.streams),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
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
        text: "Most Streamed Movies by Country",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default CountryColumnChart;
