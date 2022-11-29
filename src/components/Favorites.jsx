import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Favorites({ favs, delFav }) {
  if (favs.length === 0) {
    return (
      <>
        <Navbar />
        <main className="px-5 ">
          <h2>Favorites</h2>
          <p>No saved recipes</p>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <main className="px-5 space-y-4">
          <h2>Favorites</h2>
          {/* <ul className="space-y-3">
            {favs.map((ele, i) => (
              <li key={i}>
                <Link to={`/recipe/${ele.id}`}>{ele?.title}</Link>
                {"        "}
                <button onClick={() => delFav(i)}>Remove</button>
              </li>
            ))}
          </ul> */}
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
            {favs.map((ele, i) => (
              <div
                key={i}
                className="max-w-sm max-h-lg rounded overflow-hidden shadow-lg m-3 relative"
              >
                <Link to={`/recipe/${ele.id}`}>
                  <img
                    className="w-fit h-fit"
                    src={ele.image}
                    alt={ele.title}
                  />
                </Link>

                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{ele.title}</div>
                </div>
                <div className="absolute bottom-0 right-0">
                  <button onClick={() => delFav(i)} className="h-10">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </>
    );
  }
}

export default Favorites;
