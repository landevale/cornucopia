import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import servings from "../assets/servings.png";
import timeLeft from "../assets/time-left.png";

function Recipe({ addFav }) {
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

  useEffect(() => {
    // Async await, newer, more used methods
    const fetchRecipe = async () => {
      try {
        // const options = {
        //   method: "GET",
        //   headers: {
        //     "X-RapidAPI-Key":
        //       "e0d1c6aec2mshb17d954bde69ccbp16cf43jsnf90c9c61420e",
        //     "X-RapidAPI-Host":
        //       "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        //   },
        // };

        // const recipeSrc = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${code}/information`;
        // const response = await fetch(recipeSrc, options);

        const recipeSrc = `https://api.spoonacular.com/recipes/${code}/information?apiKey=ea8e44bfe231454b9aa2cccc475fbd2f&includeNutrition=false`;
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
  }, [code]);

  // const handleClickHome = () => {
  //   console.log("click");
  //   navigate("/");
  // };

  // const handleClickFavs = () => {
  //   console.log("click");
  //   navigate("/favorites");
  // };

  return (
    <>
      <Navbar />
      <main className="px-3">
        <h2>{recipe.title}</h2>
        <button onClick={scrollDown}>Jump to Recipe</button>
        <br />
        {/* <p>{recipe.summary}</p> */}
        <section dangerouslySetInnerHTML={{ __html: recipe.summary }}></section>
        <img src={recipe.image} />
        <div id="recipeFactsDiv">
          <h4>Recipe Facts:</h4>
          <img style={{ maxWidth: "3%", height: "auto" }} src={timeLeft} />
          <p>Ready in {recipe.readyInMinutes} minutes</p>
          <img style={{ maxWidth: "3%", height: "auto" }} src={servings} />
          <p>{recipe.servings} Servings</p>
        </div>
        <div className="ingredientsDiv" ref={recipeSection}>
          <ul style={{ listStyleType: "none" }}>
            <h4>Ingredients:</h4>
            {recipe?.extendedIngredients?.map((item) => (
              <li key={Math.random()}>
                {item?.amount} {item?.unit} - {item?.name}
              </li>
            ))}
          </ul>
        </div>
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
        {/* <button onClick={handleClickFavs}>Favorites</button>
        <button onClick={handleClickHome}>Home</button> */}
      </main>
    </>
  );
}

export default Recipe;
