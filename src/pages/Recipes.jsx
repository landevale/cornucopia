import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Recipes({ randomRecipe }) {
  Recipes.propTypes = {
    randomRecipe: PropTypes.object,
  };

  const displayRecipe = Array.from(randomRecipe);
  console.log(displayRecipe);

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 mt-24 sm:mt-14">
        {displayRecipe.map((ele, i) => (
          <Link to={`/recipe/${ele.id}`} key={i}>
            <div
              key={ele.id}
              className="max-w-sm max-h-sm rounded overflow-hidden shadow-lg m-3 inline-grid"
            >
              <img className="w-fit h-fit" src={ele.image} alt={ele.title} />

              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{ele.title}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Recipes;
