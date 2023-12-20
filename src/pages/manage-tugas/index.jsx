import { React, useMemo, useEffect, useState, useCallback } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import Table from "@/components/table/tables";
import { realData } from "@/utils/dummyData";
import Layout from "@/components/layout/Index";
import Bell from "../../assets/bell.svg";
import Breadcrumb from "@/components/breadcrumb";
import { Link, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSubmissionById } from "@/utils/apis/submission";
import { getAllSubmissionAnswers } from "@/utils/apis/submissionAnswer";
import Pagination from "@/components/table/pagination";
import { debounce } from "lodash";
import { CSVLink } from "react-csv";
import { exportAllSubmissionAnswers } from "@/utils/apis/submissionAnswer/api";

export default function ManageTugas() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [submissionData, setSubmissionData] = useState([]);
  const [meta, setMeta] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limitValue, setLimitValue] = useState(10);
  const pageSizes = ["5", "10", "25"];
  const [searchValue, setSearchValue] = useState("");
  const [offset, setOffset] = useState(0);
  const params = useParams();
  const [exportData, setExportData] = useState([]);

  useEffect(() => {
    fetchData();
    fetchStudentSubmission();
    fetchAllExportSubmission();
  }, [searchParams]);

  // TODO SEARCHING, PAGINATION AND ROW SIZE
  async function fetchStudentSubmission() {
    let query = Object.fromEntries(
      [...searchParams].filter((param) => param[0] !== "tab"),
    );

    if (searchParams.has("search")) {
      searchParams.set("offset", 0);
      setSearchValue(searchParams.get("search"));
    } else {
      searchParams.set("offset", 0);
    }

    if (searchParams.has("limit")) {
      setLimitValue(searchParams.get("limit"));
    } else {
      searchParams.set("limit", limitValue);
      searchParams.set("offset", 0);
    }

    try {
      setIsLoading(true);
      const result = await getAllSubmissionAnswers(
        { ...query },
        params.idSubmission,
      );
      setSubmissionData(result.data);
      setMeta(result.pagination);
    } catch (error) {
      console.log(error.message);
      setSubmissionData([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchAllExportSubmission() {
    try {
      setIsLoading(true);
      const result = await exportAllSubmissionAnswers(params.idSubmission);
      setExportData(result.data);
    } catch (error) {
      console.log(error.message);
      setExportData([]);
    } finally {
      setIsLoading(false);
    }
  }

  const csvData = [
    ["No", "Name", "Status"],
    ...exportData.map(({ name, status }, index) => [index + 1, name, status]),
  ];

  const getSuggestions = useCallback(
    async function (search) {
      if (!search) {
        searchParams.delete("search");
        searchParams.set("offset", 0);
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

  async function fetchData() {
    try {
      const result = await getSubmissionById(
        params.idSubmission,
        params.idSection,
      );
      const { data } = result;
      setData(data);
    } catch (error) {
      console.log(error.message);
      setData([]);
    }
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
            <div className="w-fit rounded-full  bg-[#999999] px-5 py-1 text-center text-white">
              Not Submit
            </div>
          )}
          {info.row.original.status === "submitted" && (
            <div className="w-fit rounded-full  bg-[#A2D2FF] px-5 py-1 text-center text-[#092C4C]">
              Submitted
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Action",
      cell: (info) => (
        <div className="text-center">
          <Link
            to={`/kelas/manage-tugas/review/${params.idSubmission}/${info.row.original.id}`}
          >
            <Button className="bg-[#092C4C] px-8 text-white">Review</Button>
          </Link>
        </div>
      ),
    },
  ]);

  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mb-10 font-poppins">
        <Breadcrumb />
        <div className="my-5 rounded-lg border border-[#F2994A] p-5">
          {/* Nama dan Deskripsi */}
          <div className="flex justify-between">
            <h2 className="text-lg font-bold">{data.title}</h2>
            <div className="bg-[#092C4C] p-2">
              <Pencil
                size={15}
                color="white"
                onClick={() =>
                  navigate(
                    `/kelas/manage-kelas/${params.id}/manage-module/${params.idSection}/manage-tugas/${params.idModule}/detail-tugas/${params.idSubmission}/edit`,
                  )
                }
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold">Deskripsi</h2>
            </div>

            <div className="text-md me-12">{data.content}</div>
          </div>

          {/* Row and Search */}
          <div className="mt-8">
            <div className="flex">
              <h2 className="text-lg font-bold">Pengumpulan Tugas</h2>
            </div>
          </div>

          {/* Table */}
          <div className="flex w-full justify-between">
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
            <div className="flex w-1/2 items-center justify-end">
              <div className="flex w-full justify-between">
                <div className="flex w-full items-center space-x-3">
                  <p className="text-xl font-semibold">Search</p>{" "}
                  <Input
                    id="search"
                    className=" w-full rounded-xl border-[#092C4C]"
                    value={searchValue}
                    onChange={(e) => onInputChange(e.currentTarget.value)}
                  />
                </div>
                <div className="ms-4 flex w-1/4 items-center justify-end space-x-3">
                  <CSVLink data={csvData} filename={`submission-${data.title}`}>
                    <Button
                      id="tambah-tugas"
                      className="w-full rounded-xl bg-[#092C4C] px-6 py-5 text-xl hover:bg-[#142331]"
                    >
                      Export
                    </Button>
                  </CSVLink>
                </div>
              </div>
            </div>
          </div>

          <>
            {/* Render your table and other components when data is not loading */}
            <Table
              datas={submissionData}
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
          </>
        </div>
      </div>
    </Layout>
  );
}
