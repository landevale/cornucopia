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
  const API_KEY = import.meta.env.VITE_API_KEY;
  // const API_KEY = import.meta.env.VITE_API_KEY2;

  const [intolStates, setIntolStates] = useState(intolerancesCheckboxes);
  const intolerancesResult = Object.keys(intolStates).filter(
    (k) => intolStates[k]
  );
  const intolerancesStr = intolerancesResult.map((key) => `${key}`).join(", ");

  const [cuiStates, setCuiStates] = useState(cuisineCheckboxes);
  const cuisineResult = Object.keys(cuiStates).filter((k) => cuiStates[k]);
  const cuisineStr = cuisineResult.map((key) => `${key}`).join(", ");

  const [displayRecipe, setDisplayRecipe] = useState([]);

  const [favs, setFavs] = useState([]);

  const addFav = (recipe) => {
    setFavs([...favs, recipe]);
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

      setDisplayRecipe(data.recipes);
    };
    fetchRandomReceipe();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      setDisplayRecipe(data.results);
    } else {
      const recipeSrc = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=30`;
      const response = await fetch(recipeSrc);
      const data = await response.json();

      setDisplayRecipe(data.recipes);
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
              <Route
                index
                element={<Recipes displayRecipe={displayRecipe} />}
              />
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
