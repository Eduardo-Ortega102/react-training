import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

/*const fetchMoviesHandler = () => {
                      fetch("https://swapi.dev/api/films/")
                        .then((response) => response.json())
                        .then((data) =>
                          setMovies(
                            data.results.map((movieData) => ({
                              id: movieData.episode_id,
                              title: movieData.title,
                              openingText: movieData.opening_crawl,
                              releaseDate: movieData.release_date,
                            }))
                          )
                        );
                    };*/
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setMovies(
        data.results.map((movieData) => ({
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        }))
      );
    } catch ($error) {
      setError($error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // with this, the request is sent always when the component is loaded
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

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
