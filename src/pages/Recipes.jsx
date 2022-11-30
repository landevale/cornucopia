import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";

function Recipes({ randomRecipe }) {
  const displayRecipe = Array.from(randomRecipe);
  console.log(displayRecipe);
  return (
    <>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 mt-14">
        {displayRecipe.map((ele, i) => (
          <div
            key={i}
            className="max-w-sm max-h-sm rounded overflow-hidden shadow-lg m-3 inline-grid"
          >
            <Link to={`/recipe/${ele.id}`}>
              <img className="w-fit h-fit" src={ele.image} alt={ele.title} />
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
      </div>
    </>
  );
}

export default Recipes;
