import { useState, useEffect, useRef } from "react";

function Form({ handleSubmit }) {
  return (
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
    </div>
  );
}

export default Form;
