import { React, useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import InputFile from "@/components/inputFile";
import { createCourse } from "@/utils/apis/courses";
import { getCategory } from "@/utils/apis/category";
import { getUserInsructor } from "@/utils/apis/user";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
<<<<<<< HEAD
  Form,  FormField,
=======
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
>>>>>>> d09ccc61e376278e02a68449e25e919fb1e3d8f2
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const formSchema = z.object({
  judul: z.string().min(1, "*Judul wajib di isi"),
  deskripsi: z.string().min(1, "*Deskripsi wajib di isi"),
  category: z
    .number()
    .nullable()
    .refine((value) => value !== null, {
      message: "*Kategori wajib di pilih",
    }),
  instructor: z
    .number()
    .nullable()
    .refine((value) => value !== null, {
      message: "*Instructor wajib di pilih",
  }),
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

function formKelasAdmin() {
  const [categories, setCategories] = useState([]);
  const [instructor, setInstructor] = useState([]);
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
      category: null,
      instructor: null,
      upload: null,
    },
  });

  useEffect(() => {
    // Panggil fungsi getCategory saat komponen dimuat
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // Memanggil fungsi getCategory untuk mengambil data kategori
      const response = await getCategory();

      // Setel data kategori ke dalam state
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to get categories:", error);
    }
  };

  useEffect(() => {
    // Panggil fungsi getCategory saat komponen dimuat
    fetchUserInstructor();
  }, []);

  const fetchUserInstructor = async () => {
    try {
      // Memanggil fungsi getCategory untuk mengambil data kategori
      const response = await getUserInsructor();

      // Setel data kategori ke dalam state
      setInstructor(response.data);
    } catch (error) {
      console.error("Failed to get categories:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const fileData = form.watch("upload");
      console.log(fileData);
  
      // Membuat objek data yang akan dikirim ke backend
      const formData = new FormData();
      formData.append("title", data.judul);
      formData.append("description", data.deskripsi);
      formData.append("category_id", data.category);
      formData.append("user_id", data.instructor);
      formData.append("file", fileData);
  
      // Menampilkan konfirmasi sebelum mengirim data ke backend
      const confirmResult = await MySwal.fire({
        icon: "info",
        title: "Konfirmasi",
        text: "Apakah Anda yakin ingin menambahkan kelas ini?",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      });
  
      if (confirmResult.isConfirmed) {
        // Memanggil fungsi createCourse untuk membuat kelas baru dengan data yang sesuai
        const response = await createCourse(formData);
  
        console.log(response);
  
        setPreview("");
        form.reset();
  
        const result = await MySwal.fire({
          icon: "success",
          title: "Sukses Tambah Kelas",
          text: response.message || "",
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
    } catch (error) {
      console.error("Failed to add course:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to add course.";
      form.setError("upload", { message: errorMessage });
    }
  };

  const handleImageChange = (file) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview("");
    }
  };

  return (
    <div className="font-poppins pt-10">
      <section className="relative mx-auto rounded-lg border border-[#092C4C] p-8">
        <h1 className="mb-5 text-2xl font-bold text-[#092C4C]">Tambah Kelas</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-8 py-5 space-y-8"
          >
            <FormItem>
              <FormLabel className="ml-1 text-lg font-bold text-[#092C4C]">
                Judul
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Judul Kelas"
                  className="w-full rounded-lg border border-gray-400 bg-transparent px-3 py-4 outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
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
                <Textarea
                placeholder="Deskripsi"
                className="w-full rounded-lg border border-gray-400 bg-transparent px-3 py-4 outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
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
                {/* Gunakan data kategori yang telah diambil untuk mengisi pilihan dalam Select */}
                <Select
                  onValueChange={(value) => form.setValue("category", Number(value))}
                  value={form.watch("category") || ""}  // Gunakan string kosong jika nilainya null
                  defaultValue=""
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Mapping data kategori ke dalam opsi SelectItem */}
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id}
                        className="text-base hover:bg-slate-100"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-[#ED7878]">
                {form.formState.errors.category?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel className="ml-1 text-lg font-bold text-[#092C4C]">
                Instructor
              </FormLabel>
              <FormControl>
                {/* Gunakan data kategori yang telah diambil untuk mengisi pilihan dalam Select */}
                <Select
                  onValueChange={(value) => form.setValue("instructor", Number(value))}
                  value={form.watch("instructor") || ""}
                  defaultValue=""
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Instructor" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Mapping data instructor ke dalam opsi SelectItem */}
                    {instructor.map((instructor) => (
                      <SelectItem
                        key={instructor.id}
                        value={instructor.id}
                        className="text-base hover:bg-slate-100"
                      >
                        {instructor.username}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-[#ED7878]">
                {form.formState.errors.instructor?.message}
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
                    {/* InputFile component is assumed to be defined elsewhere */}
                    <InputFile
                      textUpload="Upload Cover Course"
                      preview={preview}
                      onChange={(file) => {
                        field.onChange(file.target.files[0]);
                        console.log(file.target.files[0]);
                        handleImageChange(file.target.files[0]);
                      }}
                      setPreview={setPreview}
                    />
                  </FormControl>
                  <FormMessage className="text-[#ED7878]">
                    {form.formState.errors.upload?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <Link to="/kelas">
                <Button
                  type="button"
                  className="text-s h-[40px] w-[150px] rounded-lg border border-[#092C4C] bg-[#FFFFFF] py-4 text-center font-bold text-[#092C4C] hover:bg-[#092C4C]/90 active:scale-95"
                >
                  Batal
                </Button>
              </Link>
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
    </div>
  );
}

export default formKelasAdmin;
