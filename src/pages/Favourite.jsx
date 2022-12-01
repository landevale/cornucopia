import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import servings from "../assets/servings.png";
import timeLeft from "../assets/time-left.png";
import Switch from "../components/Switch";
import PropTypes from "prop-types";

function Favorite({ favs, addFav, delFav }) {
  Favorite.propTypes = {
    favs: PropTypes.array,
    addFav: PropTypes.func,
    delFav: PropTypes.func,
  };

  const [recipe, setRecipe] = useState({});
  const { code } = useParams();
  console.log(code);
  console.log(favs[0]?.id);
  const favsIndex = favs.findIndex((fav) => code == fav.id);

  useEffect(
    () => {
      setRecipe(favs[favsIndex]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const recipeSection = useRef(null);

  const scrollDown = () => {
    window.scrollTo({
      top: recipeSection.current.offsetTop,
      behavior: "smooth",
    });
  };

  const [toggle, setToggle] = useState(true);

  const usUnit = recipe?.extendedIngredients?.map((item, i) => (
    <li key={i}>
      {item?.amount} {item?.unit} - {item?.name}
    </li>
  ));

  const metricUnit = recipe?.extendedIngredients?.map((item, i) => (
    <li key={i}>
      {item?.measures.metric.amount} {item?.measures.metric.unitShort} -{" "}
      {item?.name}
    </li>
  ));

  const inFavs = favs.findIndex((fav) => recipe.id === fav.id) === -1;
  console.log(inFavs);
  const buttonText = inFavs ? "Add to Favorties" : "Remove from Favorites";

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
      <main className="px-5 space-y-4">
        <div className="container mx-auto grid auto-cols-max grid-cols-1 sm:grid-cols-9 grid-rows-9 grid-flow-col gap-3 rounded">
          <img
            src={recipe.image}
            className="object-scale-down row-start-2 sm:object-fill sm:row-span-5 col-span-1 sm:col-span-5 self-center"
          />
          <div className="row-start-3 sm:row-start-6 sm:col-start-1 sm:col-span-2 container mx-auto">
            <button onClick={scrollDown}>Jump to Recipe</button>
          </div>
          <h2 className="row-start-1 col-start-1 sm:col-start-6 col-span-1 sm:col-span-2 self-center p-3 max-w-xl font-bold">
            {recipe.title}
          </h2>

          <section
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
            className="row-start-7 col-start-1 sm:row-span-2 sm:col-span-6"
          ></section>
        </div>

        <div
          className="container mx-auto max-w-md grid gap-3 sm:grid-cols-2 rounded overflow-hidden shadow-lg p-3"
          id="recipeFactsDiv"
        >
          <h4 className="justify-center col-span-2">Recipe Facts:</h4>
          <img
            src={timeLeft}
            style={{ maxWidth: "10%", height: "auto" }}
            className="sm:place-self-end"
          />
          <p>Ready in {recipe.readyInMinutes} minutes</p>
          <img
            src={servings}
            style={{ maxWidth: "10%", height: "auto" }}
            className="sm:place-self-end"
          />
          <p>{recipe.servings} Servings</p>
        </div>

        <div
          className="container mx-auto grid gap-3 rounded overflow-hidden shadow-lg"
          ref={recipeSection}
        >
          <ul style={{ listStyleType: "none" }}>
            <h4>Ingredients:</h4>
            <div className="inline-flex m-3">
              <Switch toggle={toggle} setToggle={setToggle} />
              {"            "}
              <p className="px-2"></p>Click to Toggle US/Metric units
            </div>
            {/* Ingredient display toggle US : Metric */}
            {toggle === true ? usUnit : metricUnit}
          </ul>
        </div>

        <div className="container mx-auto grid gap-3 rounded">
          <h4>Recipe:</h4>
          {status === "loading" ? (
            <progress />
          ) : (
            <section
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
            ></section>
          )}
          {status === "error" ? "Error" : null}
        </div>
        <div className="container mx-auto">
          <button onClick={handleFav(recipe)}>{buttonText}</button>
        </div>
      </main>
    </>
  );
}

export default Favorite;
