
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import HeaderComponent from "./components/HeaderComp";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import WatchlistPage from "./pages/WatchListPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-layout">
          <HeaderComponent
            searchQuery={searchQuery}
            onChange={setSearchQuery}
          />

          <Routes>
            <Route
              path="/"
              element={<HomePage searchQuery={searchQuery} />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
