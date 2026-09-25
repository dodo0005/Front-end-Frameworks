import { useState } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { SAMPLE_MOVIES } from "./data/sampleMovies";

const App = () => {
  const [movies] = useState(SAMPLE_MOVIES);
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
    <div className="app-layout">
      <header>
        <h1>Movie App</h1>

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
      </header>

      <main>
  {filteredMovies.length > 0 ? (
    <MovieList movies={filteredMovies} />
  ) : (
    <p>No movies found.</p>
  )}
</main>
    </div>
  );
};

export default App;