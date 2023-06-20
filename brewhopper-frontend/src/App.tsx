import { ToastContainer } from "react-toastify";
import "./App.css";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./components/layout";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow ">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
