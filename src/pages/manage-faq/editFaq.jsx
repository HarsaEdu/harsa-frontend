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

  useEffect(() => {
    const fetchAllFAQs = async () => {
      try {
        const response = await axios.get(
          "https://api.harsaedu.my.id/web/faqs?offset=0&limit=10"
        );
        const allFAQs = response.data.data;

        // Cari FAQ berdasarkan ID dari daftar semua FAQ
        const selectedFAQ = allFAQs.find((faq) => faq.id.toString() === id);

        // Jika FAQ ditemukan, set nilai awal formulir
        if (selectedFAQ) {
          form.setValue("pertanyaan", selectedFAQ.question);
          form.setValue("jawaban", selectedFAQ.answer);
        } else {
          console.error(`FAQ with ID ${id} not found`);
        }
      } catch (error) {
        console.error("Error fetching all FAQs:", error);
      }
    };

    fetchAllFAQs();
  }, [id, form]);

  const onSubmit = (data) => {
    // Data untuk dikirim ke backend
    const requestData = {
      question: data.pertanyaan,
      answer: data.jawaban,
    };

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
        onSave(requestData);
        Swal.fire({
          title: "Sukses Update Data",
          icon: "success",
          showConfirmButton: false,
          showCloseButton: true,
          timer: 2000,
        }).then(() => {
          navigate("/content-management/FAQ");
        });
      }
    });
  };

  const onSave = async (data) => {
    try {
      const token = localStorage.getItem("access_token"); // Ganti dengan cara Anda mendapatkan token
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
  
      // Simpan data ke backend menggunakan metode PUT
      // Ganti endpoint dengan endpoint yang sesuai
      await axios.put(`https://api.harsaedu.my.id/web/faqs/${id}`, data, {
        headers,
      });
  
      // Reset form setelah penyimpanan
      form.reset();
    } catch (error) {
      console.error("Error updating FAQ data:", error);
    }
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
