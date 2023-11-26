import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "../pages/App";
import LandingPage from "../pages/landing-page/index";
import AboutUs from "@/pages/landing page/aboutUs";


export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
        },
        {
            path: '/landing-page',
            element: <LandingPage />,
            children: [
                {
                    path: 'kelas', // Menggunakan path yang terpisah untuk Kelas
                    element: <AboutUs />
                },
            ],
        },
    ])

    return(
        <RouterProvider router={router}/>
    )
}