
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import type { ReactNode } from "react";
import type { Movie, Theme } from "../types";

// 1. Define global state
type State = {
  theme: Theme;
  favorites: Movie[];
};

// 2. Define available actions
type Action =
  | { type: "SET_THEME" }
  | { type: "TOGGLE_FAVOURITE"; payload: Movie };

// 3. Reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: state.theme === "dark" ? "light" : "dark",
      };

    case "TOGGLE_FAVOURITE": {
      const exists = state.favorites.some(
        (movie) => movie.id === action.payload.id
      );

      return {
        ...state,
        favorites: exists
          ? state.favorites.filter(
              (movie) => movie.id !== action.payload.id
            )
          : [...state.favorites, action.payload],
      };
    }

    default:
      return state;
  }
};

// 4. Define context values
type AppContextType = {
  theme: Theme;
  favorites: Movie[];
  toggleTheme: () => void;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

// 5. Load saved state
const getInitialState = (): State => {
  const savedTheme = localStorage.getItem("cinegrid_theme");
  const savedFavorites = localStorage.getItem("cinegrid_favorites");

  let favorites: Movie[] = [];

  try {
    favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (!Array.isArray(favorites)) {
      favorites = [];
    }
  } catch {
    favorites = [];
  }

  return {
    theme: savedTheme === "light" ? "light" : "dark",
    favorites,
  };
};

// 6. Provider
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => {
    localStorage.setItem("cinegrid_theme", state.theme);
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem(
      "cinegrid_favorites",
      JSON.stringify(state.favorites)
    );
  }, [state.favorites]);

  const toggleTheme = () => {
    dispatch({ type: "SET_THEME" });
  };

  const toggleFavorite = (movie: Movie) => {
    dispatch({ type: "TOGGLE_FAVOURITE", payload: movie });
  };

  const isFavorite = (id: number) => {
    return state.favorites.some((movie) => movie.id === id);
  };

  return (
    <AppContext.Provider
      value={{
        theme: state.theme,
        favorites: state.favorites,
        toggleTheme,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 7. Custom hook
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
