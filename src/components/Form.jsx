import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Form({ handleSubmit }) {
  return (
    <>
      <Navbar />
      <div className="Form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="ingredients e.g. pasta, basil"
            size="30"
          />
          <button>Search for Recipes</button>
        </form>
        <Outlet />
      </div>
    </>
  );
}

export default Form;
