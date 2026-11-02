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

const API_KEY = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const movieService = {
  async fetchMovies({
    search = "",
    genre,
    sort,
    onlyFavorites = false,
    page = 1,
    signal,
  }: FetchMoviesParams = {}): Promise<MovieResponse> {
    void genre;
    void sort;
    void onlyFavorites;

    // Use sample movies when no API key is available.
    if (!API_KEY) {
      const normalizedSearch = search.trim().toLowerCase();

      const filteredMovies = normalizedSearch
        ? SAMPLE_MOVIES.filter((movie) =>
            movie.title.toLowerCase().includes(normalizedSearch)
          )
        : SAMPLE_MOVIES;

      const moviesPerPage = 20;
      const totalResults = filteredMovies.length;
      const totalPages = Math.max(
        1,
        Math.ceil(totalResults / moviesPerPage)
      );

      const startIndex = (page - 1) * moviesPerPage;

      return {
        results: filteredMovies.slice(
          startIndex,
          startIndex + moviesPerPage
        ),
        total_pages: totalPages,
        total_results: totalResults,
        isLiveApi: false,
      };
    }

    // Choose the correct TMDB endpoint.
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
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch movies (${response.status})`
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
