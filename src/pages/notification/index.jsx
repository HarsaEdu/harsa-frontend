import Layout from "@/components/layout/Index";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import deleteIcon from "../../assets/delete.svg";
import previous from "../../assets/icons/arrow-bottom.svg";
import next from "../../assets/icons/arrow-top.svg";

export default function Notification() {
  const notification = [
    {
      title: "Pengumuman Perubahan Tampilan UI",
      desc: "Kami dengan senang hati memberitahu Anda bahwa kami telah melakukan pembaruan pada tampilan antarmuka (UI) sistem LMS kami! Dengan desain yang lebih modern dan intuitif, pengalaman belajar Anda akan semakin menyenangkan. Segera login dan temukan perubahan yang menarik! Terima kasih, Tim Pengembangan LMS",
      sender: "System",
      date: "27 Okt",
      read: false,
    },
    {
      title: "Pengumuman Perubahan Tampilan UI",
      desc: "Kami dengan senang hati memberitahu Anda bahwa kami telah melakukan pembaruan pada tampilan antarmuka (UI) sistem LMS kami! Dengan desain yang lebih modern dan intuitif, pengalaman belajar Anda akan semakin menyenangkan. Segera login dan temukan perubahan yang menarik! Terima kasih, Tim Pengembangan LMS",
      sender: "System",
      date: "27 Okt",
      read: true,
    },
    {
      title: "Pengumuman Perubahan Tampilan UI",
      desc: "Kami dengan senang hati memberitahu Anda bahwa kami telah melakukan pembaruan pada tampilan antarmuka (UI) sistem LMS kami! Dengan desain yang lebih modern dan intuitif, pengalaman belajar Anda akan semakin menyenangkan. Segera login dan temukan perubahan yang menarik! Terima kasih, Tim Pengembangan LMS",
      sender: "System",
      date: "27 Okt",
      read: false,
    },
    {
      title: "Pengumuman Perubahan Tampilan UI",
      desc: "Kami dengan senang hati memberitahu Anda bahwa kami telah melakukan pembaruan pada tampilan antarmuka (UI) sistem LMS kami! Dengan desain yang lebih modern dan intuitif, pengalaman belajar Anda akan semakin menyenangkan. Segera login dan temukan perubahan yang menarik! Terima kasih, Tim Pengembangan LMS",
      sender: "System",
      date: "27 Okt",
      read: true,
    },
    {
      title: "Pengumuman Perubahan Tampilan UI",
      desc: "Kami dengan senang hati memberitahu Anda bahwa kami telah melakukan pembaruan pada tampilan antarmuka (UI) sistem LMS kami! Dengan desain yang lebih modern dan intuitif, pengalaman belajar Anda akan semakin menyenangkan. Segera login dan temukan perubahan yang menarik! Terima kasih, Tim Pengembangan LMS",
      sender: "System",
      date: "27 Okt",
      read: true,
    },
    {
      title: "Pengumuman Perubahan Tampilan UI",
      desc: "Kami dengan senang hati memberitahu Anda bahwa kami telah melakukan pembaruan pada tampilan antarmuka (UI) sistem LMS kami! Dengan desain yang lebih modern dan intuitif, pengalaman belajar Anda akan semakin menyenangkan. Segera login dan temukan perubahan yang menarik! Terima kasih, Tim Pengembangan LMS",
      sender: "System",
      date: "27 Okt",
      read: false,
    },
    {
      title: "Pengumuman Perubahan Tampilan UI",
      desc: "Kami dengan senang hati memberitahu Anda bahwa kami telah melakukan pembaruan pada tampilan antarmuka (UI) sistem LMS kami! Dengan desain yang lebih modern dan intuitif, pengalaman belajar Anda akan semakin menyenangkan. Segera login dan temukan perubahan yang menarik! Terima kasih, Tim Pengembangan LMS",
      sender: "System",
      date: "27 Okt",
      read: true,
    },
    {
      title: "Pengumuman Perubahan Tampilan UI",
      desc: "Kami dengan senang hati memberitahu Anda bahwa kami telah melakukan pembaruan pada tampilan antarmuka (UI) sistem LMS kami! Dengan desain yang lebih modern dan intuitif, pengalaman belajar Anda akan semakin menyenangkan. Segera login dan temukan perubahan yang menarik! Terima kasih, Tim Pengembangan LMS",
      sender: "System",
      date: "27 Okt",
      read: false,
    },
  ];

  const [filter, setFilter] = useState("all");
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredNotifications(notification);
    } else if (filter === "unread") {
      setFilteredNotifications(notification.filter((n) => !n.read));
    }
  }, [filter, notification]);

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
    document.getElementById("cancel-btn").addEventListener("click", () => {
      Swal.close();
    });
    document.getElementById("confirm-btn").addEventListener("click", () => {
      Swal.close();
    });
  };

  const handleDelete = (index) => {
    confirmDeletion(() => {
      const updatedNotifications = [...filteredNotifications];
      updatedNotifications.splice(index, 1);
      setFilteredNotifications(updatedNotifications);
    });
  };

  const handleDeleteSelected = () => {
    confirmDeletion(() => {
      const updatedNotifications = filteredNotifications.filter(
        (_, i) => !selectedNotifications.includes(i),
      );
      setFilteredNotifications(updatedNotifications);
      setSelectedNotifications([]);
      showAlert();
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

  const handleSelect = (index) => {
    if (selectedNotifications.includes(index)) {
      setSelectedNotifications(
        selectedNotifications.filter((i) => i !== index),
      );
    } else {
      setSelectedNotifications([...selectedNotifications, index]);
    }
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length < filteredNotifications.length) {
      setSelectedNotifications(filteredNotifications.map((_, i) => i));
    } else {
      setSelectedNotifications([]);
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
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

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

            {displayedItems.map((data, index) => (
              <section
                key={index}
                className={`flex w-full items-center gap-10 rounded-lg border p-5 ${
                  data.read ? "" : "border-amber-500"
                }`}
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
                  <p className="truncate">{data.desc}</p>
                </section>
                <section className="flex w-full items-center justify-between gap-5 font-bold">
                  <p>{data.sender}</p>
                  <p>{data.date}</p>
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
