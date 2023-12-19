import Layout from "@/components/layout/Index";
import Breadcrumb from "@/components/breadcrumb";
import Table from "@/components/table/tables";
import { React, useMemo, useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { deleteFAQ } from "@/utils/apis/faq";
import DropdownAction from "@/components/table/DropdownAction";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import Pagination from "@/components/table/pagination";
import { getFAQ } from "@/utils/apis/faq/api";

export default function ManageFaq() {
  const [faqData, setFaqData] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [meta, setMeta] = useState([]);
  const [limitValue, setLimitValue] = useState(10);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSizes = ["5", "10", "25"];

  useEffect(() => {
    fetchData();
  }, [searchParams, limitValue, offset]);

  async function fetchData() {
    if (searchParams.has("limit")) {
      setLimitValue(searchParams.get("limit"));
    }

    if (searchParams.has("search")) {
      searchParams.set("offset", 0);
      setSearchValue(searchParams.get("search"));
    } else {
      searchParams.set("offset", offset);
      searchParams.set("limit", limitValue);
    }

    let query = Object.fromEntries(
      [...searchParams].filter((param) => param[0] !== "tab"),
    );

    try {
      setIsLoading(true);
      const response = await getFAQ({ ...query }); // Menggunakan getUser dari utils
      setFaqData(response.data);
      setMeta(response.pagination);
    } catch (error) {
      setError(error);
      setFaqData([]);
      setMeta([]);
    } finally {
      setIsLoading(false);
    }
  }

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
        fetchData();

        // Menampilkan pesan SweetAlert setelah penghapusan berhasil
        Swal.fire({
          title: "Berhasil!",
          text: "Data FAQ telah dihapus.",
          icon: "success",
          showConfirmButton: false,
          showCloseButton: true,
          timer: 2000,
          timerProgressBar: true,
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

  function handlePagination(newOffset) {
    setOffset(newOffset);

    // Update the searchParams with the new offset value
    searchParams.set("limit", String(limitValue));
    searchParams.set("offset", String(newOffset));
    setSearchParams(searchParams);
  }

  function handlePageSizeChange(newValue) {
    setLimitValue(newValue);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("limit", newValue);
    newSearchParams.set("offset", 0);
    setSearchParams(newSearchParams);
  }

  const getSuggestions = useCallback(
    async function (search) {
      if (!search) {
        searchParams.delete("search");
        searchParams.set("offset", offset);
      } else {
        searchParams.set("search", search);
        searchParams.set("offset", 0);
      }
      setSearchParams(searchParams);
    },
    [searchParams],
  );

  const getSuggestionsDebounce = useMemo(
    () => debounce(getSuggestions, 1000),
    [getSuggestions],
  );

  function onInputChange(newValue) {
    setSearchValue(newValue);
    getSuggestionsDebounce(newValue);
  }

  const columns = useMemo(() => [
    {
      header: "No",
      cell: (info) => <div className="text-center">{info.row.index + 1}</div>,
    },
    ,
    {
      header: "Pertanyaan",
      accessorKey: "question",
      cell: (info) => (
        <div className="text-center">{info.row.original.question}</div>
      ),
      rowSpan: true,
    },
    {
      header: "Jawaban",
      accessorKey: "answer",
      cell: (info) => (
        <div className="text-center">{info.row.original.answer}</div>
      ),
    },
    {
      header: "Action",
      rowSpan: true,
      cell: (info) => (
        <div
          className={`flex items-center justify-center`}
          style={info.row.original.actStyle}
        >
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
              <div className="mt-8 flex w-full justify-between">
                <div className="flex items-center">
                  <span className="bg-[#092C4C] px-5 py-2 text-white">Row</span>
                  <select
                    className="border border-black px-3 py-2"
                    value={limitValue}
                    onChange={(e) => handlePageSizeChange(e.target.value)}
                  >
                    {pageSizes.map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex w-1/2 items-center justify-end space-x-8">
                  <p className="text-xl">Search</p>
                  <Input
                    id="search"
                    className=" w-4/12 rounded-xl border-[#092C4C]"
                    placeholder="Cari sesuatu..."
                    value={searchValue}
                    onChange={(e) => onInputChange(e.currentTarget.value)}
                  />
                  <Link to="/content-management/FAQ/tambah-FAQ">
                    <Button>Tambah FAQ</Button>
                  </Link>
                </div>
              </div>
              <Table
                datas={faqData}
                columns={columns}
                classNameHeader="bg-[#A2D2FF]"
                isLoading={isLoading}
              />
              <div className="mt-2 flex justify-end">
                <Pagination
                  meta={meta}
                  onClickPrevious={() =>
                    handlePagination((meta.offset -= parseInt(limitValue)))
                  }
                  onClickNext={() =>
                    handlePagination((meta.offset += parseInt(limitValue)))
                  }
                  onClickPage={(page) => handlePagination(page)}
                  limitValue={limitValue}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
