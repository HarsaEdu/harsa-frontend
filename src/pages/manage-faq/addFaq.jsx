/* eslint-disable react-hooks/rules-of-hooks */
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
  pertanyaan: z
    .string({
      required_error: "*Pertanyaan wajib di isi",
    })
    .min(1, { message: "*Pertanyaan wajib di isi" }),
  jawaban: z
    .string({
      required_error: "*Jawaban wajib di isi",
    })
    .min(1, { message: "*Jawaban wajib di isi" }),
});

const AddFAQ = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    try {
      // Mendapatkan token dari localStorage atau dari mana pun yang sesuai
      const token = localStorage.getItem("access_token");

      // Memastikan token tersedia sebelum mengirim permintaan
      if (!token) {
        console.error("Access token not available");
        return;
      }

      // Menggunakan axios untuk mengirim data ke backend
      const response = await axios.post(
        "https://api.harsaedu.my.id/web/faqs",
        {
          question: data.pertanyaan,
          answer: data.jawaban,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Menyertakan token di header
          },
        },
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Sukses Tambah Data FAQ",
          icon: "success",
          showConfirmButton: false,
          showCloseButton: true,
        }).then((result) => {
          if (result.isDismissed) {
            navigate(`/content-management/FAQ`);
          }
        });
      } else {
        // Handle error response dari server jika diperlukan
        console.error("Error during data submission:", response);
      }
    } catch (error) {
      console.error("An error occurred during data submission:", error);
    }
  };

  return (
    <Layout>
      <div className="container mb-10">
        <Breadcrumb />
        <div className="font-poppins">
          <h2 className="pb-4 pt-10 text-2xl font-semibold">Tambah FAQ</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 border-2 border-[#092C4C] px-8 py-5"
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
              <div className="flex justify-between px-4">
                <Button
                  id="cancelButtonFAQ"
                  className="w-60 rounded-none bg-[#ED7878] font-semibold text-white"
                  variant={"outline"}
                  type="reset"
                  onClick={() => navigate(-1)}
                >
                  Batal
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
  );
};

export default AddFAQ;
