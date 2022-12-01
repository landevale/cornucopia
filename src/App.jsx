import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Form from "./pages/Form";
import Recipes from "./pages/Recipes";
import Recipe from "./pages/Recipe";
import Favorites from "./pages/Favorites";
import Favorite from "./pages/Favourite";
import ErrorPage from "./pages/ErrorPage";
import { intolerancesCheckboxes } from "./data/intolerancesCheckboxes";
import { cuisineCheckboxes } from "./data/cuisineCheckboxes";

function App() {
  // const API_KEY = "1222da339511442a833d2dcfd482ca15";
  const API_KEY = "ea8e44bfe231454b9aa2cccc475fbd2f";
  // const API_KEY = "test";

  const [intolStates, setIntolStates] = useState(intolerancesCheckboxes);
  console.log(intolStates);
  const intolerancesResult = Object.keys(intolStates).filter(
    (k) => intolStates[k]
  );
  console.log(intolerancesResult);
  const intolerancesStr = intolerancesResult.map((key) => `${key}`).join(", ");
  console.log(intolerancesStr);

  const [cuiStates, setCuiStates] = useState(cuisineCheckboxes);
  console.log(cuiStates);
  const cuisineResult = Object.keys(cuiStates).filter((k) => cuiStates[k]);
  console.log(cuisineResult);
  const cuisineStr = cuisineResult.map((key) => `${key}`).join(", ");
  console.log(cuisineStr);

  const [randomRecipe, setRandomRecipe] = useState("");

  const [favs, setFavs] = useState([]);

  const addFav = (recipe) => {
    setFavs([...favs, recipe]);
    console.log(favs);
  };

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favs"));
    if (favs) {
      setFavs(favs);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favs));
  }, [favs]);

  const delFav = (i) => {
    favs.splice(i, 1);
    console.log(favs);
    const newFavs = [...favs];
    setFavs(newFavs);
  };

  useEffect(() => {
    let controller = new AbortController();
    const signal = controller.signal;
    const fetchRandomReceipe = async () => {
      const recipeSrc = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=30`;
      const response = await fetch(recipeSrc, { signal });
      const data = await response.json();

      setRandomRecipe(data.recipes);
    };
    fetchRandomReceipe();
    return () => {
      controller.abort();
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (event.target.elements.name.value || intolerancesStr || cuisineStr) {
      console.log(event.target.elements.name.value);

      // const recipeSrc = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${event.target.elements.name.value}&ignorePantry=true&ranking=1&number=3`;
      const recipeSrc = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${event.target.elements.name.value}&intolerances=${intolerancesStr}&cuisine=${cuisineStr}&ignorePantry=true&sort=random&number=30`;
      const response = await fetch(recipeSrc);
      const data = await response.json();
      console.log(data.results);

      setRandomRecipe(data.results);
    } else {
      const recipeSrc = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=30`;
      const response = await fetch(recipeSrc);
      const data = await response.json();

      setRandomRecipe(data.recipes);
    }
  };

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Form
                  handleSubmit={handleSubmit}
                  intolStates={intolStates}
                  setIntolStates={setIntolStates}
                  cuiStates={cuiStates}
                  setCuiStates={setCuiStates}
                />
              }
            >
              <Route index element={<Recipes randomRecipe={randomRecipe} />} />
            </Route>

            <Route
              path="/recipe/:code"
              element={
                <Recipe
                  favs={favs}
                  addFav={addFav}
                  delFav={delFav}
                  API_KEY={API_KEY}
                />
              }
            />

            <Route
              path="/favorites"
              element={<Favorites favs={favs} delFav={delFav} />}
            />
            <Route
              path="/favorite/:code"
              element={<Favorite favs={favs} addFav={addFav} delFav={delFav} />}
            />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
