import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function PrivateRoute() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}
