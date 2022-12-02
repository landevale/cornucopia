import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import RecipeDisplay from "../components/RecipeDisplay";
import PropTypes from "prop-types";

function Favorite({ favs, addFav, delFav }) {
  Favorite.propTypes = {
    favs: PropTypes.array,
    addFav: PropTypes.func,
    delFav: PropTypes.func,
  };

  const [recipe, setRecipe] = useState({});
  const { code } = useParams();
  const favsIndex = favs.findIndex((fav) => code == fav.id);

  useEffect(
    () => {
      setRecipe(favs[favsIndex]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const inFavs = favs.findIndex((fav) => recipe.id === fav.id) === -1;

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
      <RecipeDisplay recipe={recipe} handleFav={handleFav} inFavs={inFavs} />
    </>
  );
}

export default Favorite;
