import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

function Recipe({ addFav }) {
  const [recipe, setRecipe] = useState({});
  const { code } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Idle");

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
      <main>
        <h2>{recipe.title}</h2>
        <img src={recipe.image} />
        <p>{recipe.servings} Servings</p>

        <p>Ready in {recipe.readyInMinutes} minutes</p>
        <ul>
          {recipe?.extendedIngredients?.map((item) => (
            <li key={Math.random()}>
              {item?.amount} {item?.unit} - {item?.name}
            </li>
          ))}
        </ul>
        <p>
          Recipe: {status === "loading" ? <progress /> : recipe.instructions}
          {status === "error" ? "Error" : null}
        </p>
        <button onClick={handleFav(recipe)}>Add to Favorites</button>
        {/* <button onClick={handleClickFavs}>Favorites</button>
        <button onClick={handleClickHome}>Home</button> */}
      </main>
    </>
  );
}

export default Recipe;
