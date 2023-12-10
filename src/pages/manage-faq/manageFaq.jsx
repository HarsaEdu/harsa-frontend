import Layout from "@/components/layout/Index";
import Breadcrumb from "@/components/breadcrumb";
import Table from "@/components/table/tables";
import { React, useMemo, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { deleteFAQ } from "@/utils/apis/faq";
import DropdownAction from "@/components/table/DropdownAction";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function ManageFaq() {
  const [faqData, setFaqData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFaqData();
  }, []);

  async function fetchFaqData () {
    try {
      const response = await axios.get(
        "https://api.harsaedu.my.id/web/faqs?offset=0&limit=10"
      );
      setFaqData(response.data.data);
    } catch (error) {
      console.error("Error fetching FAQ data:", error);
    }
  };

  const handleEdit = (id) => {
    // Navigasi ke halaman edit FAQ dengan ID yang sesuai
    navigate(`/content-management/FAQ/${id}/edit-FAQ`);
  };

  const handleDelete = async (id) => {
    try {
      // Menampilkan konfirmasi SweetAlert
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Data FAQ akan dihapus permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!",
      });

      if (result.isConfirmed) {
        // Panggil fungsi deleteFAQ untuk menghapus FAQ
        await deleteFAQ(id);
        // Perbarui data setelah penghapusan berhasil
        fetchFaqData();

        // Menampilkan pesan SweetAlert setelah penghapusan berhasil
        Swal.fire({
          title: "Berhasil!",
          text: "Data FAQ telah dihapus.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Failed to delete FAQ", error);

      // Menampilkan pesan SweetAlert jika penghapusan gagal
      Swal.fire({
        title: "Error!",
        text: "Gagal menghapus data FAQ.",
        icon: "error",
      });
    }
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
