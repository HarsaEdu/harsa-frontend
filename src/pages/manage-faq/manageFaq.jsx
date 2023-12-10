import Layout from "@/components/layout/Index";
import Breadcrumb from "@/components/breadcrumb";
import Table from "@/components/table/tables";
import { React, useMemo, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { number } from "zod";
import { dataFaq } from "@/utils/dummyData";
import DropdownAction from "@/components/table/DropdownAction";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function ManageFaq() {
  const [faqData, setFaqData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const response = await axios.get(
          "https://api.harsaedu.my.id/web/faqs?offset=0&limit=10"
        );
        setFaqData(response.data.data);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchFaqData();
  }, []);

  const handleEdit = (id) => {
    // Navigasi ke halaman edit user dengan ID yang sesuai
    navigate(`/content-management/FAQ/${id}/edit-FAQ`);
  };

  const handleDelete = async (id) => {
    // Tampilkan konfirmasi sebelum menghapus
    Swal.fire({
      title: "Yakin kamu mau menghapus FAQ ini?",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      cancelButtonColor: "#6c757d",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `https://api.harsaedu.my.id/web/faqs/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );

          if (response.data.code === 200) {
            // Notifikasi setelah berhasil menghapus
            Swal.fire({
              title: "Sukses Menghapus FAQ",
              icon: "success",
              showConfirmButton: false,
              showCloseButton: true,
              timer: 2000,
            });

            // Perbarui data FAQ setelah penghapusan berhasil
            setFaqData((prevData) =>
              prevData.filter((faq) => faq.id !== id)
            );
          } else {
            console.error("Gagal menghapus FAQ:", response.data.message);
          }
        } catch (error) {
          console.error("Error deleting FAQ:", error);
        }
      }
    });
  };

  const columns = useMemo(() => [
    {
      header: "No",
      cell: (info) => <div className="text-center">{info.row.index + 1}</div>,
    },
    ,
    {
      header: "Pertanyaan",
      accessorKey: "question",
      cell: (info) => <div className="text-center">{info.row.original.question}</div>,
      rowSpan: true,
    },
    {
      header: "Jawaban",
      accessorKey: "answer",
      cell: (info) => <div className="text-center">{info.row.original.answer}</div>,
    },
    {
      header: "Action",
      rowSpan: true,
      cell: (info) => (
        <div className="text-center">
          <DropdownAction>
            <div className="flex flex-col">
              <Button
                className="bg-white px-8 text-black hover:text-white"
                onClick={() => handleEdit(info.row.original.id)} // Panggil fungsi handleEdit dengan ID sebagai argumen
              >
                Edit
              </Button>
              <Button
                className="bg-white px-8 text-black hover:text-white"
                onClick={() => handleDelete(info.row.original.id)}
              >
                Delete
              </Button>
            </div>
          </DropdownAction>
        </div>
      ),
    },
  ]);
  return (
    <>
      <Layout>
        <div className="container mb-10">
          <Breadcrumb />
          <div className="mt-10 rounded-lg border border-[#f2994a] p-11 font-poppins">
            <h2 className="text-3xl font-semibold">Kelola FAQ</h2>

            <div>
              <Table
                datas={faqData}
                columns={columns}
                rowVisible={true}
                isVisible={true}
                searchComponent={
                  <div className="flex w-1/2 items-center justify-end space-x-3">
                    <p className="text-xl font-semibold">Search</p>{" "}
                    <Input
                      id="search"
                      className="w-40 rounded border-[#092C4C]"
                    />
                    <Link to="/content-management/FAQ/tambah-FAQ">
                      <Button>Tambah FAQ</Button>
                    </Link>
                  </div>
                }
                classNameHeader="bg-[#a2d2ff]"
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
