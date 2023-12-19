import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Table from "@/components/table/tables";
import { realData2 } from "@/utils/dummyData";
import { React, useMemo, useState, useEffect, useCallback } from "react";
import { Check, X } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { getHistoryQuiz } from "@/utils/apis/historyQuiz/";
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";

export default function JawabanKuis() {
  //*
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const getSuggestions = useCallback(
    async function (search) {
      if (!search) {
        searchParams.delete("search");
      } else {
        searchParams.set("search", search);
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

  async function fetchData() {
    try {
      let query = Object.fromEntries([...searchParams]);

      if (searchParams.has("search")) {
        searchParams.set("offset", 0);
        searchParams.set("limit", 10);
        setSearchValue(searchParams.get("search"));
      } else {
        searchParams.set("offset", 0);
        searchParams.set("limit", 10);
      }

      const result = await getHistoryQuiz(query, params.idQuiz); //cHange with the real id quiz

      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors as needed
    }
  }

  function onInputChange(newValue) {
    setSearchValue(newValue);
    getSuggestionsDebounce(newValue);
  }
  //*
  const allQuestions = data.flatMap((user) =>
    user.history_answer.map((answer) => answer.question_id),
  );

  const uniqueQuestions = [...new Set(allQuestions)]; // Get unique question IDs
  const jawabanColumns = uniqueQuestions.map((questionId, index) => ({
    id: `jawaban-${index + 1}`,
    header: `${index + 1}`,
    accessor: (data) => {
      const userAnswer = data.history_answer?.find(
        (answer) => answer.question_id === questionId,
      );
      return userAnswer || {};
    },
    cell: (info) => {
      const foundAnswer = info.row.original.history_answer?.find(
        (answer) => answer.question_id === questionId,
      );

      return foundAnswer?.is_right ? (
        <div className="flex justify-center">
          <Check />
        </div>
      ) : (
        <div className="flex justify-center">
          <X />
        </div>
      );
    },
  }));

  const columns = useMemo(() => [
    { header: "No", cell: (info) => info.row.index + 1 },
    ,
    {
      header: "Nama",
      accessorKey: "name",
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

  const csvData = [
    ["No", "Name", ...uniqueQuestions.map((index) => `${index}`), "Skor"],
    ...data.map(({ name, history_answer, score }, index) => {
      const userAnswers = history_answer || [];

      // Convert isRightValuesByQuestion to an array in the same order as uniqueQuestions
      const isRightValues = uniqueQuestions.map((questionId) => {
        const answer = userAnswers.find(
          (ans) => ans.question_id === questionId,
        );
        return answer ? answer.is_right : null;
      });

      const rowData = [index + 1, name, ...isRightValues, score];

      return rowData;
    }),
  ];

  return (
    <div>
      {/* Search Content */}
      <div className="flex justify-end">
        <div className="mt-4 flex w-1/2 items-center justify-end space-x-3">
          <p className="text-xl">Search</p>
          <Input
            id="search"
            className=" w-4/12 rounded-xl border-[#092C4C]"
            value={searchValue}
            onChange={(e) => onInputChange(e.currentTarget.value)}
          />
          <CSVLink
            filename="jawaban-kuis.csv"
            data={csvData}
            onClick={() =>
              Swal.fire({
                title: "Berhasil",
                icon: "success",
                text: "Berhasil Melakukan Export Data",
                showCloseButton: true,
                showConfirmButton: false,
              })
            }
          >
            <Button id="export" className="rounded-xl px-20 py-5 text-xl">
              Export
            </Button>
          </CSVLink>
        </div>
      </div>
      {/* Jawaban Quiz Content */}
      <div className=" mt-4 rounded-2xl border border-[#092C4C] p-7">
        <div>
          <Table
            datas={data}
            columns={columns}
            classNameHeader="bg-[#F2994A] text-xl"
            classNameCell="font-bold"
          />
        </div>
      </div>
    </div>
  );
}
