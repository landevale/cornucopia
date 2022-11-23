import { Routes, Route, Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Favorites({ favs, delFav }) {
  return (
    <>
      <Navbar />
      <h2>Favs</h2>
      <ul>
        {favs.map((ele, i) => (
          <li key={Math.random()}>
            {ele?.title} <button onClick={() => delFav(i)}>Del</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Favorites;
