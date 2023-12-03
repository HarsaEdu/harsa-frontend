import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "../pages/App";
import LandingPage from "../pages/landing-page/index";
import MateriOverview from "@/pages/module/updateKelas";
import AboutUs from "@/pages/landing-page/aboutUs";
import EditProfile from "@/pages/edit-profile";
import Dashboard from "@/pages/dashboard/index";
import ListClass from "@/pages/list-class";
import CreateMaterial from "@/pages/module/createMaterial";
import CreateTask from "@/pages/module/createTasks";
import Login from "@/pages/login";
import AddQuiz from "@/pages/tambah-kuis";
import HeaderQuiz from "@/pages/tambah-kuis/header";
import ManageTugas from "@/pages/manage-tugas";
import EditTugas from "@/pages/manage-tugas/editTugas";
import AddFAQ from "@/pages/manage-faq/addFaq";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      // children: [
      //     {
      //         path: 'kelas', // Menggunakan path yang terpisah untuk Kelas
      //         element: <AboutUs />
      //     },
      // ],
    },
    {
      path: "/kelas",
      element: <ListClass />,
    },
    {
      path: "/kelas/tambah-modul",
      element: <CreateMaterial />,
    },
    {
      path: "/kelas/tambah-modul/tambah-tugas",
      element: <CreateTask />,
    },
    {
      path: "/kelas/tambah-kuis",
      element: <AddQuiz />,
    },
    {
      path: "/kelas/tambah-pertanyaan",
      element: <HeaderQuiz />,
    },
    {
      path: "/kelas/manage-tugas",
      element: <ManageTugas />,
    },
    {
      path: "/kelas/manage-tugas/edit", //Nanti ganti jadi ID
      element: <EditTugas />,
    },
    {
      path: "/edit-profile",
      element: <EditProfile />,
    },
    {
      path: "/content-management/FAQ/tambah-FAQ",
      element: <AddFAQ />,
    },
  ]);

  return <RouterProvider router={router} />;
}
