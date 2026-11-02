import { useEffect, useState } from "react";
import type { Movie } from "../types";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import { useMovies } from "../hooks/useMovies";

type HomePageProps = {
  searchQuery: string;
};

const HomePage = ({ searchQuery }: HomePageProps) => {
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [moviesPerPage, setMoviesPerPage] = useState(10);

  const { movies, isLoading, error, totalPages } = useMovies(
  currentPage,
  searchQuery
);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, minRating]);

  const filteredMovies = movies.filter((movie) => {
  return movie.vote_average >= minRating;
});

  const displayedMovies = filteredMovies.slice(0, moviesPerPage);

  return (
    <main className="main-container">
      {/* Filters and display settings */}
      <div className="movie-controls">
        <label className="rating-control">
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

        <div className="page-size-control">
          <label htmlFor="movies-per-page">Movies per page:</label>
          <select
            id="movies-per-page"
            value={moviesPerPage}
            onChange={(event) => {
              setMoviesPerPage(Number(event.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* Loading and error messages */}
      {isLoading && <p>Loading movies...</p>}

      {error && <p role="alert">{error}</p>}

      {/* Movie list */}
      {!isLoading && !error && (
        <>
          {displayedMovies.length > 0 ? (
            <MovieList
              movies={displayedMovies}
              onMovieClick={setSelectedMovie}
            />
          ) : (
            <p>No movies found.</p>
          )}
        </>
      )}

      {/* Bottom pagination - only one set */}
      {!isLoading && !error && (
        <div className="pagination-container">
          <button
            type="button"
            className="page-btn"
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            className="page-btn"
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Movie details modal */}
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
