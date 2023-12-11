import DropdownAction from "@/components/table/DropdownAction";
import { useMemo, useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Index";
import Table from "@/components/table/tables";
import { Input } from "@/components/ui/input";
import { getUser, deleteUser } from "@/utils/apis/user";
import { CSVLink } from "react-csv";
import axios from "axios";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import Pagination from "@/components/table/pagination";

export default function UserManagement() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [userData, setUserData] = useState([]);
  const [meta, setMeta] = useState([]);
  const [limitValue, setLimitValue] = useState(10);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
      searchParams.set("limit", limitValue);
    }

    let query = Object.fromEntries(
      [...searchParams].filter((param) => param[0] !== "tab"),
    );

    try {
      setIsLoading(true);
      const response = await getUser({ ...query }); // Menggunakan getUser dari utils
      setUserData(response.data);
      setMeta(response.pagination);
    } catch (error) {
      setError(error);
      setUserData([]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleEdit = (id) => {
    // Navigasi ke halaman edit user dengan ID yang sesuai
    navigate(`/user-management/edit-user/${id}`);
  };

  const handleDetail = (id) => {
    // Navigasi ke halaman edit user dengan ID yang sesuai
    navigate(`/user-management/detail/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      // Menampilkan konfirmasi SweetAlert
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Data user akan dihapus permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!",
      });

      if (result.isConfirmed) {
        // Panggil fungsi deleteUser untuk menghapus user
        await deleteUser(id);
        // Perbarui data setelah penghapusan berhasil
        fetchData();

        // Menampilkan pesan SweetAlert setelah penghapusan berhasil
        Swal.fire({
          title: "Berhasil!",
          text: "Data user telah dihapus.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Failed to delete user", error);

      // Menampilkan pesan SweetAlert jika penghapusan gagal
      Swal.fire({
        title: "Error!",
        text: "Gagal menghapus data user.",
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
      } else {
        searchParams.set("search", search);
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
    {
      header: "Nama",
      cell: (info) => {
        const firstName = info.row.original.first_name;
        const lastName = info.row.original.last_name;

        return (
          <div className="text-center">
            {firstName || lastName
              ? `${firstName || ""} ${lastName || ""}`
              : "-"}
          </div>
        );
      },
    },
    {
      header: "Username",
      accessorKey: "username",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "No Telepone",
      accessorKey: "phone_number",
      cell: (info) => (
        <div className="text-center">{info.getValue() || "-"}</div>
      ),
    },

    {
      header: "Role",
      accessorKey: "role_name",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "Action",
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
                onClick={() => handleDelete(info.row.original.id)} // Panggil fungsi handleDelete dengan ID sebagai argumen
              >
                Delete
              </Button>
              <Button
                className="bg-white px-8 text-black hover:text-white"
                onClick={() => handleDetail(info.row.original.id)}
              >
                Detail
              </Button>
            </div>
          </DropdownAction>
        </div>
      ),
    },
  ]);

  // function untuk export tabel ke csv file
  const csvData = [
    ["No", "Name", "Username", "Email", "No Telepone", "Role"],
    ...userData.map(
      ({ id, first_name, username, email, phone_number, role_name }) => [
        id,
        first_name,
        username,
        email,
        phone_number,
        role_name,
      ],
    ),
  ];

  return (
    <Layout>
      <div className="container mb-10">
        <Breadcrumb />
        <div className="my-10 rounded-lg border border-[#F2994A] p-5">
          <div className="mt-8">
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold text-[#092C4C]">
                User Management
              </h2>
              <div className="space-x-2">
                {/* button untuk export csv */}
                <Button className="bg-[#159C1B] text-[16px] hover:bg-[#34a73a]">
                  <CSVLink filename="my-file.csv" data={csvData}>
                    Export to CSV
                  </CSVLink>
                </Button>
                {/* button add user */}
                <Link to="/user-management/tambah-user">
                  <Button
                    id="exportDataUser"
                    href="/user-management/tambah-user"
                    className="text-[16px]"
                  >
                    Tambah Data User
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          {/* Table */}
          <div className="mt-2">
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
              </div>
            </div>
            {/* Render your table and other components when data is not loading */}
            <Table
              datas={userData}
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
  );
}
