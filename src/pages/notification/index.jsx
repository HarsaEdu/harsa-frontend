import Layout from "@/components/layout/Index";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import deleteIcon from "../../assets/icons/delete.svg";
import previous from "../../assets/icons/arrow-bottom.svg";
import next from "../../assets/icons/arrow-top.svg";
import { useNavigate } from "react-router-dom";
import {
  getNotification,
  deleteNotification,
  readNotification,
} from "@/utils/apis/notification/api";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [readNotificationsIndices, setReadNotificationsIndices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotification();
        setNotifications(data.data);
        setFilteredNotifications(data.data);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredNotifications(notifications);
    } else if (filter === "unread") {
      setFilteredNotifications(notifications.filter((n) => !n.read));
    }
  }, [filter, notifications]);

  const navigate = useNavigate();
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

  const handleDeleteSelected = async () => {
    confirmDeletion(async () => {
      try {
        const idsToDelete = selectedNotifications.map(
          (index) => notifications[index].id,
        );
        await Promise.all(idsToDelete.map((id) => deleteNotification(id)));

        const updatedNotifications = notifications.filter(
          (n, index) => !selectedNotifications.includes(index),
        );
        setNotifications(updatedNotifications);
        setFilteredNotifications(updatedNotifications); // Update filteredNotifications after deletion
        setSelectedNotifications([]);
        showAlert();
      } catch (error) {
        console.error("Failed to delete selected notifications", error);
      }
    });
  };

  const showAlert = () => {
    Swal.fire({
      title: "Data Berhasil Dihapus!",
      icon: "success",
      showConfirmButton: false,
      showCloseButton: true,
    }).then((result) => {
      if (result.isDismissed) {
        navigate(`/notification`);
      }
    });
  };

  const handleReadNotification = async (id, index) => {
    try {
      const notification = notifications[index];

      if (notification && !notification.is_read) {
        await readNotification(id);

        const updatedNotifications = [...notifications];
        updatedNotifications[index].is_read = true;
        setNotifications(updatedNotifications);
        // Tambahkan indeks notifikasi yang telah dibaca ke state
        setReadNotificationsIndices((prevIndices) => [...prevIndices, index]);
      }
      navigate(`/detail-notifikasi/${id}`);
    } catch (error) {
      console.error("Gagal menandai notifikasi sebagai sudah dibaca", error);
    }
  };

  const handleSelectAll = () => {
    const allIndices = notifications.map((_, index) => index);
    setSelectedNotifications(allIndices);
  };

  const handleSelect = (index) => {
    if (selectedNotifications.includes(index)) {
      setSelectedNotifications(
        selectedNotifications.filter((i) => i !== index),
      );
    } else {
      setSelectedNotifications([...selectedNotifications, index]);
    }
  };

  const pageSize = 5;
  const totalItems = filteredNotifications.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const [currentPage, setCurrentPage] = useState(1);
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedItems = filteredNotifications.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );

    return pageNumbers.map((number) => (
      <button
        key={number}
        onClick={() => setCurrentPage(number)}
        className={`rounded px-4 py-2 ${
          currentPage === number
            ? "bg-blue-600 text-white"
            : "bg-white text-black"
        }`}
      >
        {number}
      </button>
    ));
  };

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

  return (
    <Layout>
      <main>
        <section className="space-y-5">
          <h1 className="text-2xl font-bold">Notifikasi</h1>

          <section className="h-full w-full space-y-5 rounded-lg border p-5">
            <h2 className="text-center text-lg font-bold">Inbox</h2>

            <section className="h-fit w-fit overflow-hidden rounded-md border">
              <button
                type="button"
                className={`rounded-md px-5 py-1 ${
                  filter === "all" && "bg-blue-500 text-white"
                }`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                type="button"
                className={`rounded-md px-5 py-1 ${
                  filter === "unread" && "bg-blue-500 text-white"
                }`}
                onClick={() => setFilter("unread")}
              >
                Unread
              </button>
            </section>

            <section className="ml-[21px] flex items-center justify-between gap-5">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  onChange={handleSelectAll}
                  checked={
                    selectedNotifications.length ===
                    filteredNotifications.length
                  }
                />
                <label htmlFor="selectAll" className="font-bold">
                  Select All
                </label>
              </div>
              <img
                src={deleteIcon}
                alt="Delete"
                width={20}
                onClick={handleDeleteSelected}
              />
            </section>

            {filteredNotifications.map((data, index) => (
              <section
                key={index}
                className={`flex w-full items-center gap-10 rounded-lg border p-5 ${
                  data.read && !readNotificationsIndices.includes(index)
                    ? "border-amber-500"
                    : ""
                }`}
                onClick={() => handleReadNotification(data.id, index)}
              >
                <section className="w-2/4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={`select${index}`}
                      id={`select${index}`}
                      onChange={() => handleSelect(index)}
                      checked={selectedNotifications.includes(index)}
                    />
                    <label
                      htmlFor={`select${index}`}
                      className="truncate font-bold"
                    >
                      {data.title}
                    </label>
                  </div>
                  <p className="truncate">{data.content.substring(0, 50)}...</p>
                </section>
                <section className="flex w-full items-center justify-between gap-5 font-bold">
                  <p>{data.sender}</p>
                  <p>
                    <UpdateTimeDisplay updatedAt={data.update_at} />
                  </p>
                  <img
                    src={deleteIcon}
                    alt="Delete"
                    width={20}
                    onClick={() => handleDelete(index)}
                  />
                </section>
              </section>
            ))}
          </section>

          <section className="flex items-center justify-center space-x-2">
            <button
              onClick={handlePreviousPage}
              className={`rounded border bg-white px-4 py-4 text-black`}
              style={{ border: "1px solid #000" }}
              disabled={isFirst}
            >
              <img
                src={previous}
                alt="Next"
                width={16}
                height={11}
                className="rotate-90"
              />
            </button>
            {renderPageNumbers()}
            <button
              onClick={handleNextPage}
              className={`rounded border bg-white px-4 py-4 text-black`}
              style={{ border: "1px solid #000" }}
              disabled={isLast}
            >
              <img
                src={next}
                alt="Next"
                width={16}
                height={11}
                className="rotate-90"
              />
            </button>
          </section>
        </section>
      </main>
    </Layout>
  );
}
