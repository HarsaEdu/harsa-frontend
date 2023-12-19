import Layout from "@/components/layout/Index";
import { React, useMemo, useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import Table from "@/components/table/tables";
import { realData } from "@/utils/dummyData";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Breadcrumb from "@/components/breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getSubmissionById, updateSubmission } from "@/utils/apis/submission";
import Pagination from "@/components/table/pagination";

export default function EditTugas() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [submissionData, setSubmissionData] = useState([]);
  const [meta, setMeta] = useState([]);
  const [limitValue, setLimitValue] = useState(10);
  const pageSizes = ["5", "10", "25"];
  const [searchValue, setSearchValue] = useState("");
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
    fetchStudentSubmission();
  }, []);

  async function fetchStudentSubmission() {}

  async function fetchData() {
    try {
      setIsLoading(true);
      const result = await getSubmissionById(
        params.idSubmission,
        params.idSection,
      );
      const { data } = result;
      setData(data);
      form.setValue("title", data.title);
      form.setValue("content", data.content);
    } catch (error) {
      console.log(error.message);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }

  const editTugasSchema = z.object({
    title: z.string().min(2, { message: "Nama Tugas Harus Diisi" }),
    content: z.string().min(2, { message: "Deskripsi Tugas Harus Diisi" }),
  });

  const form = useForm({
    resolver: zodResolver(editTugasSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = (data) => {
    Swal.fire({
      title: "Yakin kamu mau  Simpan  data ini?",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#092C4C",
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
      cancelButtonColor: "#F2994A",
    }).then((result) => {
      if (result.isConfirmed) {
        onSave(data);
        Swal.fire({
          title: "Sukses Update Data",
          icon: "success",
          showConfirmButton: false,
          showCloseButton: true,
        }).then((result) => {
          if (result.isDismissed) {
            navigate(-1);
          }
        });
      }
    });
  };

  async function onSave(data) {
    await updateSubmission(data, params.idSection, params.idSubmission);
    form.resetField("title");
    form.resetField("content");
  }

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
  return (
    <Layout>
      <Breadcrumb />
      <div className="my-5 rounded-lg border border-[#F2994A] p-5">
        {/* Nama dan Deskripsi */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        id="title"
                        {...field}
                        className="rounded-none border-0 border-b border-b-black text-lg font-bold active:border-0"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-8">
              <div className="flex justify-between">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-xl font-bold">
                        Deskripsi
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="content"
                          {...field}
                          className="rounded-none border-0 border-b border-b-black active:border-0"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-4 flex justify-between">
                <Button
                  className="h-16 w-52 border border-[#092C4C] bg-white text-2xl font-bold text-[#092C4C] hover:bg-white"
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  Batal
                </Button>
                <Button
                  className={`h-16 w-64 text-2xl ${
                    isLoading ? "bg-slate-400" : ""
                  }`}
                  type="submit"
                >
                  {" "}
                  {isLoading ? "Loading..." : "Simpan"}
                </Button>
              </div>
            </div>
          </form>
        </Form>

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
              <div className="ms-4 flex w-1/2 items-center justify-end space-x-3">
                <Button
                  id="tambah-tugas"
                  className="w-full rounded-xl bg-[#092C4C] px-6 py-5 text-xl hover:bg-[#142331]"
                >
                  Export
                </Button>
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
    </Layout>
  );
}
