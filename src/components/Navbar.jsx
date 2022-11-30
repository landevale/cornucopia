import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="w-full block flex-grow sm:flex sm:items-center sm:w-auto">
          <div className="text-sm sm:flex-grow">
            <h1 className="text-white font-neohellenic font-style: italic sm:text-6xl">
              Cornucopia
            </h1>
            <h2 className="text-white sm:text-2xl">Meal Planner</h2>
            <a className="block mt-4 sm:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 sm:text-lg">
              <Link to="/">Home</Link>
            </a>
            {"    "}
            <a className="block mt-4 sm:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 sm:text-lg">
              <Link to="/favorites">Favorites</Link>
            </a>
          </div>
        </div>
      </nav>

      <br />
    </>
  );
}

export default Navbar;
