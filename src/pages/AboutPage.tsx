import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <main>
      <h1>About</h1>

      <p>
        Welcome to the Movie App. Browse, search, and discover movies.
      </p>

      <Link to="/">Back to Home</Link>
    </main>
  );
};

export default AboutPage;