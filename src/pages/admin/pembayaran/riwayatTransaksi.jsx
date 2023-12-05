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

export default function RiwayatTransaksi() {
  const response = dataRiwayatTransaksi.data;

  //*
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState(dataRiwayatTransaksi.data);

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
                dataRiwayatTransaksi.data.filter((item) =>
                  item.customer.name
                    .toLowerCase()
                    .includes(searchParams.get("query").toLowerCase()),
                ),
              );
            } else {
              // If no search query, fetch all data
              resolve(dataRiwayatTransaksi.data);
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

  const columns = useMemo(() => [
    { header: "No", cell: (info) => info.row.index + 1 },
    {
      header: "Nama",
      accessorKey: "customer.name",
      cell: (info) => info.getValue(),
    },
    {
      header: "username",
      accessorKey: "user_id",
      cell: (info) => info.getValue(),
    },
    {
      header: "email",
      accessorKey: "id",
      cell: (info) => info.getValue(),
    },
    {
      header: "Nama Langganan",
      accessorKey: "item.name",
      cell: (info) => info.getValue(),
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
          {info.row.original.status === "failed" && (
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
        <Table
          datas={data}
          columns={columns}
          classNameHeader="bg-[#A2D2FF]"
          rowVisible={true}
          isVisible={true}
          searchComponent={
            <div className="flex w-1/2 items-center justify-end space-x-3">
              <p className="text-xl font-bold">Search</p>{" "}
              <Input
                id="search"
                className=" w-4/12 rounded-xl border-[#092C4C]"
                value={searchValue}
                onChange={(e) => onInputChange(e.currentTarget.value)}
              />
            </div>
          }
        />
      </div>
    </Layout>
  );
}
