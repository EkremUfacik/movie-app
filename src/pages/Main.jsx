import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import SearchMovies from "../components/SearchMovies";

const Main = () => {
  const MD_API_KEY = process.env.REACT_APP_MD_API_KEY;
  const [movies, setMovies] = useState();

  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${MD_API_KEY}`;

  const getMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data);
  };

  useEffect(() => {
    getMovies(url);
  }, []);

  return (
    <>
      <SearchMovies getMovies={getMovies} />
      <MovieCard movies={movies?.results} />
    </>
  );
};

export default Main;
