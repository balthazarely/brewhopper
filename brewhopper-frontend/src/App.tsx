import { ToastContainer } from "react-toastify";
import "./App.css";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./components/layout";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen pt-20">
        <main className="flex-grow border-4 flex  h-full">
          <Outlet />
        </main>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
