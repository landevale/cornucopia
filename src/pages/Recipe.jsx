import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import servings from "../assets/servings.png";
import timeLeft from "../assets/time-left.png";
import Switch from "../components/Switch";
import PropTypes from "prop-types";

function Recipe({ favs, addFav, delFav, API_KEY }) {
  Recipe.propTypes = {
    favs: PropTypes.object,
    addFav: PropTypes.func,
    delFav: PropTypes.func,
    API_KEY: PropTypes.string,
  };

  const [recipe, setRecipe] = useState({});
  const { code } = useParams();
  // const navigate = useNavigate();
  const [status, setStatus] = useState("Idle");
  const recipeSection = useRef(null);

  const scrollDown = () => {
    window.scrollTo({
      top: recipeSection.current.offsetTop,
      behavior: "smooth",
    });
  };

  const [toggle, setToggle] = useState(true);

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

  const usUnit = recipe?.extendedIngredients?.map((item) => (
    <li key={Math.random()}>
      {item?.amount} {item?.unit} - {item?.name}
    </li>
  ));

  const metricUnit = recipe?.extendedIngredients?.map((item) => (
    <li key={Math.random()}>
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
        <div className="container mx-auto grid grid-rows-9 grid-flow-col gap-3 rounded">
          <img
            src={recipe.image}
            className="row-span-5 col-span-5 self-center"
          />
          <h2 className="col-start-6 col-span-2 self-center p-3 max-w-xl">
            {recipe.title}
          </h2>

          <section
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
            className="row-span-2 col-span-2"
          ></section>
        </div>

        <div className="container mx-auto">
          <button onClick={scrollDown}>Jump to Recipe</button>
        </div>

        <div
          className="container mx-auto max-w-md grid gap-3 sm:grid-cols-2 rounded overflow-hidden shadow-lg p-3"
          id="recipeFactsDiv"
        >
          <h4 className="justify-center col-span-2">Recipe Facts:</h4>
          <img
            src={timeLeft}
            style={{ maxWidth: "10%", height: "auto" }}
            className="place-self-end"
          />
          <p>Ready in {recipe.readyInMinutes} minutes</p>
          <img
            src={servings}
            style={{ maxWidth: "10%", height: "auto" }}
            className="place-self-end"
          />
          <p>{recipe.servings} Servings</p>
        </div>

        <div
          className="container mx-auto grid gap-3 rounded"
          ref={recipeSection}
        >
          <ul style={{ listStyleType: "none" }}>
            <h4>Ingredients:</h4>
            <div className="inline-flex m-3">
              <Switch toggle={toggle} setToggle={setToggle} />
              {"            "}
              Click to Toggle US/Metric units
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

export default Recipe;
