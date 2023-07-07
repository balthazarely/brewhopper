import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import store from "./store.js";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.tsx";
import BreweryScreen from "./screens/BreweryScreen.tsx";
import AdminScreen from "./screens/admin/AdminScreen.tsx";
import { Provider } from "react-redux";
import LoginScreen from "./screens/LoginScreen.tsx";
import RegisterScreen from "./screens/RegisterScreen.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import AdminRoute from "./components/AdminRoute.tsx";
import AdminEditBrewery from "./screens/admin/AdminEditBrewery.tsx";
import PassportScreen from "./screens/PassportScreen.tsx";
import BeerScreen from "./screens/BeerScreen.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/brewery/:id" element={<BreweryScreen />} />
        <Route path="/beer/:id" element={<BeerScreen />} />
        <Route path="/passport" element={<PassportScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/admin/edit-brewery/:id" element={<AdminEditBrewery />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
