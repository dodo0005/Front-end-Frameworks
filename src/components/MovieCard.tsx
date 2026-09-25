import { useState } from "react";
import type { MouseEvent } from "react";
import type { Movie } from "../types";
import { getPosterUrl } from "../data/sampleMovies";
import { getGenreNames } from "../data/genres";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleFavourite = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsFavourite((previous) => !previous);
  };

  return (
    <article
      className="movie-card"
      tabIndex={0}
      aria-label={movie.title}
      onClick={onClick}
    >
      <div className="poster-wrapper">
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
          className="poster-img"
          loading="lazy"
        />

        <div className="poster-overlay">
          <div className="card-top-badges">
            <span className="rating-badge">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {movie.vote_average.toFixed(1)}
            </span>

            <button
              type="button"
              className={`favorite-btn ${
                isFavourite ? "is-favorite" : ""
              }`}
              title={
                isFavourite
                  ? "Remove from Favourites"
                  : "Add to Favourites"
              }
              aria-label={
                isFavourite
                  ? "Remove from Favourites"
                  : "Add to Favourites"
              }
              onClick={toggleFavourite}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={isFavourite ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          <span className="quick-view-hint">View Details</span>
        </div>
      </div>

      <div className="movie-card-info">
        <h2 className="movie-card-title">{movie.title}</h2>

        <div className="movie-card-meta">
          <span>{movie.release_date.slice(0, 4) || "N/A"}</span>
          <span>{movie.vote_count.toLocaleString()} votes</span>
        </div>

        <div className="movie-genres-tags">
          {getGenreNames(movie.genre_ids)}
        </div>
      </div>
    </article>
  );
};

export default MovieCard;