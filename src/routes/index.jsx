import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "../pages/App";
import LandingPage from "../pages/landing-page/index";
import AboutUs from "../pages/landing-page/aboutUs";
import MateriOverview from "@/pages/module/updateKelas";
import Dashboard from "@/pages/dashboard/index";
import ListClass from "@/pages/list-class";
import CreateMaterial from "@/pages/module/createMaterial";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/kelas",
      element: <MateriOverview />,
    },
    {
      path: "/landing-page",
      element: <LandingPage />,
      children: [
        {
          path: "aboutUs", // Menggunakan path yang terpisah untuk Kelas
          element: <AboutUs />
        }
       ]
      },
      {
            path: '/module',
            children: [
                {
                    path: 'create',
                    element: <CreateMaterial />
                }
            ]
        },
  ]);

  return <RouterProvider router={router} />;
}
