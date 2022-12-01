import PropTypes from "prop-types";

function Switch({ toggle, setToggle }) {
  Switch.propTypes = {
    toggle: PropTypes.bool,
    setToggle: PropTypes.func,
  };

  const toggleClass = " transform translate-x-6";
  return (
    <>
      {/*   Switch Container */}

      <div
        className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-teal-500 rounded-full p-1 cursor-pointer"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        {/* Switch */}
        <div
          className={
            "bg-teal-700 md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
            (toggle ? null : toggleClass)
          }
        ></div>
      </div>
    </>
  );
}

export default Switch;
