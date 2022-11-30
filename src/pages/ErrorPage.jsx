import Navbar from "../components/Navbar";

function ErrorPage() {
  return (
    <>
      <Navbar />
      <main className="px-5 relative">
        <h2 className="text-9xl">OOPS!</h2>
        <img className="absolute top-0 w-screen" src="src/assets/spill.png" />
      </main>
    </>
  );
}

export default ErrorPage;
