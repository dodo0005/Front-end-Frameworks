import { SAMPLE_MOVIES } from "../data/sampleMovies";
import type { Movie, SortOption } from "../types";

interface FetchMoviesParams {
  search?: string;
  genre?: number;
  sort?: SortOption;
  onlyFavorites?: boolean;
  page?: number;
  signal?: AbortSignal;
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  isLiveApi: boolean;
}

const BASE_URL =
  import.meta.env.VITE_TMDB_BASE_URL ||
  "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const movieService = {
  async fetchMovies({
    search = "",
    genre,
    sort,
    onlyFavorites = false,
    page = 1,
    signal,
  }: FetchMoviesParams = {}): Promise<MovieResponse> {
    // These are accepted now because Session 04 will use them.
    void genre;
    void sort;
    void onlyFavorites;

    // No API key = use local sample data.
    if (!API_KEY) {
      const normalizedSearch = search.trim().toLowerCase();

      const results = normalizedSearch
        ? SAMPLE_MOVIES.filter((movie) =>
            movie.title
              .toLowerCase()
              .includes(normalizedSearch),
          )
        : SAMPLE_MOVIES;

      return {
        results,
        total_pages: 1,
        total_results: results.length,
        isLiveApi: false,
      };
    }

    const endpoint = search.trim()
      ? "/search/movie"
      : "/movie/popular";

    const params = new URLSearchParams({
      language: "en-US",
      page: String(page),
    });

    if (search.trim()) {
      params.set("query", search.trim());
    }

    const response = await fetch(
      `${BASE_URL}${endpoint}?${params.toString()}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        signal,
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch movies (${response.status})`,
      );
    }

    const data = await response.json();

    return {
      results: data.results ?? [],
      total_pages: data.total_pages ?? 1,
      total_results: data.total_results ?? 0,
      isLiveApi: true,
    };
  },
};