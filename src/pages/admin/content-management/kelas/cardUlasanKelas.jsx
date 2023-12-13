import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Delete from "../../../../assets/Delete.svg";

const MySwal = withReactContent(Swal);

function ulasanKelas() {
  const [ulasanData, setUlasanData] = useState([
    {
      title: "maman",
      desc: "Pak Harnoko memberikan semangat pada kelas front-end, fokus pada HTML dan CSS untuk membangun dasar yang kuat dalam pengembangan web.",
      time: "12/02/2023",
      showDropdown: false,
      replyText: "",
    },
    {
      title: "surti",
      desc: "Dalam kelas JavaScript, Pak Harnoko memperkenalkan konsep pemrograman interaktif, memberikan pemahaman mendalam tentang pengembangan front-end yang dinamis.",
      time: "12/02/2023",
      showDropdown: false,
      replyText: "",
    },
    {
      title: "Jajang",
      desc: "Dengan penekanan pada desain responsif, Pak Harnoko membantu siswa menguasai teknik untuk tampilan situs web yang optimal di berbagai perangkat.",
      time: "12/02/2023",
      showDropdown: false,
      replyText: "",
    },
    {
      title: "Popol",
      desc: "Dalam mengajar framework front-end, Pak Harnoko membimbing siswa dalam menguasai alat-alat seperti React atau Angular untuk pengembangan web yang efisien dan dapat diperluas.",
      time: "12/02/2023",
      showDropdown: false,
      replyText: "",
    },
  ]);

  const handleBalasClick = (index) => {
    const updatedData = [...ulasanData];
    updatedData[index].showDropdown = !updatedData[index].showDropdown;
    setUlasanData(updatedData);
  };

  const handleReplySubmit = (index) => {
    console.log("Reply submitted:", ulasanData[index].replyText);
    const updatedData = [...ulasanData];
    updatedData[index].replyText = "";
    updatedData[index].showDropdown = false;
    setUlasanData(updatedData);
  };

  const handleBatalClick = (index) => {
    const updatedData = [...ulasanData];
    updatedData[index].replyText = "";
    updatedData[index].showDropdown = false;
    setUlasanData(updatedData);
  };

  const handleDeleteClick = (index) => {
    MySwal.fire({
      title: "Yakin kamu mau menghapus ini?",
      showCancelButton: true,
      confirmButtonColor: "#092C4C",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
      showCloseButton: true,
      customClass: {
        closeButton: "swal2-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = [...ulasanData];
        updatedData.splice(index, 1);
        setUlasanData(updatedData);
      }
    });
  };

  return (
    <section className="container mx-auto w-full space-y-5 px-2 py-2">
      <h2 className="text-start text-xl font-bold">List Ulasan</h2>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-1">
        {ulasanData.map((value, index) => (
          <div
            key={index}
            className="mx-start relative w-full cursor-pointer space-y-3 rounded-xl border border-[#F2994A] bg-[#FFFFFF] p-2 text-black"
          >
            <div className="flex items-center justify-start">
              <div className="mr-6">
                <img
                  src={`/assets/ulasan/ulasan${index + 1}.svg`}
                  alt={`User${index + 1}`}
                />
              </div>
              <div className="flex flex-col">
                <h3 className="mb-1 text-start text-xs font-semibold sm:text-sm md:text-lg lg:text-xl xl:text-xl">
                  {value.title}
                </h3>
                <span className="text-xs text-gray-500 md:text-sm lg:text-base xl:text-xl">
                  {value.time}
                </span>
                <p className="mb-2 mt-8 text-start text-xs md:text-sm lg:text-base xl:text-xl">
                  {value.desc}
                </p>

                <div className="flex space-x-2">
                  <button
                    className="self-start font-bold text-black transition-all duration-300 ease-in-out hover:text-gray-500"
                    onClick={() => handleBalasClick(index)}
                  >
                    Balas
                  </button>
                  <button onClick={() => handleDeleteClick(index)}>
                    <img src={Delete} alt="Delete" />
                  </button>
                </div>

                <div
                  className={`reply-dropdown mt-4 p-2 transition-all duration-200 ease-in-out ${
                    value.showDropdown ? "visible" : "hidden"
                  }`}
                >
                  <div className="relative w-full">
                    <input
                      style={{
                        borderBottom: `2px solid ${
                          value.replyText.trim() !== "text"
                            ? "black"
                            : "transparent"
                        }`,
                      }}
                      className="w-full border-none bg-transparent p-0 outline-none focus:border-none"
                      placeholder="Tambahkan Balasan"
                      value={value.replyText}
                      onChange={(e) => {
                        const updatedData = [...ulasanData];
                        updatedData[index].replyText = e.target.value;
                        setUlasanData(updatedData);
                      }}
                    />
                  </div>

                  <div className="mt-2 flex justify-end">
                    <button
                      className="mr-1 rounded-full border border-[#092C4C] bg-white px-3 py-2 font-bold text-[#092C4C] transition-all duration-300 ease-in-out hover:bg-[#092C4C] hover:text-white"
                      onClick={() => handleBatalClick(index)}
                    >
                      Batal
                    </button>
                    <button
                      className="rounded-full bg-[#092C4C] px-3 py-2 font-bold text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-[#092C4C]"
                      onClick={() => handleReplySubmit(index)}
                    >
                      Balas
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ulasanKelas;
