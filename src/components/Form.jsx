import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Form({ handleSubmit }) {
  return (
    <>
      <Navbar />
      <div className="Form">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              type="text"
              // className="form-control"
              name="name"
              placeholder="ingredients e.g. pasta, basil"
              size="30"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
            >
              Search for Recipes
            </button>
          </div>
        </form>
        <Outlet />
      </div>
    </>
  );
}

export default Form;
