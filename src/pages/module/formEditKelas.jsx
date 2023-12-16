import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import InputFile from "@/components/inputFile";
import { getDetailCourse, putCourse } from "@/utils/apis/courses";
import { getCategory } from "@/utils/apis/category";
import { getUserInsructor } from "@/utils/apis/user";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Index";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
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
  .refine((data) => !data || data.size <= MAX_FILE_SIZE, {
    message: "*Ukuran file terlalu besar, maksimal 5 MB",
  })
  .refine((data) => !data || ACCEPTED_IMAGE_TYPES.includes(data.type), {
    message:
      "*Format file yang di-upload salah, format file harus PNG, JPG, Jpeg, svg",
  }),
});

function EditClass() {
  const [categories, setCategories] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const [course, setCourse] = useState([]);
  const [preview, setPreview] = useState("");
  const MySwal = withReactContent(Swal);
  const { id } = useParams();
  const params = useParams();
  const navigate = useNavigate();

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

  async function fetchDetail() {
    try {
      const result = await getDetailCourse(+params.id);
      setCourse(result.data);
      form.setValue("judul", result.data.title);
      form.setValue("deskripsi", result.data.description);
      form.setValue("category", result.data.category_id);
      form.setValue("instructor", result.data.user.name);
      setPreview(result.data.image_url);
      console.log(course);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCategory();
        const allCategory = result.data;
        setCategories(allCategory); // Add this line to set the categories
      } catch (error) {
        console.log("Category Data Not Found", error);
      }
    };
    fetchData();
    fetchDetail();
    fetchUserInstructor();
  }, [id, form]);

  useEffect(() => {
    if (course) {
      console.log("Course Data:", course);

      // Set form values when course data is available
      form.reset({
        category: course.category?.id || null,
        instructor: course.user?.id || null,
      });
    }
  }, [course]);

  const fetchUserInstructor = async () => {
    try {
      const response = await getUserInsructor();

      // Setel data kategori ke dalam state
      setInstructor(response.data);
      console.log(instructor);
    } catch (error) {
      console.error("Failed to get categories:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const fileData = form.watch("upload");
      console.log(fileData);

      if (!preview) {
        form.setError("upload", {
          message: "*Gambar wajib diisi",
        });
        return; // Keluar dari fungsi jika file kosong
      }

      const formData = new FormData();
      formData.append("title", data.judul);
      formData.append("description", data.deskripsi);
      formData.append("category_id", data.category);
      formData.append("user_id", data.instructor);
      if (fileData) {
        formData.append("file", fileData);
      }

      const confirmResult = await MySwal.fire({
        icon: "question",
        title: "Konfirmasi",
        text: "Yakin kamu mau simpan data ini?",
        showCancelButton: true,
        confirmButtonColor: "#092C4C",
        confirmButtonText: "Ya, Simpan",
        cancelButtonText: "Batal",
        cancelButtonColor: "#F2994A",
      });

      if (confirmResult.isConfirmed) {
        const response = await putCourse(id, formData);

        console.log(response);

        setPreview("");
        form.reset();

        const result = await MySwal.fire({
          icon: "success",
          title: "Sukses Edit Kelas",
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
          navigate("/kelas");
        }
      }
    } catch (error) {
      console.error("Failed to edit course:", error);
      Swal.fire({
        title: "Gagal Mengedit Kelas",
        text: "pastikan mengisi seluruh kolom",
        icon: "error",
        showConfirmButton: false,
        showCloseButton: true,
      });
      const errorMessage =
        error.response?.data?.message || "Failed to edit course.";
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
    <Layout>
      <Breadcrumb />
      <div className="pt-10 font-poppins">
        <section className="relative mx-auto rounded-lg border border-[#092C4C] p-8">
          <h1 className="mb-5 text-2xl font-bold text-[#092C4C]">
            Update Kelas
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 px-8 py-5"
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
                    onValueChange={(value) =>
                      form.setValue("category", Number(value))
                    }
                    value={form.watch("category") || ""} // Gunakan string kosong jika nilainya null
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
                    onValueChange={(value) =>
                      form.setValue("instructor", Number(value))
                    }
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
                      <div className="w-full h-56 border border-black rounded-lg flex justify-center items-center p-4 cursor-pointer">
                        <div className="border border-black border-dashed w-full flex flex-col justify-center items-center font-poppins font-semibold text-[#A2D2FF] text-lg">
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
                        </div>
                      </div>
                      
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
    </Layout>
  );
}

export default EditClass;
