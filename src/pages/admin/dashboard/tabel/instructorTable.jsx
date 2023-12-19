import { React, useMemo, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Table from '@/components/table/tables';
import { Input } from "@/components/ui/input";
import Pagination from "@/components/table/pagination";
import { debounce } from "lodash";
import { getUserInstructorTable } from "@/utils/apis/user";

const InstructorTable = () => {
    const [instructorData, setInstructorData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState("");
    const [limitValue, setLimitValue] = useState(10);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [meta, setMeta] = useState([]);
    const pageSizes = ["5", "10", "25"];

    useEffect(() => {
        fetchData();
      }, [searchParams, limitValue, offset]);
    
      async function fetchData() {
        if (searchParams.has("limit")) {
          setLimitValue(searchParams.get("limit"));
        }
    
        if (searchParams.has("search")) {
          searchParams.set("offset", 0);
          setSearchValue(searchParams.get("search"));
        } else {
          searchParams.set("offset", offset);
          searchParams.set("limit", limitValue);
        }
    
        let query = Object.fromEntries(
          [...searchParams].filter((param) => param[0] !== "tab"),
        );
    
        try {
          setIsLoading(true);
          const response = await getUserInstructorTable({ ...query }); // Menggunakan getUser dari utils
          setInstructorData(response.data);
          setMeta(response.pagination);
        } catch (error) {
          setError(error);
          setInstructorData([]);
          setMeta([]);
        } finally {
          setIsLoading(false);
        }
    };

    function handlePagination(newOffset) {
        setOffset(newOffset);

        // Update the searchParams with the new offset value
        searchParams.set("limit", String(limitValue));
        searchParams.set("offset", String(newOffset));
        setSearchParams(searchParams);
    };

    function handlePageSizeChange(newValue) {
        setLimitValue(newValue);
    
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("limit", newValue);
        newSearchParams.set("offset", 0);
        setSearchParams(newSearchParams);
    };

    const getSuggestions = useCallback(
        async function (search) {
          if (!search) {
            searchParams.delete("search");
            searchParams.set("offset", offset);
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

    const columns = useMemo(() => [
        {
          header: "No",
          cell: (info) => <div className="text-center">{info.row.index + 1}</div>,
        },
        {
            header: "Nama",
            cell: (info) => {
                const firstName = info.row.original.first_name;
                const lastName = info.row.original.last_name;
        
                return (
                <div className="text-center">
                    {firstName || lastName
                    ? `${firstName || ""} ${lastName || ""}`
                    : "-"}
                </div>
                );
            },
        },
        {
          header: "Email",
          accessorKey: "email",
          cell: (info) => <div className="text-center">{info.getValue()}</div>,
        },
        {
            header: "No Telepon",
            accessorKey: "phone_number",
            cell: (info) => {
              const phone_number = info.row.original.phone_number;
      
              return (
                <div className="text-center">
                  {phone_number
                    ? `${phone_number}`
                    : "-"}
                </div>
              );
            },
        },
    ], []);

    return (
        <div className='container border-2 border-[#092C4C] rounded-lg w-full p-10 space-y-4 mb-10'>
            <h1 className="text-2xl text-[#092C4C]">Instructor Data</h1>
            <div className="mt-2">
            <div className="mt-8 flex w-full justify-between">
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
              <div className="flex w-1/2 items-center justify-end space-x-8">
                <p className="text-xl">Search</p>
                <Input
                  id="search"
                  className="w-2/4 rounded border-[#092C4C]"
                  placeholder="Cari sesuatu..."
                  value={searchValue}
                  onChange={(e) => onInputChange(e.currentTarget.value)}
                />
              </div>
            </div>
            {/* Render your table and other components when data is not loading */}
            <Table
              datas={instructorData}
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
          </div>
        </div>
    );
};

export default InstructorTable;
