import DropdownAction from "@/components/table/DropdownAction";
import { useMemo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Index";
import Table from "@/components/table/tables";
import { Input } from "@/components/ui/input";
import ApiCaller from "@/utils/ApiConfig";
import { CSVLink } from "react-csv";
import axios from "axios";

export default function EditTugas() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          'https://api.harsaedu.my.id/web/users?offset=0&limit=10',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Gantilah dengan cara Anda mendapatkan token
              'Content-Type': 'application/json',
            },
          }
        );
        setData(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    // Navigasi ke halaman edit user dengan ID yang sesuai
    navigate(`/user-management/edit-user/${id}`);
  };

  const handleDetail = (id) => {
    // Navigasi ke halaman edit user dengan ID yang sesuai
    navigate(`/user-management/detail/${id}`);
  };

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
            {info.row.original.first_name}{" "}
            {info.row.original.last_name}
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
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "Role",
      accessorKey: "role_name",
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
                onClick={() => handleEdit(info.row.original.id)} // Panggil fungsi handleEdit dengan ID sebagai argumen
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
    ...data.map(
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
            {isLoading && <p>. . .</p>}
            {error && <p>Error: {error.message}</p>}
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
                    value={""}
                    onChange={(e) => console.log(e.currentTarget.value)}
                  />
                </div>
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
