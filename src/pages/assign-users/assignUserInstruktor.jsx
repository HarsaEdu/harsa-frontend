import DropdownAction from "@/components/table/DropdownAction";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Table from "@/components/table/tables";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import ApiUsers from "@/utils/ApiConfig";

const AssignUserInstruktor = () => {
  const [data, setData] = useState([]);
  const { isLoading, error } = ApiUsers({
    endpoint: "users", // Sesuaikan dengan endpoint kita
    onSuccess: setData,
  });

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
      header: "Alamat",
      accessorKey: "data.address",
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
              <Link to="/user-management/detail">
                <Button
                  className="bg-white px-8 text-black hover:text-white"
                  onClick={() => console.log(info.row.original.id)}
                >
                  Detail
                </Button>
              </Link>
            </div>
          </DropdownAction>
        </div>
      ),
    },
  ]);

  return (
    <div>
      <div className="rounded-sm border border-slate-300 p-5">
        <div className="mt-8">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold text-[#092C4C]">
              User yang mengikuti kelas
            </h2>
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
  );
};

export default AssignUserInstruktor;
