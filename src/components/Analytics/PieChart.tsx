import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const genreData = [
  { name: "Action", value: 400 },
  { name: "Comedy", value: 300 },
  { name: "Drama", value: 250 },
  { name: "Horror", value: 200 },
  { name: "Sci-Fi", value: 180 },
  { name: "Romance", value: 150 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF5C8D",
];
const GenrePopularityChart: React.FC = () => {
  return (
    <div className="w-full h-96 flex flex-col justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={genreData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {genreData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
      <h4 className="py-4 text-base md:text-2xl text-center">
        Most watched movie
      </h4>
    </div>
  );
};

export default GenrePopularityChart;
