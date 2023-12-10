import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Index";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import * as z from "zod";
import { updateFAQ } from "@/utils/apis/faq";

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

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const response = await axios.get(
          `https://api.harsaedu.my.id/web/faqs/${id}`
        );
        const faqData = response.data.data;

        // Set data FAQ ke dalam form untuk mengisi nilai awal
        form.setValue("pertanyaan", faqData.question);
        form.setValue("jawaban", faqData.answer);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchFAQData();
  }, [id, form]);

  const onSubmit = (data) => {
    Swal.fire({
      title: "Yakin kamu mau Simpan data ini?",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#092C4C",
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
      cancelButtonColor: "#F2994A",
    }).then((result) => {
      if (result.isConfirmed) {
        saveFAQData(data);
      }
    });
  };

  const saveFAQData = async (data) => {
    try {
      const requestData = {
        question: data.pertanyaan,
        answer: data.jawaban,
      };

      // Panggil fungsi untuk mengupdate data FAQ
      await updateFAQ(id, requestData);

      Swal.fire({
        title: "Sukses Update Data",
        icon: "success",
        showConfirmButton: false,
        showCloseButton: true,
        timer: 2000,
      });

      // Redirect atau navigasi ke halaman lain setelah berhasil update
      navigate("/content-management/FAQ");
    } catch (error) {
      console.error("Failed to update FAQ data:", error);
      // Handle error, such as displaying an error message
    }
  };
  

  return (
    <Layout>
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
                <Link to="/content-management/faq">
                  <Button
                    id="cancelButtonFAQ"
                    className="bg-[#ED7878] w-60 text-white font-semibold rounded-none"
                    variant={"outline"}
                    type="reset"
                  >
                    Batal
                  </Button>
                </Link>
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
