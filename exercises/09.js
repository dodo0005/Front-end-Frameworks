

const movie1 = {
  title: "Inception",
  tagline: "Your mind is the scene of the crime.",
  director: { name: "Christopher Nolan" },
  cast: [{ name: "Leonardo DiCaprio" }, { name: "Elliot Page" }],
};

const movie2 = {
  title: "Unknown Film",
  tagline: "",

};


const directorName = movie2.director?.name;


const tagline = movie2.tagline || "No tagline";


const firstCastName = movie2.cast?.[0]?.name;


const castName = movie2.cast?.[0]?.name ?? "Unknown cast";



function formatPosterUrl(movie) {
  return movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/500x750?text=No+Image";
}

const tmdbMovie        = { title: "Inception", poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg" };
const tmdbMovieNoPoster = { title: "Obscure Film", poster_path: null };

console.log(formatPosterUrl(tmdbMovie));        
console.log(formatPosterUrl(tmdbMovieNoPoster));
