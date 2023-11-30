import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "../pages/App";
import LandingPage from "../pages/landing-page/index";
import Dashboard from "@/pages/dashboard/index";
import ListClass from "@/pages/list-class";
import CreateMaterial from "@/pages/module/createMaterial";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/test",
      element: <App />,
    },
    {
      path: "/landing-page",
      element: <LandingPage />,
      // children: [
      //     {
      //         path: 'kelas', // Menggunakan path yang terpisah untuk Kelas
      //         element: <AboutUs />
      //     },
      // ],
    },
    {
      path: "/module",
      children: [
        {
          path: "create",
          element: <CreateMaterial />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
