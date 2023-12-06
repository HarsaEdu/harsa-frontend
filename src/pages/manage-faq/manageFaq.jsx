import Layout from "@/components/layout/Index";
import Breadcrumb from "@/components/breadcrumb";
import Table from "@/components/table/tables";
import { React, useMemo } from "react";
import { realData2 } from "@/utils/dummyData";
import { Input } from "@/components/ui/input";
import { number } from "zod";

export default function ManageFaq() {
  const userRole = "admin";

  const columns = useMemo(() => [
    { header: "No", cell: (info) => info.row.index + 1 },
    ,
    {
      header: "Pertanyaan",
      accessorKey: "user_id",
      cell: (info) => info.getValue(),
      rowSpan: true,
    },
    {
      header: "Jawaban",
    },
    {
      header: "ACT",
      accessorKey: "score",
      rowSpan: false,
    },
  ]);
  return (
    <>
      <Layout userRole={userRole}>
        <div className="container mb-10">
          <Breadcrumb />
          <div className="mt-10 rounded-lg border border-[#f2994a] p-11 font-poppins">
            <h2 className="text-3xl font-semibold">Kelola FAQ</h2>
            <div className="flex justify-between items-center">

              <div className="mt-5 flex">
                <div className="w-fit bg-[#092C4C] p-2 text-white">
                  <p>ROWS</p>
                </div>
                <div>
                  <Input
                    type="number"
                    className="w-20 rounded-none border border-black"
                    value="1"
                  />
                </div>
              </div>

              <div>
                <div>
                    <p className="font-bold">Search</p>
                </div>
                <div>
                    <Input type="text" className="border border-black rounded-none w-36" />
                </div>
                <div>
                    
                </div>
              </div>

            </div>

            <div>
              <Table datas={realData2} columns={columns} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
