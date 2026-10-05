import { useEffect, useState } from "react";
import type { Genre } from "../types";
import { getGenres } from "../data/genres";

interface UseGenresResult {
  genres: Genre[];
  isLoading: boolean;
  error: string | null;
}

const BASE_URL =
  import.meta.env.VITE_TMDB_BASE_URL ||
  "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export function useGenres(): UseGenresResult {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadGenres = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!API_KEY) {
          setGenres(getGenres());
          return;
        }

        const response = await fetch(
          `${BASE_URL}/genre/movie/list?language=en`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch genres (${response.status})`,
          );
        }

        const data = await response.json();

        setGenres(data.genres ?? []);
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
            : "Failed to load genres.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadGenres();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    genres,
    isLoading,
    error,
  };
}