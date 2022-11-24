import { Routes, Route, Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Favorites({ favs, delFav }) {
  if (favs.length === 0) {
    return (
      <>
        <Navbar />
        <h2>Favorites</h2>
        <p>No Cards here</p>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <h2>Favorites</h2>
        <ul>
          {favs.map((ele, i) => (
            <li key={Math.random()}>
              <Link to={`/recipe/${ele.id}`}>{ele?.title}</Link>
              {"        "}
              <button onClick={() => delFav(i)}>Remove</button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Favorites;
