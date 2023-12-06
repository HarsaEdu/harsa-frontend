import Layout from "@/components/layout/Index";
import Breadcrumb from "@/components/breadcrumb";
import Table from "@/components/table/tables";
import { React, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { number } from "zod";
import { dataFaq } from "@/utils/dummyData";
import DropdownAction from "@/components/table/DropdownAction";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ManageFaq() {
  const userRole = "admin";
  const [editData, setEditData] = useState(null);

  const columns = useMemo(() => [
    {
      header: "No",
      cell: (info) => <div className="text-center">{info.row.index + 1}</div>,
    },
    ,
    {
      header: "Pertanyaan",
      accessorKey: "pertanyaan",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
      rowSpan: true,
    },
    {
      header: "Jawaban",
      accessorKey: "jawaban",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "ACT",
      rowSpan: true,
      cell: (info) => (
        <div className="text-center">
          <DropdownAction>
            <div className="flex flex-col">
              <Link to="/content-management/FAQ/:id/edit-FAQ">
                <Button
                  className="bg-white px-8 text-black hover:text-white"
                  onClick={() => console.log(info.row.original.index)}
                >
                  Edit
                </Button>
              </Link>
              <Button
                className="bg-white px-8 text-black hover:text-white"
                onClick={() => console.log(info.row.original.index)}
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
      <Layout userRole={userRole}>
        <div className="container mb-10">
          <Breadcrumb />
          <div className="mt-10 rounded-lg border border-[#f2994a] p-11 font-poppins">
            <h2 className="text-3xl font-semibold">Kelola FAQ</h2>

            <div>
              <Table
                datas={dataFaq}
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
