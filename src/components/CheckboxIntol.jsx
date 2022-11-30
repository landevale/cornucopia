const Checkbox = ({ label, value, intolStates, setIntolStates }) => {
  const showDropdownOptions = (event) => {
    event.preventDefault();
    document.getElementById("options").classList.toggle("hidden");
    document.getElementById("arrow-up").classList.toggle("hidden");
    document.getElementById("arrow-down").classList.toggle("hidden");
  };

  return (
    <>
      <div className="flex-none p-2 absolute">
        <button
          onClick={showDropdownOptions}
          className="flex flex-row justify-between w-48 px-2 py-2 text-gray-700 bg-white border-2 border-white rounded-md shadow focus:outline-none focus:border-teal-500"
        >
          <span className="select-none">Intolerances</span>

          <svg
            id="arrow-down"
            className="hidden w-6 h-6 stroke-current"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            id="arrow-up"
            className="w-6 h-6 stroke-current"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          id="options"
          className="hidden w-48 py-2 mt-2 bg-white rounded-lg shadow-xl"
        >
          {Object.keys(intolStates).map((ele, i) => (
            <label
              key={i}
              className="block px-4 py-2 text-gray-800 hover:bg-teal-500 hover:text-white"
            >
              <input
                type="checkbox"
                checked={intolStates.ele}
                onChange={() => {
                  console.log(ele);
                  console.log(intolStates[ele]);

                  setIntolStates({
                    ...intolStates,
                    [ele]: intolStates[ele] ? false : true,
                  });
                }}
              />
              <span> {ele}</span>
            </label>
          ))}
        </div>
      </div>

      {/* <label>
        <input
          type="checkbox"
          checked={value}
          onChange={() => {
            console.log(label);
            console.log(intolStates[label]);
            // console.log(event.target.checked);
            setIntolStates({
              ...intolStates,
              [label]: intolStates[label] ? false : true,
            });
          }}
        />
        <span>{label}</span>
      </label> */}
    </>
  );
};

export default Checkbox;
