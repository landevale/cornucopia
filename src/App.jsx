import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Recipes from "./components/Recipes";
import Recipe from "./components/Recipe";
import Favorites from "./components/Favorites";
// import Homepage from "./pages/Homepage";

function App() {
  const [randomRecipe, setRandomRecipe] = useState("");
  // const [favRecipe, setFavRecipe] = useState("");
  const [favs, setFavs] = useState([]);

  const addFav = (recipe) => setFavs([...favs, recipe]);

  const delFav = (recipe) => setFavs([]);
  //* 2 parameters
  //* 1st - callback
  //* 2nd - array of depencencies -> when dependecy change -> useEffect runs again
  //* omit 2nd paramater -> useEffect runs all the time

  useEffect(() => {
    let controller = new AbortController();
    const signal = controller.signal;

    // Async await, newer, more used methods
    const fetchRandomReceipe = async () => {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "e0d1c6aec2mshb17d954bde69ccbp16cf43jsnf90c9c61420e",
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      };

      const recipeSrc = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1`;
      const response = await fetch(recipeSrc, options, { signal });
      const data = await response.json();
      // setName(data.results[0].name.first);
      // setPicture(data.results[0].picture.large);

      setRandomRecipe([
        {
          id: `${data?.recipes[0].id}`,
          title: `${data?.recipes[0].title}`,
          image: `${data?.recipes[0].image}`,
          summary: `${data?.recipes[0].summary}`,
        },
      ]);
    };
    fetchRandomReceipe();
    return () => {
      controller.abort();
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (event.target.elements.name.value) {
      console.log(event.target.elements.name.value);
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "e0d1c6aec2mshb17d954bde69ccbp16cf43jsnf90c9c61420e",
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      };

      const recipeSrc = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${event.target.elements.name.value}&ignorePantry=true&ranking=1&number=3`;
      const response = await fetch(recipeSrc, options);
      const data = await response.json();
      console.log(data);

      setRandomRecipe(data);
    } else {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "e0d1c6aec2mshb17d954bde69ccbp16cf43jsnf90c9c61420e",
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      };
      const recipeSrc = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1`;
      const response = await fetch(recipeSrc, options);
      const data = await response.json();
      // setName(data.results[0].name.first);
      // setPicture(data.results[0].picture.large);

      setRandomRecipe([
        {
          id: `${data?.recipes[0].id}`,
          title: `${data?.recipes[0].title}`,
          // value: "https://spoonacular.com/recipeImages/632572-556x370.jpg",
          image: `${data?.recipes[0].image}`,
          summary: `${data?.recipes[0].summary}`,
        },
      ]);
    }
  };

  return (
    <>
      <div className="App">
        <h1>Meal Planner</h1>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Form handleSubmit={handleSubmit} />}>
              <Route index element={<Recipes randomRecipe={randomRecipe} />} />
            </Route>

            <Route path="/recipe/:code" element={<Recipe addFav={addFav} />} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route
              path="/favs"
              element={<Favorites favs={favs} delFav={delFav} />}
            />
            <Route path="*" element={<p>Nothing here!</p>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
