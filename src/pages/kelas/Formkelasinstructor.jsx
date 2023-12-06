import { React, useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import InputFile from "@/components/inputFile";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const formSchema = z.object({
  judul: z.string().min(1, "*Judul wajib di isi"),
  deskripsi: z.string().min(1, "*Deskripsi wajib di isi"),
  category: z.string().min(1, "*Kategori wajib di pilih"),
  upload: z
    .any()
    .refine((data) => data !== undefined && data !== null && data !== "", {
      message: "*Gambar harus di isi",
    })
    .refine((data) => data?.size <= MAX_FILE_SIZE, {
      message: "*Ukuran gambar harus di bawah 5 MB.",
    })
    .refine((data) => ACCEPTED_IMAGE_TYPES.includes(data?.type), {
      message: "*Format file salah, upload dengan format JPG, JPEG, atau PNG",
    }),
});

function FormKelas() {
  const [preview, setPreview] = useState("");
  const MySwal = withReactContent(Swal);
  const setImage = (imageUrl) => {
    console.log("Setting image:", imageUrl);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      judul: "",
      deskripsi: "",
      category: "",
      upload: "",
    },
  });

  const onSubmit = async (data) => {
    if (form.formState.errors.upload) {
      form.setError("upload", { message: "*Gambar harus di isi" });
    } else {
      setImage(URL.createObjectURL(data.upload));
      console.log(data);
      setPreview("");
      form.reset();

      const result = await MySwal.fire({
        icon: "success",
        title: "Sukses Tambah Kelas",
        text: form.formState.errors.upload?.message || "",
        showConfirmButton: false,
        showCloseButton: true,
        customClass: {
          closeButton: "swal2-cancel-button",
        },
        buttonsStyling: false,
      });

      if (result.isDismissed || result.isConfirmed) {
        MySwal.close();
      }
    }
  };

  const handleCancel = () => {
    form.reset();
    setPreview("");
  };

  const handleImageChange = (file) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview("");
    }
  };

  return (
    <main className="bg-[#FFFFFF]">
      <section className="mx-auto max-w-[800px] rounded-lg border border-[#092C4C] p-8 relative overflow-hidden">
        <h1 className="mb-5 text-2xl font-bold text-[#092C4C]">Tambah Kelas</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 px-4"
          >
            <FormItem>
              <FormLabel className="ml-1 text-lg font-bold text-[#092C4C]">
                Judul
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Judul Kelas"
                  className="h-[40px] w-[710px] rounded-s border border-[#092C4C] bg-transparent px-3 py-4 text-black outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
                  {...form.register("judul")}
                />
              </FormControl>
              <FormMessage className="text-[#ED7878]">
                {form.formState.errors.judul?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel className="ml-1 flex text-lg font-bold text-[#092C4C]">
                Deskripsi
              </FormLabel>
              <FormControl>
                <textarea
                  placeholder="Deskripsi"
                  className="h-[175px] w-[710px] resize-none rounded-lg border border-[#092C4C] bg-transparent px-3 py-4 text-black outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
                  {...form.register("deskripsi")}
                />
              </FormControl>
              <FormMessage className="text-[#ED7878]">
                {form.formState.errors.deskripsi?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel className="ml-1 text-lg font-bold text-[#092C4C]">
                Kategori
              </FormLabel>
              <FormControl>
                <select
                  className="flex h-[40px] w-[710px] rounded-lg border border-[#092C4C] bg-transparent px-2 py-2 text-black outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
                  {...form.register("category")}
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>
                  <option value="uiux">UI/UX</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="flutter">Flutter</option>
                </select>
              </FormControl>
              <FormMessage className="text-[#ED7878]">
                {form.formState.errors.category?.message}
              </FormMessage>
            </FormItem>

            <FormField
              control={form.control}
              name="upload"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-1 text-lg font-bold text-[#092C4C]">
                    Upload Cover
                  </FormLabel>
                  <FormControl>
                    <div className="border border-[#092C4C] rounded-lg overflow-hidden">
                      <InputFile
                        textUpload="Upload Cover"
                        preview={preview}
                        onChange={(e) => {
                          field.onChange(e.target.files[0]);
                          handleImageChange(e.target.files[0]);
                        }}
                        setPreview={setPreview}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[#ED7878]">
                    {form.formState.errors.upload?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <Button
                type="button"
                onClick={handleCancel}
                className="text-s h-[40px] w-[150px] rounded-lg border border-[#092C4C] bg-[#FFFFFF] py-4 text-center font-bold text-[#092C4C] hover:bg-[#092C4C]/90 active:scale-95"
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="text-s h-[40px] w-[150px] rounded-lg bg-[#092C4C] py-4 text-center font-bold text-white hover:bg-[#092C4C]/90 active:scale-95"
              >
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
}
export default FormKelas;
