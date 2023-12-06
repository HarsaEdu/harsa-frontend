import React from "react";
import Layout from "@/components/layout/Index";
/* eslint-disable react-hooks/rules-of-hooks */
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as z from "zod";
import InputFile from "@/components/inputFile";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  nama: z.string({
    required_error: "*Nama Paket wajib di isi",
  }),
  durasi: z.string({
    required_error: "*Durasi wajib di isi",
  }),
  harga: z.string({
    required_error: "*Harga wajib di isi",
  }),
  deskripsi: z.string({
    required_error: "*Deskripsi wajib di isi",
  }),
});

export default function AddLanggan() {
  const userRole = "admin";
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    Swal.fire({
      title: "Yakin kamu mau simpan  data ini?",
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
          timer: 2000,
        }).then((result) => {
          if (result.isDismissed) {
            navigate("/pembayaran/langganan");
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

  return (
    <div>
      <Layout userRole={userRole}>
        <div className="container mb-10">
          <Breadcrumb />
          <div className="font-poppins">
            <h2 className="pb-4 pt-10 text-2xl font-semibold">
              Tambah Paket Langganan
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 border-2 border-[#f2994a] px-8 py-5"
              >
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-1 text-lg font-semibold">
                        Nama Paket
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="nama"
                          placeholder="EX: Paket..."
                          {...field}
                          className="rounded-lg border border-gray-400 bg-transparent px-3 py-4 outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="durasi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-1 text-lg font-semibold">
                        Durasi
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="durasi"
                          placeholder="EX: 30 Hari"
                          {...field}
                          className="rounded-lg border border-gray-400 bg-transparent px-3 py-4 outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="harga"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-1 text-lg font-semibold">
                        Harga
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="harga"
                          placeholder="EX: 10000"
                          {...field}
                          className="rounded-lg border border-gray-400 bg-transparent px-3 py-4 outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deskripsi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-1 text-lg font-semibold">
                        Deskripsi
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="deskripsi"
                          placeholder="Masukan Deskripsi Untuk Paket"
                          {...field}
                          className="h-40 rounded-none border border-gray-400 bg-transparent px-3 py-4 outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gambar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-1 text-lg font-semibold">
                        Image
                      </FormLabel>
                      <FormControl>
                        <InputFile id="gambar" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between px-4">
                  <Button
                    id="cancelButtonFAQ"
                    className="w-60 rounded-none bg-[#ED7878] font-semibold text-white"
                    variant={"outline"}
                    type="reset"
                  >
                    <Link to="/faq">Batal</Link>
                  </Button>
                  <Button
                    id="acceptButtonFAQ"
                    variant={"default"}
                    type="submit"
                    className="w-60 rounded-none font-semibold"
                  >
                    Tambah
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Layout>
    </div>
  );
}
