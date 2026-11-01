import type { Movie } from "../types";
import MovieCard from "./MovieCard";

type MovieListProps = {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
};

const MovieList = ({ movies, onMovieClick }: MovieListProps) => {
  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={onMovieClick}
        />
      ))}
    </div>
  );
};

export default MovieList;