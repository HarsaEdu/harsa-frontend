import DropdownAction from "@/components/table/DropdownAction";
import { useMemo, useEffect, useState, useCallback } from "react";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Index";
import Table from "@/components/table/tables";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import axios from "axios";

export default function EditTugas() {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);

  const getSuggestions = useCallback(
    async function (query) {
      if (!query) {
        searchParams.delete("query");
      } else {
        searchParams.set("query", query);
        searchParams.delete("page");
      }
      setSearchParams(searchParams);
    },
    [searchParams],
  );

  const getSuggestionsDebounce = useMemo(
    () => debounce(getSuggestions, 1000),
    [getSuggestions],
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://651a7d75340309952f0d6272.mockapi.io/api/v1/users",
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [searchParams]);

  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         const apiUrl =
  //           "https://651a7d75340309952f0d6272.mockapi.io/api/v1/users";

  //         const response = await axios.get(apiUrl);
  //         if (!response.ok) {
  //           throw new Error(`Failed to fetch data. Status: ${response.status}`);
  //         }

  //         const data = await response.json();

  //         setData(data);
  //         setLoading(false);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //         setLoading(false);
  //       }
  //     }
  //     fetchData();
  //   }, [searchParams]);

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
        return (
          <div className="text-center">
            {info.row.original.data.first_name}{" "}
            {info.row.original.data.last_name}
          </div>
        );
      },
    },
    {
      header: "Username",
      accessorKey: "data.username",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "Email",
      accessorKey: "data.email",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "No Telepone",
      accessorKey: "data.phone_number",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "Role",
      accessorKey: "data.role_name",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "Action",
      cell: (info) => (
        <div className="text-center">
          <DropdownAction>
            <div className="flex flex-col">
              <Button
                className="bg-white px-8 text-black hover:text-white"
                onClick={() => console.log(info.row.original.id)}
              >
                Edit
              </Button>
              <Button
                className="bg-white px-8 text-black hover:text-white"
                onClick={() => console.log(info.row.original.id)}
              >
                Delete
              </Button>
              <Button
                className="bg-white px-8 text-black hover:text-white"
                onClick={() => console.log(info.row.original.id)}
              >
                Detail
              </Button>
            </div>
          </DropdownAction>
        </div>
      ),
    },
  ]);

  const userRole = "admin";

  return (
    <Layout userRole={userRole}>
      <div className="mt-20">
        <Breadcrumb />
        <div className="my-10 rounded-lg border border-[#F2994A] p-5">
          <div className="mt-8">
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold text-[#092C4C]">
                User Management
              </h2>
              <div className="space-x-2">
                <Button
                  id="addUserManagamanet"
                  href="/user-management/tambah-user"
                  className="bg-[#159C1B] hover:bg-[#34a73a]"
                >
                  Export Data
                </Button>
                <Button id="exportDataUser" href="/user-management/tambah-user">
                  Tambah Data User
                </Button>
              </div>
            </div>
          </div>
          {/* Table */}
          <div className="mt-2">
            {loading ? (
              <Loading />
            ) : (
              <Table
                datas={data}
                columns={columns}
                classNameHeader="bg-[#A2D2FF] text-black"
                isVisible={true}
                rowVisible={true}
                searchComponent={
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
                }
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
