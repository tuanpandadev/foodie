import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/main-layout";

import { HomePage } from "@/pages/(public-routes)/home";
import { MenuPage } from "@/pages/(public-routes)/menu";

import { PrivateRouteLayout } from "@/pages/(private-routes)";
import { UpdateProfilePage } from "@/pages/(private-routes)/profile/update-profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/menu",
        element: <MenuPage />
      },
      {
        path: "/profile/update-profile",
        element: (
          <PrivateRouteLayout>
            <UpdateProfilePage />
          </PrivateRouteLayout>
        )
      }
    ]
  }
]);
