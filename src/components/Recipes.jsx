import { useState, useEffect, useRef } from "react";

function Recipes({ randomRecipe }) {
  const displayRecipe = Array.from(randomRecipe);
  console.log(displayRecipe);
  return (
    <div className="Recipe">
      {/* <h2>{displayRecipe[0].title}</h2>
      <img src={displayRecipe[0].image} /> */}
      {displayRecipe.map((ele, i) => (
        <div key={Math.random()}>
          <h2>{ele.title}</h2>
          <img src={ele.image} />
        </div>
      ))}

      {/* <p>{randomRecipe.summary}</p> */}
    </div>
  );
}

export default Recipes;
