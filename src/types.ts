export interface Movie {
    title: string;
    id: number;
    original_title?: string;
    overview?: string;
    poster_path?: string | null;
    backdrop_path?: string | null;
    genre_ids?: number[];
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity?: number;
    adult?: boolean;
    original_language?: string;
    video?: boolean;
}

export interface Genre {
  id: number;
  name: string;
}

export type SortOption =
  | "popularity"
  | "rating"
  | "release_date"
  | "title";
export type viewMode = "grid" | "list";
export type Theme = "light" | "dark";