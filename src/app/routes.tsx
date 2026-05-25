import { createBrowserRouter } from "react-router";
import Dashboard from "./pages/Dashboard";
import NuevaSolicitud from "./pages/NuevaSolicitud";
import RegistroTutor from "./pages/RegistroTutor";
import MisSolicitudes from "./pages/MisSolicitudes";
import LoginTutor from "./pages/LoginTutor";
import DashboardTutor from "./pages/DashboardTutor";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/nueva-solicitud",
    Component: NuevaSolicitud,
  },
  {
    path: "/registro-tutor",
    Component: RegistroTutor,
  },
  {
    path: "/mis-solicitudes",
    Component: MisSolicitudes,
  },
  {
    path: "/login-tutor",
    Component: LoginTutor,
  },
  {
    path: "/dashboard-tutor",
    Component: DashboardTutor,
  },
]);
