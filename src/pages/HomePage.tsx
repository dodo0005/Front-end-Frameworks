
import { useState } from "react";
import type { Movie } from "../types";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import { useMovies } from "../hooks/useMovies";

type HomePageProps = {
  searchQuery: string;
};

const HomePage = ({ searchQuery }: HomePageProps) => {
  const { movies, isLoading, error } = useMovies();

  const [minRating, setMinRating] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const filteredMovies = movies.filter((movie) => {
    const matchesQuery = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesRating = movie.vote_average >= minRating;

    return matchesQuery && matchesRating;
  });

  return (
    <main className="main-container">
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

      {error && <p role="alert">{error}</p>}

      {!isLoading && !error && (
        <>
          {filteredMovies.length > 0 ? (
            <MovieList
              movies={filteredMovies}
              onMovieClick={setSelectedMovie}
            />
          ) : (
            <p>No movies found.</p>
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </main>
  );
};

export default HomePage;
