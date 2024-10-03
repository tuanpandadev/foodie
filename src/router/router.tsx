import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/main-layout";

import Home from "@/pages/home/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      }
    ]
  }
]);
