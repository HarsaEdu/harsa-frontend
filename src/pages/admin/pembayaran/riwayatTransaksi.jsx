import Breadcrumb from "@/components/breadcrumb";
import Layout from "@/components/layout/Index";
import axios from "axios";
import { React, useMemo, useState, useEffect, useCallback } from "react";
import { dataRiwayatTransaksi, realData } from "@/utils/dummyData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Table from "@/components/table/tables";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { getAllPaymentHistory } from "@/utils/apis/payments/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Pagination from "@/components/table/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RiwayatTransaksi() {
  //*
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("semua");
  const [filterParams, setFilterParams] = useSearchParams();
  const [limitValue, setLimitValue] = useState(10);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState([]);
  const pageSizes = ["5", "10", "25"];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [searchParams, filterParams]);

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

  async function fetchData() {
    let query = Object.fromEntries(
      [...searchParams].filter((param) => param[0] !== "tab"),
    );

    if (searchParams.has("search")) {
      searchParams.set("offset", 0);
      setSearchValue(searchParams.get("search"));
    } else {
      searchParams.set("offset", 0);
    }

    if (searchParams.has("status")) {
      searchParams.set("offset", 0);
      query.status = searchParams.get("status");
    }

    if (searchParams.has("limit")) {
      setLimitValue(searchParams.get("limit"));
    } else {
      searchParams.set("limit", limitValue);
      searchParams.set("offset", 0);
    }

    try {
      setIsLoading(true);
      const result = await getAllPaymentHistory({ ...query });
      const { data, pagination } = result;
      setData(data);
      setMeta(pagination);
    } catch (error) {
      console.log(error.message);
      setData([]);
      setMeta([]);
    } finally {
      setIsLoading(false);
    }
  }

  function onInputChange(newValue) {
    setSearchValue(newValue);
    getSuggestionsDebounce(newValue);
  }

  function onSelectChange(newValue) {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newValue === "semua") {
      newSearchParams.delete("status");
    } else {
      newSearchParams.set("offset", 0);
      newSearchParams.set("limit", limitValue);
      newSearchParams.set("status", newValue);
    }

    setSearchParams(newSearchParams);
    setFilterValue(newValue);
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

  //*

  const columns = useMemo(() => [
    { header: "No", cell: (info) => info.row.index + 1 },
    {
      header: "Nama",
      accessorKey: "customer.name",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "Username", //Tidak Ada di Response
      accessorKey: "user_id",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "Email", //Tidak Ada di Response
      accessorKey: "id",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "Nama Langganan",
      accessorKey: "item.name",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "status",
      accessorKey: "customer.status",
      cell: (info) => (
        <div className="flex justify-center">
          {info.row.original.status === "success" && (
            <div className="w-fit rounded-full bg-[#159C1B] px-5 py-1 text-center text-white">
              Terbayar
            </div>
          )}
          {info.row.original.status === "failure" && (
            <div className="w-fit rounded-full  bg-[#DC1D1D] px-5 py-1 text-center text-white">
              Gagal
            </div>
          )}
          {info.row.original.status === "pending" && (
            <div className="w-fit rounded-full  bg-[#D8D118] px-5 py-1 text-center text-black">
              Pending
            </div>
          )}
        </div>
      ),
    },
  ]);

  return (
    <Layout userRole="admin">
      {" "}
      {/* TODO: GANTI DINAMIS*/}
      <div>
        <Breadcrumb />
      </div>
      <div className="mt-4 border border-gray-400 p-5">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-4xl font-bold text-[#092C4C]">
            Riwayat Transaksi
          </h2>
          <Button
            id="export"
            className="rounded-xl bg-[#159C1B] px-12 py-5 text-xl hover:bg-[#15801a]"
            onClick={() => console.log("first")}
          >
            Export
          </Button>
        </div>

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
          <div className="flex w-1/2 items-center justify-end space-x-3">
            <p className="text-xl font-bold">Search</p>{" "}
            <Input
              id="search"
              className=" w-4/12 rounded-xl border-[#092C4C]"
              value={searchValue}
              onChange={(e) => onInputChange(e.currentTarget.value)}
            />
            <p className="ps-8 text-xl font-bold">Filter</p>{" "}
            <Select
              value={filterValue}
              onValueChange={(e) => onSelectChange(e)}
            >
              <SelectTrigger className="w-1/4 rounded-xl border-[#092C4C]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semua">Semua</SelectItem>
                <SelectItem value="success">Terbayar</SelectItem>
                <SelectItem value="failure">Gagal</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <>
          {/* Render your table and other components when data is not loading */}
          <Table
            datas={data}
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
    </Layout>
  );
}
