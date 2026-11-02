import { useState } from "react";
import type { Movie } from "../types";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import { useAppContext } from "../context/AppContext";

const WatchlistPage = () => {
  const { favorites } = useAppContext();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <main className="main-container">
      <h1>My Watchlist</h1>

      {favorites.length > 0 ? (
        <MovieList
          movies={favorites}
          onMovieClick={setSelectedMovie}
        />
      ) : (
        <div className="empty-state">
          <h2 className="empty-title">Your watchlist is empty</h2>
          <p className="empty-text">
            Add movies to your watchlist by clicking the heart icon.
          </p>
        </div>
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

export default WatchlistPage;