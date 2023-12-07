import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "../pages/landing-page/index";
import MateriOverview from "@/pages/module/updateKelas";
import UserManagement from "../pages/admin/userManagement";
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
import EditFAQ from "@/pages/manage-faq/editFaq";
import UpdateMaterial from "@/pages/module/updateMaterial";
import DashboardAdmin from "@/pages/admin/dashboard";
import EditProfileFaq from "@/pages/edit-profile/faq";
import AddSubscription from "@/pages/admin/pembayaran/tambahLangganan";
import AddSubscriptionPackage from "@/pages/admin/pembayaran/tambahPaketLangganan";
import EditSubscriptionPackage from "@/pages/admin/pembayaran/editPaketLangganan";
import DetailUser from "@/pages/admin/user-management/detailUser";
import HeaderEdit from "@/pages/admin/user-management";
import RiwayatTransaksi from "@/pages/admin/pembayaran/riwayatTransaksi";
import NotFoundPage from "@/pages/notFoundPage";
import ReviewTugas from "@/pages/manage-tugas/reviewTugas";

import ProtectedRoute from "./protectedRoute";

export default function Router() {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
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
        },
        {
          path: "/kelas",
          element: <ListClass />,
        },
        {
          path: "/kelas/manage-kelas",
          element: <MateriOverview />,
        },
        {
          path: "/kelas/tambah-modul",
          element: <CreateMaterial />,
        },
        {
          path: "/kelas/manage-kelas/manage-modul",
          element: <UpdateMaterial />,
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
          path: "/kelas/manage-tugas/review", //Nanti ganti jadi ID
          element: <ReviewTugas />,
        },
        {
          path: "/edit-profile",
          element: <EditProfile />,
        },
        {
          path: "/faq",
          element: <EditProfileFaq />,
        },
        {
          path: "/content-management/FAQ/tambah-FAQ",
          element: <AddFAQ />,
        },
        {
          path: "/content-management/FAQ/:id/edit-FAQ",
          element: <EditFAQ />,
        },
        {
          path: "/user-management", //Nanti ganti jadi ID
          element: <UserManagement />,
        },
        {
          path: "/user-management/detail",
          element: <DetailUser />,
        },
        {
          path: "/user-management/edit-user/:id",
          element: <HeaderEdit />,
        },
        {
          path: "/riwayat-transaksi",
          element: <RiwayatTransaksi />,
        },
        {
          path: "/dashboard-admin",
          element: <DashboardAdmin />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
    {
      path: "/langganan",
      element: <AddSubscription />,
    },
    {
      path: "/langganan/tambah-paket",
      element: <AddSubscriptionPackage />,
    },
    {
      path: `/langganan/edit-paket/:id`,
      element: <EditSubscriptionPackage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
