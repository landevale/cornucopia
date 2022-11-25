import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <h1 className="text-white font-neohellenic font-style: italic">
              Cornucopia
            </h1>
            <h2 className="text-white">Meal Planner</h2>
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              <Link to="/">Home</Link>
            </a>
            {"    "}
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
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
