import type { Movie } from "../types";
import { getPosterUrl } from "../data/sampleMovies";

type MovieModalProps = {
  movie: Movie;
  onClose: () => void;
};

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}/original${movie.backdrop_path}`
    : undefined;

  return (
    <div
      className="modal-overlay active"
      onClick={onClose}
    >
      <div
        className="modal-dialog"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${movie.title} details`}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close movie details"
        >
          ×
        </button>

        {backdropUrl && (
          <div
            className="modal-backdrop-hero"
            style={{ backgroundImage: `url("${backdropUrl}")` }}
          />
        )}

        <div className="modal-body">
          <img
            className="modal-poster"
            src={getPosterUrl(movie.poster_path)}
            alt={`${movie.title} poster`}
          />

          <div className="modal-content-details">
            <h2 className="modal-title">{movie.title}</h2>

            <div className="modal-meta-row">
              <span className="modal-meta-item">
                {movie.release_date
                  ? movie.release_date.slice(0, 4)
                  : "Release date unknown"}
              </span>

              <span className="modal-meta-item">
                ★ {movie.vote_average.toFixed(1)} / 10
              </span>

              <span className="modal-meta-item">
                {movie.vote_count.toLocaleString()} votes
              </span>
            </div>

            <div>
              <h3 className="modal-overview-heading">Overview</h3>
              <p className="modal-overview">
                {movie.overview || "No overview available."}
              </p>
            </div>

            <div className="modal-footer-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;