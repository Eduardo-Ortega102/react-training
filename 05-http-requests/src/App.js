import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import useHttp from "./hooks/use-http";

function App() {
  const [movies, setMovies] = useState([]);
  const { isLoading, error, httpRequest: fetchMovies } = useHttp();

  const fetchMoviesHandler = () => {
    fetchMovies({ url: "https://swapi.dev/api/films/" }, (data) =>
      setMovies(
        data.results.map((movieData) => ({
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        }))
      )
    );
  };

  // with this, the request is sent always when the component is loaded
  useEffect(fetchMoviesHandler, [fetchMovies]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No movies found!</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
