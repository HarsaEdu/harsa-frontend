import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Index";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as z from "zod";

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
  pertanyaan: z.string({
    required_error: "*Pertanyaan wajib di isi",
  }),
  jawaban: z.string({
    required_error: "*Jawaban wajib di isi",
  }),
});

const EditFAQ = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Ambil id FAQ dari URL params
  const userRole = "admin";

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    Swal.fire({
      title: "Yakin kamu mau simpan data ini?",
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
            navigate("/content-management/FAQ");
          }
        });
      }
    });
  };

  const onSave = (data) => {
    // Simulasikan fungsi untuk menyimpan data ke backend
    console.log(`Simpan data FAQ dengan ID ${id}:`, data);
    form.reset(); // Reset form setelah penyimpanan
  };

  return (
    <Layout userRole={userRole}>
      <div className="container mb-10">
        <Breadcrumb />
        <div className="font-poppins">
          <h2 className="text-2xl font-semibold pb-4 pt-10">Edit FAQ</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="px-8 py-5 space-y-8 border-2 border-[#092C4C]"
            >
              <FormField
                control={form.control}
                name="pertanyaan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1 text-lg font-semibold">
                      Pertanyaan
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="pertanyaan"
                        placeholder="Bagaimana cara..."
                        {...field}
                        className="h-36 w-full rounded-lg border border-gray-400 bg-transparent px-3 py-4 outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jawaban"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="ml-1 text-lg font-semibold">
                      Jawaban
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="jawaban"
                        placeholder="Bagaimana cara..."
                        {...field}
                        className="h-36 w-full rounded-lg border border-gray-400 bg-transparent px-3 py-4 outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="flex px-4 justify-between">
                <Button
                  id="cancelButtonFAQ"
                  className="bg-[#ED7878] w-60 text-white font-semibold rounded-none"
                  variant={"outline"}
                  type="reset"
                >
                  <Link to="/faq">Batal</Link>
                </Button>
                <Button
                  id="acceptButtonFAQ"
                  variant={"default"}
                  type="submit"
                  className="font-semibold w-60 rounded-none"
                >
                  Simpan
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default EditFAQ;