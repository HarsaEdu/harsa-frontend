import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "@/pages/landing-page/index";
import MateriOverview from "@/pages/module/updateKelas";
import MateriKelas from "@/pages/admin/content-management/kelas/materiKelas";
import UserManagement from "@/pages/admin/userManagement";
import AssignUserAdmin from "@/pages/admin/content-management/kelas/assignUser";
import AboutUs from "@/pages/landing-page/aboutUs";
import EditProfile from "@/pages/edit-profile";
import AssignUserInstruktor from "@/pages/assign-users/assignUserInstruktor";
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
import AddSubscription from "@/pages/admin/pembayaran/manageSubscription";
import AddSubscriptionPackage from "@/pages/admin/pembayaran/addSubscription";
import EditSubscriptionPackage from "@/pages/admin/pembayaran/editSubscription";
import DetailUser from "@/pages/admin/user-management/detailUser";
import HeaderEdit from "@/pages/admin/user-management";
import RiwayatTransaksi from "@/pages/admin/pembayaran/riwayatTransaksi";
import NotFoundPage from "@/pages/notFoundPage";
import ReviewTugas from "@/pages/manage-tugas/reviewTugas";
import AddClass from "@/pages/class/index";
import AddUser from "@/pages/admin/user-management/tambahUser";
import ProtectedRoute from "./protectedRoute";
import ManageFaq from "@/pages/manage-faq/manageFaq";
import ManageCategory from "@/pages/admin/content-management/kategori/manageCategory";

import AddKategori from "@/pages/admin/content-management/kategori/addKategori";
import EditKategori from "@/pages/admin/content-management/kategori/editKategori";

import Notification from "@/pages/notification";

import DetailNotification from "@/pages/detail-notifikasi";
import ListTugas from "@/pages/manage-tugas/listTugas";
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
          path: "/kelas/manage-kelas/:id",
          element: <MateriOverview />,
          children: [
            {
              path: "/kelas/manage-kelas/:id", // Menggunakan path yang terpisah untuk Kelas
              element: <MateriKelas />,
            },
            {
              path: "/kelas/manage-kelas/:id/list-users", // Menggunakan path yang terpisah untuk Kelas
              element: <AssignUserAdmin />,
            },
            {
              path: "/kelas/manage-kelas/:id/list-user", // Menggunakan path yang terpisah untuk Kelas
              element: <AssignUserInstruktor />,
            },
          ],
        },
        {
          path: "/kelas/tambah-kelas",
          element: <AddClass />,
        },
        {
          path: "/kelas/tambah-modul/:id",
          element: <CreateMaterial />,
        },
        {
          path: "/kelas/manage-kelas/manage-modul/:id/section/:idSection",
          element: <UpdateMaterial />,
        },
        {
          path: "/kelas/tambah-modul/tambah-tugas/:idSection",
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
          path: "/kelas/manage-kelas/manage-tugas/:idSection",
          element: <ListTugas />,
        },
        {
          path: "/kelas/manage-tugas/:idSection/:idSubmission",
          element: <ManageTugas />,
        },
        {
          path: "/kelas/manage-tugas/edit/:idSection/:idSubmission", //Nanti ganti jadi ID
          element: <EditTugas />,
        },
        {
          path: "/kelas/manage-tugas/review/:idSubmission/:idSubmissionAns", //Nanti ganti jadi ID
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
          path: "/content-management/FAQ",
          element: <ManageFaq />,
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
          path: "/category-management/category",
          element: <ManageCategory />,
        },
        {
          path: "/category-management/tambah-category",
          element: <AddKategori />,
        },
        {
          path: "/category-management/edit-category/:id",
          element: <EditKategori />,
        },
        {
          path: "/user-management", //Nanti ganti jadi ID
          element: <UserManagement />,
        },
        {
          path: "/user-management/detail/:id",
          element: <DetailUser />,
        },
        {
          path: "/user-management/tambah-user",
          element: <AddUser />,
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
        {
          path: "/langganan",
          element: <AddSubscription />,
        },
        {
          path: "/langganan/tambah-paket",
          element: <AddSubscriptionPackage />,
        },
        {
          path: "/langganan/edit-paket/:id",
          element: <EditSubscriptionPackage />,
        },
        {
          path: "/notifikasi",
          element: <Notification />,
        },
        {
          path: "/detailnotifikasi",
          element: <DetailNotification />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
