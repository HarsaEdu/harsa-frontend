import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Table from "@/components/tables";
import { realData2 } from "@/utils/dummyData";
import { React, useMemo } from "react";
import { Check, X } from "lucide-react";

export default function JawabanKuis() {
  const allQuestions = realData2.flatMap((user) =>
    user.answers.map((answer) => answer.qestion_id),
  );
  const uniqueQuestions = [...new Set(allQuestions)]; // Get unique question IDs

  const jawabanColumns = uniqueQuestions.map((questionId, index) => ({
    id: `jawaban-${index + 1}`,
    header: () => <span>{index + 1}</span>,
    accessor: (data) => {
      const userAnswer = data.answers.find(
        (answer) => answer.qestion_id === questionId,
      );
      return userAnswer || {};
    },
    cell: (info) =>
      info.row.original.answers.find(
        (answer) => answer.qestion_id === questionId,
      )?.is_right ? (
        <div className="flex justify-center">
          <Check />
        </div>
      ) : (
        <div className="flex justify-center">
          <X />
        </div>
      ),
  }));

  const columns = useMemo(() => [
    { header: "No", cell: (info) => info.row.index + 1 },
    ,
    {
      header: "Nama",
      accessorKey: "user_id",
      cell: (info) => info.getValue(),
      rowSpan: true,
    },
    {
      header: "Jawaban",
      columns: [...jawabanColumns],
    },
    {
      header: "Skor",
      accessorKey: "score",
      rowSpan: false,
    },
  ]);

  function exportQuiz() {
    console.log("Test Export");
  }

  return (
    <div>
      {/* Search Content */}
      <div className="flex justify-end">
        <div className="mt-4 flex w-1/2 items-center justify-end space-x-3">
          <p className="text-xl">Search</p>
          <Input id="search" className=" w-4/12 rounded-xl border-[#092C4C]" />
          <Button
            id="export"
            className="rounded-xl px-20 py-5 text-xl"
            onClick={exportQuiz}
          >
            Export
          </Button>
        </div>
      </div>
      {/* Jawaban Quiz Content */}
      <div className=" mt-4 rounded-2xl border border-[#092C4C] p-7">
        <div>
          <Table
            datas={realData2}
            columns={columns}
            classNameHeader="bg-[#F2994A] text-xl"
          />
        </div>
      </div>
    </div>
  );
}
