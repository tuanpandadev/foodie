import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/main-layout";

import Home from "@/pages/home/home";
import Menu from "@/pages/shop/menu";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/menu",
        element: <Menu />
      }
    ]
  }
]);
