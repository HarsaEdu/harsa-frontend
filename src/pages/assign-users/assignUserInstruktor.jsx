import DropdownAction from "@/components/table/DropdownAction";
import { useMemo, useEffect, useState, useCallback } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Table from "@/components/table/tables";
import { Input } from "@/components/ui/input";
import { getUserStudents, deleteUser } from "@/utils/apis/user";
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import Pagination from "@/components/table/pagination";

export default function AssignUserInstruktor() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [userData, setUserData] = useState([]);
  const [meta, setMeta] = useState([]);
  const [limitValue, setLimitValue] = useState(10);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [setError] = useState(null);
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
      const response = await getUserStudents({ ...query }, params.id); // Menggunakan getUser dari utils
      setUserData(response.data);
      setMeta(response.pagination);
    } catch (error) {
      setError(error);
      setUserData([]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (id) => {
    try {
      // Menampilkan konfirmasi SweetAlert
      const result = await Swal.fire({
        title: "Yakin kamu mau  Menghapus data ini",
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
          showConfirmButton: false,
          showCloseButton: true,
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
    {
      header: "Nama",
      accessorKey: "name",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "Username",
      accessorKey: "user_name",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "E-mail",
      accessorKey: "email",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "No Telp",
      accessorKey: "phone_number",
      cell: (info) => (
        <div className="text-center">{info.getValue() || "-"}</div>
      ),
    },

    {
      header: "Alamat",
      accessorKey: "address",
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
                onClick={() => handleDelete(info.row.original.id)} // Panggil fungsi handleDelete dengan ID sebagai argumen
              >
                Delete
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
    <div>
      <div className="rounded-sm border border-slate-300 p-5">
        <div className="mt-8">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold text-[#092C4C]">
              User yang mengikuti kelas
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
  );
}
