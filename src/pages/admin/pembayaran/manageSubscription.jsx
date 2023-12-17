import { React, useMemo, useState, useEffect, useCallback } from "react";
import Layout from "@/components/layout/Index";
import Breadcrumb from "@/components/breadcrumb";
import Table from "@/components/table/tables";
import DropdownAction from "@/components/table/DropdownAction";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getSubs } from "@/utils/apis/subs-plan";
import { deleteSubs } from "@/utils/apis/subs-plan";
import { debounce } from "lodash";
import Pagination from "@/components/table/pagination";

const AddSubscription = () => {
  const [subsData, setSubsData] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [limitValue, setLimitValue] = useState(10);
  const [offset, setOffset] = useState(0);
  const [meta, setMeta] = useState([]);
  const pageSizes = ["5", "10", "25"];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSubsData = async () => {
      let query = Object.fromEntries([...searchParams]);

      if (searchParams.has("search")) {
        setSearchValue(searchParams.get("search"));
      } else {
      }

      if (searchParams.has("limit")) {
        setLimitValue(searchParams.get("limit"));
      } else {
        searchParams.set("limit", limitValue);
        searchParams.set("offset", 0);
      }
      try {
        const response = await getSubs({ ...query });
        console.log("Response from getSubs:", response);

        setSubsData(response.data);
        setMeta(response.pagination);
      } catch (error) {
        console.error("Error fetching Subs data:", error);
      }
    };

    fetchSubsData();
  }, [searchParams]);

  const getSuggestions = useCallback(
    async function (search) {
      if (!search) {
        searchParams.delete("search");
        searchParams.set("offset", 0);
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

  function handlePageSizeChange(newValue) {
    setLimitValue(newValue);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("limit", newValue);
    newSearchParams.set("offset", 0);
    setSearchParams(newSearchParams);
  }

  function handlePagination(newOffset) {
    // Update the offset value
    setOffset(newOffset);

    // Update the searchParams with the new offset value
    searchParams.set("limit", String(limitValue));
    searchParams.set("offset", String(newOffset));
    setSearchParams(searchParams);

    // Fetch data for the new page
  }

  const handleEdit = (id) => {
    // Navigasi ke halaman edit user dengan ID yang sesuai
    navigate(`/langganan/edit-paket/${id}`);
  };

  const handleDelete = async (id) => {
    // Tampilkan konfirmasi sebelum menghapus
    Swal.fire({
      title: "Yakin kamu mau Hapus data ini?",
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
          const response = await deleteSubs(id);

          console.log("Response dari server:", response);

          if (response && response.code === 200) {
            // Notifikasi setelah berhasil menghapus
            Swal.fire({
              title: "Sukses Hapus Data Paket",
              icon: "success",
              showConfirmButton: false,
              showCloseButton: true,
            });

            // Perbarui data Subs setelah penghapusan berhasil
            setSubsData((prevData) =>
              prevData.filter((subs) => subs.id !== id),
            );
          } else if (response && response.message) {
            // Handle other successful responses with messages
            console.log("Success with message:", response.message);
          } else {
            console.error(
              "Gagal menghapus Subs. Unexpected response:",
              response,
            );
          }
        } catch (error) {
          // Tampilkan detail kesalahan Axios
          if (error.response) {
            // Kesalahan respons dari server (status code yang tidak berhasil)
            console.error(
              "Error deleting Subs - Server Response:",
              error.response.data,
            );
          } else if (error.request) {
            // Tidak ada respons dari server
            console.error("Error deleting Subs - No Response:", error.request);
          } else {
            // Kesalahan lainnya
            console.error("Error deleting Subs:", error.message);
          }
        }
      }
    });
  };

  useEffect(() => {
    // useEffect baru untuk mencetak log setelah subsData diperbarui
    console.log("subsData in render:", subsData);
  }, [subsData]);

  const formatRupiah = (number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });

    return formatter.format(number);
  };

  const columns = useMemo(
    () => [
      {
        header: "No",
        cell: (info) => <div className="text-center">{info.row.index + 1}</div>,
      },
      {
        header: "Nama",
        accessorKey: "title",
        cell: (info) => (
          <div className="text-center">{info.row.original.title}</div>
        ),
        rowSpan: true,
      },
      {
        header: "Durasi",
        accessorKey: "duration",
        cell: (info) => (
          <div className="text-center">{info.row.original.duration}</div>
        ),
      },
      {
        header: "Harga",
        accessorKey: "price",
        cell: (info) => (
          <div className="text-center">
            {formatRupiah(info.row.original.price)}
          </div>
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
                  onClick={() => handleEdit(info.row.original.id)}
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
    ],
    [subsData],
  );

  return (
    <Layout>
      <Breadcrumb />
      <div className="mb-10 mt-10 rounded-[12px] border border-[#F2994A] px-[38px] py-[45px] font-poppins">
        <h1 className="text-2xl font-semibold">Kelola Paket Langganan</h1>
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
          <div className="flex w-1/2 items-center justify-end space-x-3">
            <p className="text-xl font-bold">Search</p>{" "}
            <Input
              id="search"
              className=" w-4/12 rounded-xl border-[#092C4C]"
              value={searchValue}
              onChange={(e) => onInputChange(e.currentTarget.value)}
            />
            <Link to="/langganan/tambah-paket">
              <Button className="font-semibold">Tambah Paket</Button>
            </Link>
          </div>
        </div>

        <>
          {/* Render your table and other components when data is not loading */}
          <Table
            datas={subsData}
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
        </>
      </div>
    </Layout>
  );
};

export default AddSubscription;
