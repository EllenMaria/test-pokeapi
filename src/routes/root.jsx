import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../pages/error";
import { Home } from "../pages/home";
import { List } from "../pages/list";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/list",
    element: <List />,
  },
]);
