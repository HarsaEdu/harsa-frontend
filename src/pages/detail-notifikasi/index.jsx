import Layout from "@/components/layout/Index";
import moment from "moment";
import {
  getNotification,
  getNotificationById,
  deleteNotification,
  readNotification,
} from "@/utils/apis/notification/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DetailNotification() {
  const [notification, setNotification] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotificationById(params.notificationId);
        setNotification(data.data);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchData();
  }, []);

  const UpdateTimeDisplay = ({ updatedAt }) => {
    const [formattedTime, setFormattedTime] = useState("");

    useEffect(() => {
      const formattedUpdateTime = formatUpdateTime(updatedAt);
      setFormattedTime(formattedUpdateTime);
    }, [updatedAt]);

    const formatUpdateTime = (updateTime) => {
      const momentTime = moment(updateTime);
      const formattedDate = momentTime.format("DD MMM, HH:mm [WIB]");

      return formattedDate;
    };

    return <span>{formattedTime}</span>;
  };

  const confirmDeletion = (callback) => {
    Swal.fire({
      title: "Apakah Kamu Yakin Mau Hapus Data Ini?",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "Batal",
      cancelButtonColor: "#F2994A",
      confirmButtonText: "Ya, Hapus",
      confirmButtonColor: "#092C4C",
    }).then((result) => {
      if (result.isDismissed) {
        Swal.fire({
          title: "Penghapusan Dibatalkan",
          icon: "info",
          showConfirmButton: false,
          showCloseButton: true,
        });
      } else if (result.isConfirmed) {
        callback();
        Swal.fire({
          title: "Data Berhasil Dihapus!",
          icon: "success",
          showConfirmButton: false,
          showCloseButton: true,
        }).then(() => {
          navigate(`/notification`);
        });
      }
    });
  };

  const handleDelete = async (id) => {
    confirmDeletion(async () => {
      try {
        await deleteNotification(id);
        const updatedNotifications = notifications.filter((n) => n.id !== id);
        setNotifications(updatedNotifications);
        setFilteredNotifications(updatedNotifications);
      } catch (error) {
        console.error("Failed to delete notification", error);
      }
    });
  };

  return (
    <Layout>
      <main>
        <section className="space-y-5">
          <h1 className="text-4xl font-bold">Notifikasi</h1>
          <section className="rounded-lg border p-5">
            <h2 className="pb-5 text-2xl font-semibold">Inbox</h2>
            <section className="rounded-lg border p-5">
              <h3 className="text-xl font-semibold">{notification.title}</h3>
              <p>
                <UpdateTimeDisplay updatedAt={notification.updatedAt} />
                <br />
                From : Sistem
              </p>
              <br />
              <p>{notification.content}</p>
              <section className="mt-10 space-x-3">
                <button
                  type="button"
                  className="rounded-md bg-[#092C4C] px-3 py-1 text-white"
                  onClick={() => navigate("/notifikasi")}
                >
                  Kembali
                </button>
                <button
                  type="button"
                  className="rounded-md bg-red-500 px-3 py-1 text-white"
                  onClick={() => handleDelete(notification.id)}
                >
                  Hapus
                </button>
              </section>
            </section>
          </section>
        </section>
      </main>
    </Layout>
  );
}
