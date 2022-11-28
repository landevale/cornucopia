import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Recipes({ randomRecipe }) {
  const displayRecipe = Array.from(randomRecipe);
  console.log(displayRecipe);
  return (
    <>
      <div className="Recipe">
        {/*  */}
        {displayRecipe.map((ele, i) => (
          <div
            key={i}
            className="max-w-sm max-h-sm rounded overflow-hidden shadow-lg m-3 inline-grid"
          >
            <Link to={`/recipe/${ele.id}`}>
              <img className="w-full h-fit" src={ele.image} alt={ele.title} />
            </Link>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{ele.title}</div>
              {/* <p className="text-gray-700 text-base">{ele.summary}</p> */}
            </div>
            {/* <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #photography
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #travel
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #winter
              </span>
            </div> */}
          </div>
        ))}

        {/*  */}
        {/* {displayRecipe.map((ele, i) => (
        <div key={i}>
          <h2>{ele.title}</h2>
          <Link to={`/recipe/${ele.id}`}>
            <img src={ele.image} />
          </Link>
          <br />
        </div>
      ))} */}
      </div>
    </>
  );
}

export default Recipes;
