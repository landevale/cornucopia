import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function ErrorPage() {
  return (
    <>
      <Navbar />
      <h2>OOPS!</h2>
      <img src="src/assets/spill.png" />
    </>
  );
}

export default ErrorPage;
