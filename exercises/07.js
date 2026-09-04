


const movies = [
  { title: "Inception",       rating: 8.8, genre: "Sci-Fi",   year: 2010 },
  { title: "The Dark Knight", rating: 9.0, genre: "Action",   year: 2008 },
  { title: "Interstellar",    rating: 8.6, genre: "Sci-Fi",   year: 2014 },
  { title: "Parasite",        rating: 8.5, genre: "Thriller", year: 2019 },
  { title: "1917",            rating: 8.3, genre: "War",       year: 2019 },
  { title: "Tenet",           rating: 7.3, genre: "Sci-Fi",   year: 2020 },
];


const titles = movies.map(movie => movie.title);


const sciFiMovies = movies.filter(movie => movie.genre === "Sci-Fi");


const highRated = movies.filter(movie => movie.rating >= 8.5);


const parasite = movies.find(movie => movie.title === "Parasite");


const hasOver9_5 = movies.some(movie => movie.rating > 9.5);


const sciFiTitles = movies
  .filter(movie => movie.genre === "Sci-Fi" && movie.rating > 8.0)
  .map(movie => movie.title);


const titleString = movies.map(movie => movie.title).join(" | ");


const sorted = [...movies].sort((a, b) => b.rating - a.rating);

console.log(movies); 