import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import MoviePage from "./pages/MoviePage";
import ForgotPasswordPage from "./pages/PasswordPage";
import RegisterPage from "./pages/RegisterPage";
import SignPage from "./pages/SignPage";
import { Route, Routes } from "react-router-dom";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODUwYWY0Mzc0MjU3N2QxMGUwOTA4MTM4YmUwYWRmNSIsIm5iZiI6MTc1NzIzMTU2OS4zMiwic3ViIjoiNjhiZDM5ZDE1Mzg1MDE0NTFiNGU1ZDkzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.dKy_zn9FWtM_p8bGQzoxEl9jSR413i3ZHUbqEaKkpHA",
  },
};

function App() {
  const [resources, setResources] = useState([]);
  const [upcomingResoures, setUpcomingResources] = useState([]);
  const [genres, setGenres] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  const getGenreName = (id, type) => {
    const genre = genres.filter((genre) => genre.id === id);
    return genre.length > 0 ? genre[0]?.name : `TBD (${type})`;
  };

  const movieUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=1&primary_release_date.lte=${today}&sort_by=release_date.desc`;

  const tvUrl = `https://api.themoviedb.org/3/discover/tv?
  include_adult=true
  &language=en-US
  &sort_by=first_air_date.desc
  &first_air_date.lte=${today}`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [movieRes, tvRes] = await Promise.all([
          fetch(movieUrl, options),
          fetch(tvUrl, options),
        ]);

        const [movieData, tvData] = await Promise.all([
          movieRes.json(),
          tvRes.json(),
        ]);

        const movies = movieData.results
          .map((movie) => ({
            id: movie.id,
            type: "movie",
            title: movie.title,
            overview: movie.overview,
            date: movie.release_date,
            poster: movie.poster_path,
          }))
          .slice(0, 10);

        const shows = tvData.results
          .map((tv) => ({
            id: tv.id,
            type: "tv",
            title: tv.name,
            overview: tv.overview,
            date: tv.first_air_date,
            poster: tv.poster_path,
          }))
          .slice(0, 10);

        // console.log(movies);

        const combined = [...movies, ...shows].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setResources(combined);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const movieUrl = "https://api.themoviedb.org/3/genre/movie/list";
    const tvUrl = "https://api.themoviedb.org/3/genre/tv/list";

    const fetchGenres = async () => {
      try {
        const [movieResource, tvResource] = await Promise.all([
          fetch(movieUrl, options),
          fetch(tvUrl, options),
        ]);

        const [movieData, tvData] = await Promise.all([
          movieResource.json(),
          tvResource.json(),
        ]);

        const movies = movieData.genres.map((movie) => ({
          id: movie.id,
          name: movie.name,
        }));

        const shows = tvData.genres.map((tv) => ({
          id: tv.id,
          name: tv.name,
        }));

        const combined = [...movies, ...shows];
        setGenres(combined);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const movieUrl = `https://api.themoviedb.org/3/movie/upcoming?include_adult=true&page=1&primary_release_date.gte=${today}&sort_by=primary_release_date.asc`;
    const tvUrl = `https://api.themoviedb.org/3/discover/tv?first_air_date.gte=${today}&include_adult=true&sort_by=first_air_date.asc`;

    if (genres.length === 0) return;
    const fetchUpcomingResources = async () => {
      try {
        const [movieRes, tvRes] = await Promise.all([
          fetch(movieUrl, options),
          fetch(tvUrl, options),
        ]);

        const [movieData, tvData] = await Promise.all([
          movieRes.json(),
          tvRes.json(),
        ]);

        const movies = movieData.results
          .map((movie) => ({
            id: movie.id,
            type: "movie",
            title: movie.title,
            overview: movie.overview,
            date: movie.release_date,
            poster: movie.poster_path,
            genre: getGenreName(movie.genre_ids?.[0], "Movie"),
          }))
          .slice(0, 10);

        const shows = tvData.results
          .map((tv) => ({
            id: tv.id,
            type: "tv",
            title: tv.name,
            overview: tv.overview,
            date: tv.first_air_date,
            poster: tv.poster_path,
            genreId: tv.genre_ids?.[0],
            genre: getGenreName(tv.genre_ids?.[0], "Tv"),
          }))
          .slice(0, 10);

        const combined = [...movies, ...shows].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setUpcomingResources(combined);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUpcomingResources();
  }, [genres]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home resources={resources} upcomingResoures={upcomingResoures} />
          }
        ></Route>
        <Route
          path="/:resourceType/:resourceId"
          element={<MoviePage genres={genres} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
