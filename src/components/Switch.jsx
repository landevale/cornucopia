import { useState } from "react";

function Switch() {
  const [toggle, setToggle] = useState(true);
  const toggleClass = " transform translate-x-5";
  return (
    <>
      {/* <div className="flex flex-col justify-center h-screen items-center "> */}
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
      {/* </div> */}
    </>
  );
}

export default Switch;
