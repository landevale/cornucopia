import { Link } from "react-router-dom";
import vegetablesPot from "../assets/vegetables-pot.png";
import PropTypes from "prop-types";

function Recipes({ randomRecipe }) {
  Recipes.propTypes = {
    randomRecipe: PropTypes.array,
  };

  const displayRecipe = Array.from(randomRecipe);
  // console.log(displayRecipe);

  if (displayRecipe.length === 0) {
    return (
      <>
        <main className="px-5 mt-28 sm:mt-10">
          <h2 className="font-neohellenic text-3xl">No recipes found.</h2>
          <p>Hang on, we are cooking up something! Check back again!</p>
          <img className="w-fit h-fit" src={vegetablesPot} />
        </main>
      </>
    );
  } else {
    return (
      <>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 mt-24 sm:mt-14">
          {displayRecipe.map((ele, i) => (
            <div
              key={ele.id}
              className="max-w-sm max-h-sm rounded overflow-hidden shadow-lg m-3 inline-grid"
            >
              <Link to={`/recipe/${ele.id}`} key={i}>
                <img className="w-fit h-fit" src={ele.image} alt={ele.title} />
              </Link>

              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{ele.title}</div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
export default Recipes;
