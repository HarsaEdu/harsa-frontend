import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "../pages/App";
import LandingPage from "../pages/landing-page/index";
import Dashboard from "@/pages/dashboard/index";
import ListClass from "@/pages/list-class";


export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <LandingPage />,
        },
        {
            path: '/dashboard',
            element: <Dashboard />,
        },
        {
            path: '/kelas',
            element: <ListClass />
        },
    ])

    return(
        <RouterProvider router={router}/>
    )
}