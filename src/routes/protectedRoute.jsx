import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  const role_name = localStorage.getItem('role_name');

  // Halaman yang bisa diakses oleh pengguna yang sudah login
  const loggedInAccessible = ["/dashboard", "/dashboard-admin", "/content-management/FAQ/tambah-FAQ", "/content-management/FAQ/:id/edit-FAQ", "/user-management/edit-user/:id", "/riwayat-transaksi", "/kelas", "/kelas/manage-kelas",  "/kelas/manage-modul", "/kelas/tambah-modul", "/kelas/tambah-modul/tambah-tugas","/kelas/tambah-kuis", "/kelas/tambah-pertanyaan", "/kelas/manage-tugas","/kelas/manage-tugas/edit", "/edit-profile", "/faq"];

  // Halaman yang hanya bisa diakses oleh admin
  const adminAccessible = ["/dashboard-admin", "/content-management/FAQ/tambah-FAQ", "/content-management/FAQ/:id/edit-FAQ", "/user-management/edit-user/:id", "/riwayat-transaksi", "/kelas", "/kelas/manage-kelas",  "/kelas/manage-modul", "/kelas/tambah-modul/tambah-tugas","/kelas/tambah-kuis", "/kelas/tambah-pertanyaan", "/kelas/manage-tugas","/kelas/manage-tugas/edit", "/edit-profile", "/faq"];

  // Halaman yang hanya bisa diakses oleh instructor
  const instructorAccessible = ["/dashboard", "/kelas", "/kelas/manage-kelas",  "/kelas/manage-modul", "/kelas/tambah-modul", "/kelas/tambah-modul/tambah-tugas","/kelas/tambah-kuis", "/kelas/tambah-pertanyaan", "/kelas/manage-tugas","/kelas/manage-tugas/edit", "/edit-profile", "/faq"];

  // Landing page yang tidak bisa diakses oleh pengguna yang sudah login
  const landingPage = ["/", "/login"];

  // Jika belum login, redirect ke landing page
  if (!role_name && loggedInAccessible.includes(pathname)) {
    navigate("/login");
    return null;
  }

  // Jika sudah login, tapi mencoba mengakses landing page, redirect ke dashboard
  if (role_name && landingPage.includes(pathname)) {
    navigate("/dashboard"); // Ganti dengan rute dashboard yang sesuai
    return null;
  }

  // Jika sudah login, cek hak akses berdasarkan role_name
  if (role_name) {
    // Admin hanya bisa akses halaman admin
    if (role_name === "admin" && !adminAccessible.includes(pathname)) {
      navigate("/dashboard-admin"); // Redirect ke halaman admin jika mencoba mengakses halaman lain
      return null;
    }

    // Instructor hanya bisa akses halaman instructor
    if (role_name === "instructor" && !instructorAccessible.includes(pathname)) {
      navigate("/dashboard"); // Redirect ke halaman instructor jika mencoba mengakses halaman lain
      return null;
    }
  }

  // Jika semua pengecekan berhasil, render Outlet
  return <Outlet />;
};

export default ProtectedRoute;
