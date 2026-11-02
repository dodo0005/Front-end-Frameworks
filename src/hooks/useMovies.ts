import { useEffect, useState } from "react";
import type { Movie } from "../types";
import { movieService } from "../services/movieService";

interface UseMoviesResult {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
}

export function useMovies(
  page: number,
  searchQuery: string
): UseMoviesResult {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    const loadMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await movieService.fetchMovies({
          page,
          search: searchQuery,
          signal: controller.signal,
        });

        setMovies(data.results);
        setTotalPages(data.total_pages);
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
            : "Failed to load movies."
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
  }, [page, searchQuery]);

  return {
    movies,
    isLoading,
    error,
    totalPages,
  };
}
