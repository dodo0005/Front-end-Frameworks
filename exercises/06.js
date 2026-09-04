

const watchlist = ["Inception", "Interstellar"];
const newMovies = ["Tenet", "Oppenheimer"];


const combined = [...watchlist, ...newMovies];


const withDune = ["Dune", ...watchlist];


const copy = [...watchlist];    


const baseInfo = { title: "Dune", year: 2021 };
const extraInfo = { rating: 8.0, genre: "Sci-Fi" };
const merged = { ...baseInfo, ...extraInfo };


const updated = { ...baseInfo, rating: 9.0 };


const logMovies = (...movies) => {
  movies.forEach(movie => console.log(movie));
};

logMovies("Inception", "Dune", "Tenet");
console.log(watchlist); 
console.log(newMovies); 
