import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  const role_name = localStorage.getItem("role_name");
  const token = localStorage.getItem("access_token");

  // Halaman yang bisa diakses oleh pengguna yang sudah login
  const loggedInAccessible = [
    "/dashboard",
    "/dashboard-admin",

    "/kelas/manage-kelas/list-user",
    "/category-management/category",
    "/category-management/tambah-category",
    "/category-management/edit-category",
    "/langganan",
    "/content-management/FAQ/",
    "/content-management/FAQ/tambah-FAQ",
    "/content-management/FAQ/:id/edit-FAQ",

    "/content-management",
    "/kelas",

    "/user-management",
    "/langganan",
    "/riwayat-transaksi",
    "/edit-profile",
    "/faq",
    "/notifikasi",
  ];

  // Halaman yang hanya bisa diakses oleh admin
  const adminAccessible = [
    "/dashboard-admin",

    "/content-management/FAQ/",
    "/content-management/FAQ/tambah-FAQ",
    "/content-management/FAQ/:id/edit-FAQ",
    "/category-management/category",
    "/category-management/tambah-category",
    "/category-management/edit-category",
    "/langganan",

    "/content-management",

    "/user-management",
    "/langganan",
    "/riwayat-transaksi",
    "/kelas",
    "/edit-profile",
    "/faq",
    "/notifikasi",
  ];

  // Halaman yang hanya bisa diakses oleh instructor
  const instructorAccessible = [
    "/dashboard",
    "/kelas",
    "/edit-profile",
    "/faq",
    "/notifikasi",
  ];

  // Landing page yang tidak bisa diakses oleh pengguna yang sudah login
  const landingPage = ["/", "/login"];

  // Jika belum login, redirect ke landing page
  if (!token && loggedInAccessible.includes(pathname)) {
    return <Navigate to="/login" />;
  }

  // Jika sudah login, tapi mencoba mengakses landing page, redirect ke dashboard
  if (role_name && landingPage.includes(pathname)) {
    // Ganti dengan rute dashboard yang sesuai
    return <Navigate to="/dashboard" />;
  }

  // Jika sudah login, cek hak akses berdasarkan role_name
  if (role_name) {
    // Admin hanya bisa akses halaman admin
    if (role_name === "admin" && !adminAccessible.some((route) => pathname.startsWith(route))) {
      // Redirect ke halaman admin jika mencoba mengakses halaman lain
      return <Navigate to="/dashboard-admin" />;
    }

    // Instructor hanya bisa akses halaman instructor
    if (role_name === "instructor" && !instructorAccessible.some((route) => pathname.startsWith(route))) {
      // Redirect ke halaman instructor jika mencoba mengakses halaman lain
      return <Navigate to="/dashboard" />;
    }
  }

  // Jika semua pengecekan berhasil, render Outlet
  return <Outlet />;
};

export default ProtectedRoute;
