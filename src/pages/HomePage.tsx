import { useState } from "react";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import { useMovies } from "../hooks/useMovies";

const HomePage = () => {
  const { movies, isLoading, error } = useMovies();

  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);

  const filteredMovies = movies.filter((movie) => {
    const matchesQuery = movie.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesRating = movie.vote_average >= minRating;

    return matchesQuery && matchesRating;
  });

  return (
    <main>
      <SearchBar
        query={query}
        onChange={setQuery}
      />

      <label>
        Minimum rating: {minRating}

        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={minRating}
          onChange={(event) =>
            setMinRating(Number(event.target.value))
          }
        />
      </label>

      {isLoading && <p>Loading movies...</p>}

      {error && (
        <p role="alert">
          {error}
        </p>
      )}

      {!isLoading && !error && (
        filteredMovies.length > 0 ? (
          <MovieList movies={filteredMovies} />
        ) : (
          <p>No movies found.</p>
        )
      )}
    </main>
  );
};

export default HomePage;