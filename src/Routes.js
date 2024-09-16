import { Route, Routes as BaseRoutes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ToDo from "./components/ToDo";

export default function Routes() {
  return (
    <BaseRoutes>
      <Route path="/" element={<ToDo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </BaseRoutes>
  );
}
