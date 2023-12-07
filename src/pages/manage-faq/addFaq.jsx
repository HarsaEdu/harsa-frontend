/* eslint-disable react-hooks/rules-of-hooks */
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Index";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
        }
      );
  
      if (response.status === 201) {
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
      } else {
        // Handle error response dari server jika diperlukan
        console.error("Error during data submission:", response);
      }
    } catch (error) {
      console.error("An error occurred during data submission:", error);
    }
  };

  const onSave = (data) => {
    // Do something with the form values.
    // The values are already type-safe and validated based on your formSchema.
    console.log(data);
    form.resetField("titleTugas");
    form.resetField("descriptionTugas");
  };

  return (
    <Layout>
      <div className="container mb-10">
        <Breadcrumb />
        <div className="font-poppins">
            <h2 className="text-2xl font-semibold pb-4 pt-10">Tambah FAQ</h2>
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
