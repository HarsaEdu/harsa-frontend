import Layout from "@/components/layout/Index";
import { useEffect, useState } from "react";
import deleteIcon from "../../assets/delete.svg";

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

  const handleDelete = (index) => {
    setFilteredNotifications(
      filteredNotifications.filter((_, i) => i !== index),
    );
  };

  const handleDeleteSelected = () => {
    setFilteredNotifications(
      filteredNotifications.filter(
        (_, i) => !selectedNotifications.includes(i),
      ),
    );
    setSelectedNotifications([]);
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

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
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

          <section className="flex justify-center">
            <button
              disabled={isFirst}
              onClick={handleFirstPage}
              className="mr-2 rounded bg-blue-600 px-4 py-2 text-white"
            >
              First
            </button>
            <button
              disabled={isFirst}
              onClick={handlePreviousPage}
              className="mr-2 rounded bg-blue-600 px-4 py-2 text-white"
            >
              Previous
            </button>
            <span className="rounded bg-blue-600 px-4 py-2 text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={isLast}
              onClick={handleNextPage}
              className="ml-2 rounded bg-blue-600 px-4 py-2 text-white"
            >
              Next
            </button>
            <button
              disabled={isLast}
              onClick={handleLastPage}
              className="ml-2 rounded bg-blue-600 px-4 py-2 text-white"
            >
              Last
            </button>
          </section>
        </section>
      </main>
    </Layout>
  );
}
