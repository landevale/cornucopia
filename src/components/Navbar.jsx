import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        {"    "}
        <Link to="/favorites">Favorites</Link>
      </nav>
      <h1>Cornucopia</h1>
      <h3>Meal Planner</h3>
      <br />
      <br />
    </>
  );
}

export default Navbar;
