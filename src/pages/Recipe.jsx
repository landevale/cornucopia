import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RecipeDisplay from "../components/RecipeDisplay";
import PropTypes from "prop-types";

function Recipe({ favs, addFav, delFav, API_KEY }) {
  Recipe.propTypes = {
    favs: PropTypes.array,
    addFav: PropTypes.func,
    delFav: PropTypes.func,
    API_KEY: PropTypes.string,
  };

  const [recipe, setRecipe] = useState({});
  const { code } = useParams();

  const [status, setStatus] = useState("Idle");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeSrc = `https://api.spoonacular.com/recipes/${code}/information?apiKey=${API_KEY}&includeNutrition=false`;
        const response = await fetch(recipeSrc);
        const data = await response.json();
        setStatus("done");
        setRecipe(data);
      } catch {
        setRecipe("Error when fetch");
        setStatus("error");
      }
    };
    setStatus("loading");
    fetchRecipe();
  }, [code, API_KEY]);

  const inFavs = favs.findIndex((fav) => recipe.id === fav.id) === -1;
  console.log(inFavs);

  const handleFav = (recipe) => () => {
    if (inFavs) {
      addFav(recipe);
    } else {
      const i = favs.findIndex((fav) => recipe.id === fav.id);
      delFav(i);
    }
  };

  return (
    <>
      <Navbar />
      <RecipeDisplay
        recipe={recipe}
        handleFav={handleFav}
        inFavs={inFavs}
        status={status}
      />
    </>
  );
}

export default Recipe;
