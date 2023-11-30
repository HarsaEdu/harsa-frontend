import Layout from "@/components/layout/Index";
import { React, useMemo, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditTugas() {
  const navigate = useNavigate();
  const dummyData = [
    {
      titleTugas: "Tugas Pengenalan UIUX",
      descriptionTugas:
        "Analisis insight/informasi yang diperlukan untuk memenuhi tujuan ini. Analisis data apa saja yang dibutuhkan. Analisis proses bisnis/prosedur cara memilih mapres Rancanglah visualisasi dashboard untuk menyajikan informasi sesuai kebutuhan untuk menyajikan poin 1. Buatlah simulasi bagaimana mengolah data sampai bisa menghasilkan visualisasi yang dimaksud. Siapa saja pengguna BI Aturan/prosedur/hukum apa saja yang terkait dan perlu dipenuhi.",
    },
  ];

  const editTugasSchema = z.object({
    titleTugas: z.string().min(2, { message: "Nama Tugas Harus Diisi" }),
    descriptionTugas: z
      .string()
      .min(2, { message: "Deskripsi Tugas Harus Diisi" }),
  });

  const form = useForm({
    resolver: zodResolver(editTugasSchema),
    defaultValues: {
      titleTugas: "",
      descriptionTugas: "",
    },
  });

  useEffect(() => {
    form.setValue("titleTugas", dummyData[0].titleTugas);
    form.setValue("descriptionTugas", dummyData[0].descriptionTugas);
  }, []);

  const onSubmit = (data) => {
    Swal.fire({
      title: "Yakin kamu mau  Simpan  data ini?",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Ya, Hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        onSave(data);
        Swal.fire({
          title: "Sukses Update Data",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        }).then((result) => {
          if (result.isDismissed) {
            navigate("/kelas/manage-tugas");
          }
        });
      }
    });
  };

  const onSave = (data) => {
    // Do something with the form values.
    // The values are already type-safe and validated based on your formSchema.
    console.log(data);
    form.resetField("titleTugas");
    form.resetField("descriptionTugas");
  };

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
                name="titleTugas"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        id="titleTugas"
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
                  name="descriptionTugas"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-xl font-bold">
                        Deskripsi
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="descriptionTugas"
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
                  onClick={() => navigate("/kelas/manage-tugas")}
                >
                  Batal
                </Button>
                <Button className="h-16 w-64 text-2xl" type="submit">
                  {" "}
                  Simpan
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
        <div className="mt-2">
          <Table
            datas={realData}
            columns={columns}
            classNameHeader="bg-[#092C4C] text-white"
            isVisible={true}
            rowVisible={true}
            searchComponent={
              <div className="flex w-1/2 items-center justify-end space-x-3">
                <p className="text-xl">Search</p>{" "}
                <Input
                  id="search"
                  className=" w-4/12 rounded-xl border-[#092C4C]"
                />
                <Button
                  id="export"
                  className="rounded-xl px-20 py-5 text-xl"
                  onClick={() => console.log("first")}
                >
                  Export
                </Button>
              </div>
            }
          />
        </div>
      </div>
    </Layout>
  );
}
