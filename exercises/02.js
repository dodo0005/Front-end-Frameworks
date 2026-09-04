const formatTitle = (title, year) => title + " (" + year + ")";

const isHighRated = movie => movie.rating >= 8.0;

const double = n => n * 2;

const toSummary = movie => ({ title: movie.title, rating: movie.rating });

console.log(formatTitle("Inception", 2010));
console.log(isHighRated({ rating: 9.0 }));
console.log(double(5));
console.log(toSummary({ title: "Dune", rating: 8.0 }));