import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import servings from "../assets/servings.png";
import timeLeft from "../assets/time-left.png";
import Switch from "./Switch";

function Recipe({ addFav, API_KEY }) {
  const [recipe, setRecipe] = useState({});
  const { code } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Idle");
  const recipeSection = useRef(null);

  const scrollDown = () => {
    window.scrollTo({
      top: recipeSection.current.offsetTop,
      behavior: "smooth",
    });
  };

  const handleFav = (recipe) => () => {
    addFav(recipe);
  };

  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    // Async await, newer, more used methods
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

  return (
    <>
      <Navbar />
      <main className="px-5">
        <h2>{recipe.title}</h2>
        <button onClick={scrollDown}>Jump to Recipe</button>
        <br />

        <section dangerouslySetInnerHTML={{ __html: recipe.summary }}></section>
        <img src={recipe.image} />
        <br />
        <div className="inline-block" id="recipeFactsDiv">
          <h4>Recipe Facts:</h4>
          <img style={{ maxWidth: "3%", height: "auto" }} src={timeLeft} />
          <p>Ready in {recipe.readyInMinutes} minutes</p>
          <img style={{ maxWidth: "3%", height: "auto" }} src={servings} />
          <p>{recipe.servings} Servings</p>
        </div>
        <br />
        <br />

        <div className="ingredientsDiv" ref={recipeSection}>
          <ul style={{ listStyleType: "none" }}>
            <h4>Ingredients:</h4>
            <div className="inline-flex">
              <Switch toggle={toggle} setToggle={setToggle} />
              {"       "}
              Click to Toggle US/Metric units
            </div>
            {/* Ingredient display toggle US : Metric */}
            {toggle === true ? usUnit : metricUnit}
          </ul>
        </div>
        <br />
        <br />
        <div className="instructionsDiv">
          <h4>Recipe:</h4>{" "}
          <div>
            {status === "loading" ? (
              <progress />
            ) : (
              <section
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              ></section>
            )}
            {status === "error" ? "Error" : null}
          </div>
        </div>
        <button onClick={handleFav(recipe)}>Add to Favorites</button>
      </main>
    </>
  );
}

export default Recipe;
