import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Table from "@/components/table/tables";
import { realData2 } from "@/utils/dummyData";
import { React, useMemo, useState, useEffect, useCallback } from "react";
import { Check, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";

export default function JawabanKuis() {
  //*
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState(realData2);

  useEffect(() => {
    fetchData();
  }, [searchParams]);

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

  async function fetchData() {
    try {
      const simulatedApiCall = () =>
        new Promise((resolve) => {
          setTimeout(() => {
            // Check if there is a search query
            if (searchParams.has("query")) {
              // Filter the data based on the search query
              resolve(
                realData2.filter((item) =>
                  item.user_id
                    .toLowerCase()
                    .includes(searchParams.get("query").toLowerCase()),
                ),
              );
            } else {
              // If no search query, fetch all data
              resolve(realData2);
            }
          }, 500);
        });

      const response = await simulatedApiCall();

      setData(response);
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
    console.log("Test Export 1");
  }

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
            datas={data}
            columns={columns}
            classNameHeader="bg-[#F2994A] text-xl"
          />
        </div>
      </div>
    </div>
  );
}
