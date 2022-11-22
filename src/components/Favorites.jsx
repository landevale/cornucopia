import { Routes, Route, Link, Outlet } from "react-router-dom";

function Favorites({ favs, delFav }) {
  return (
    <>
      <h2>Favs</h2>
      <ul>
        {favs.map((ele, i) => (
          <li key={ele.id}>
            {ele.name} <button onClick={() => delFav(ele[i])}>Del</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Favorites;
