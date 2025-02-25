import { Route, Routes } from "react-router";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Movies from "./components/Movies/Movies";
import CreateMovie from "./components/CreateMovie/CreateMovie";
import MovieDetails from "./components/Movies/MovieDetails/MovieDetails";
import EditMovie from "./components/EditMovie/EditMovie";
import Analytics from "./components/Analytics/Analytics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/create-movie" element={<CreateMovie />} />
      <Route path="/movies/:id/:title" element={<MovieDetails />} />
      <Route path="/movies/:id/update-movie" element={<EditMovie />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
}

export default App;
