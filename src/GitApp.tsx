import { FC } from "react";
import { Outlet } from "react-router";
import NavBar from "./issues/components/NavBar";

export const GitApp: FC = () => {
  return (
    <div className="container mt-3">
      <h1>
        Git Issues <small>Seguimiento de problemas</small>{" "}
      </h1>
      <NavBar />
      <Outlet />
    </div>
  );
};
