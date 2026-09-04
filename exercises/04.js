
const movie = {
  title: "Inception",
  year: 2010,
  rating: 8.8,
  genres: ["Action", "Sci-Fi", "Thriller"],
  director: {
    name: "Christopher Nolan",
    nationality: "British",
  },
};


const { title, year, rating } = movie;


const { director: { name } } = movie;


const { title: movieTitle } = movie;


const { tagline = "No tagline available" } = movie;

function printMovie({ title, year }) {
  console.log(title, year);
}

printMovie(movie);
