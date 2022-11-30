import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PropTypes from "prop-types";

function Favorites({ favs, delFav }) {
  Favorites.propTypes = {
    favs: PropTypes.object,
    delFav: PropTypes.func,
  };

  if (favs.length === 0) {
    return (
      <>
        <Navbar />
        <main className="px-5 ">
          <h2 className="font-neohellenic text-3xl">Favorites</h2>
          <p>No saved recipes</p>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <main className="px-5 space-y-4">
          <h2 className="font-neohellenic text-3xl">
            {" "}
            {favs.length} Favorites
          </h2>

          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
            {favs.map((ele, i) => (
              <div
                key={ele.id}
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
                <div className="px-6 pt-4 pb-2"></div>
                <div className="absolute bottom-0 right-0">
                  <button onClick={() => delFav(i)} className="h-10">
                    Remove
                  </button>
                </div>
                {/* <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #photography
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #travel
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #winter
              </span>
            </div> */}
              </div>
            ))}
          </div>
        </main>
      </>
    );
  }
}

export default Favorites;
