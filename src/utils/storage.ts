import type { Movie, Theme } from "../types";

const FAVORITES_KEY = "movie-app-favorites";
const THEME_KEY = "movie-app-theme";
const API_KEY = "movie-app-api-key";

export function getFavorites(): Movie[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(movie: Movie): Movie[] {
  const favorites = getFavorites();

  const exists = favorites.some(
    (favorite) => favorite.id === movie.id,
  );

  const updatedFavorites = exists
    ? favorites.filter((favorite) => favorite.id !== movie.id)
    : [...favorites, movie];

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(updatedFavorites),
  );

  return updatedFavorites;
}

export function getTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY);

  return stored === "light" ? "light" : "dark";
}

export function setTheme(theme: Theme): void {
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.setAttribute("data-theme", theme);
}

export function getApiKey(): string {
  return localStorage.getItem(API_KEY) || "";
}

export function setApiKey(key: string): void {
  const trimmedKey = key.trim();

  if (trimmedKey) {
    localStorage.setItem(API_KEY, trimmedKey);
  } else {
    localStorage.removeItem(API_KEY);
  }
}