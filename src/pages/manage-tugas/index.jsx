import { React, useMemo } from "react";
import { Pencil } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Table from "@/components/tables";
import { realData } from "@/utils/dummyData";
import RowShow from "@/components/rowShow";

export default function ManageTugas() {
  const columns = useMemo(() => [
    {
      header: "No",
      cell: (info) => <div className="text-center">{info.row.index + 1}</div>,
    },
    {
      header: "Nama",
      accessorKey: "user_id",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info) => (
        <div className="flex justify-center">
          {info.row.original.status === "accepted" && (
            <div className="w-fit rounded-full bg-[#159C1B] px-5 py-1 text-center text-white">
              Accepted
            </div>
          )}
          {info.row.original.status === "pending" && (
            <div className="w-fit rounded-full  bg-[#D8D118] px-5 py-1 text-center text-black">
              Pending
            </div>
          )}
          {info.row.original.status === "rejected" && (
            <div className="w-fit rounded-full  bg-[#DC1D1D] px-5 py-1 text-center text-white">
              Rejected
            </div>
          )}
          {info.row.original.status === "not submit" && (
            <div className="w-fit rounded-full  bg-[#F6F6F6] px-5 py-1 text-center text-black">
              Not Submit
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Action",
      cell: (info) => (
        <div className="text-center">
          <Button
            className="bg-[#092C4C] px-8 text-white"
            onClick={() => console.log(info.row.original.user_id)}
          >
            Review
          </Button>
        </div>
      ),
    },
  ]);

  function exportTugas() {
    console.log("Test Export");
  }
  const selectItem = [10, 25, 50];
  return (
    <div className="m-5 rounded-lg border border-[#F2994A] p-5">
      {/* Nama dan Deskripsi */}
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">Tugas Pengenalan UI/UX</h2>
        <div className="bg-[#092C4C] p-2">
          <Pencil size={15} color="white" />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold">Deskripsi</h2>
          <div className="bg-[#092C4C] p-2">
            <Pencil size={15} color="white" />
          </div>
        </div>

        <div className="text-md me-12">
          Analisis insight/informasi yang diperlukan untuk memenuhi tujuan ini.
          Analisis data apa saja yang dibutuhkan. Analisis prosesbisnis/prosedur
          cara memilih mapres Rancanglah visualisasi dashboard untuk menyajikan
          informasi sesuai kebutuhan untuk menyajikan poin 1. Buatlah simulasi
          bagaimana mengolah data sampai bisa menghasilkan visualisasi yang
          dimaksud. Siapa saja pengguna BI Aturan/prosedur/hukum apa saja yang
          terkait dan perlu dipenuhi.
        </div>
      </div>

      {/* Row and Search */}
      <div className="mt-8">
        <div className="flex">
          <h2 className="text-lg font-bold">Pengumpulan Tugas</h2>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8">
        <Table
          datas={realData}
          columns={columns}
          classNameHeader="bg-[#092C4C] text-white"
          isVisible={true}
          rowVisible={true}
        />
      </div>
    </div>
  );
}
