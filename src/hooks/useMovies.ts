import { useEffect, useState } from "react";
import type { Movie } from "../types";
import { movieService } from "../services/movieService";

interface UseMoviesResult {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
}

export function useMovies(): UseMoviesResult {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await movieService.fetchMovies({
          page: 1,
          signal: controller.signal,
        });

        setMovies(data.results);
      } catch (err) {
        if (
          err instanceof DOMException &&
          err.name === "AbortError"
        ) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load movies.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadMovies();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    movies,
    isLoading,
    error,
  };
}