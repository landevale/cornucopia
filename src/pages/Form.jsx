import { useEffect } from "react";
import { Outlet } from "react-router-dom";
// import { Routes, Route, Link, Outlet, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { intolerancesCheckboxes } from "../data/intolerancesCheckboxes";
import { cuisineCheckboxes } from "../data/cuisineCheckboxes";
import CheckboxIntol from "../components/CheckboxIntol";
import CheckboxCuisine from "../components/CheckboxCuisine";
import PropTypes from "prop-types";

function Form({
  handleSubmit,
  intolStates,
  setIntolStates,
  cuiStates,
  setCuiStates,
}) {
  Form.propTypes = {
    handleSubmit: PropTypes.func,
    intolStates: PropTypes.object,
    setIntolStates: PropTypes.func,
    cuiStates: PropTypes.object,
    setCuiStates: PropTypes.func,
  };

  useEffect(() => {
    setIntolStates(intolerancesCheckboxes);
    setCuiStates(cuisineCheckboxes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />

      <main className="px-5">
        <div className="Form">
          <form onSubmit={handleSubmit} className="w-full max-w-sm relative">
            <div className="flex items-center border-b border-teal-500 py-2">
              <input
                type="text"
                // className="form-control"
                name="name"
                placeholder="ingredients e.g. pasta, basil"
                size="30"
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
              <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
                Search For Recipes
              </button>
            </div>
            <CheckboxIntol
              intolStates={intolStates}
              setIntolStates={setIntolStates}
            />
            <CheckboxCuisine
              cuiStates={cuiStates}
              setCuiStates={setCuiStates}
            />
          </form>
          <br />
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Form;
