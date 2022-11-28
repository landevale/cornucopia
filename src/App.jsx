import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Recipes from "./components/Recipes";
import Recipe from "./components/Recipe";
import Favorites from "./components/Favorites";
import Navbar from "./components/Navbar";
import ErrorPage from "./components/ErrorPage";
// import Homepage from "./pages/Homepage";

function App() {
  const API_KEY = "1222da339511442a833d2dcfd482ca15";
  // const API_KEY = "ea8e44bfe231454b9aa2cccc475fbd2f";

  const [randomRecipe, setRandomRecipe] = useState("");
  // const [favRecipe, setFavRecipe] = useState("");
  const [favs, setFavs] = useState([]);

  const addFav = (recipe) => {
    setFavs([...favs, recipe]);
    console.log(favs);
  };

  const delFav = (i) => {
    favs.splice(i, 1);
    console.log(favs);
    const newFavs = [...favs];
    setFavs(newFavs);
  };

  //* 2 parameters
  //* 1st - callback
  //* 2nd - array of depencencies -> when dependecy change -> useEffect runs again
  //* omit 2nd paramater -> useEffect runs all the time

  useEffect(() => {
    let controller = new AbortController();
    const signal = controller.signal;

    // Async await, newer, more used methods
    const fetchRandomReceipe = async () => {
      const recipeSrc = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=1`;
      const response = await fetch(recipeSrc, { signal });
      const data = await response.json();

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

      const recipeSrc = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${event.target.elements.name.value}&ignorePantry=true&ranking=1&number=3`;
      const response = await fetch(recipeSrc);
      const data = await response.json();
      console.log(data);

      setRandomRecipe(data);
    } else {
      const recipeSrc = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=1`;
      const response = await fetch(recipeSrc);
      const data = await response.json();

      setRandomRecipe([
        {
          id: `${data?.recipes[0].id}`,
          title: `${data?.recipes[0].title}`,

          image: `${data?.recipes[0].image}`,
          summary: `${data?.recipes[0].summary}`,
        },
      ]);
    }
  };

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Form handleSubmit={handleSubmit} />}>
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
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
