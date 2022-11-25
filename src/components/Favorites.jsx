import { Routes, Route, Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Favorites({ favs, delFav }) {
  if (favs.length === 0) {
    return (
      <>
        <Navbar />
        <main className="px-5">
          <h2>Favorites</h2>
          <p>No Cards here</p>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <main className="px-5">
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
        </main>
      </>
    );
  }
}

export default Favorites;
