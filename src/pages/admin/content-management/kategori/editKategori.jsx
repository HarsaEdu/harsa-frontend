import { React, useEffect, useState } from "react";
import Layout from "@/components/layout/Index";
import {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputFile from "@/components/inputFile";
import { Textarea } from "@/components/ui/textarea";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getCategoryById } from "@/utils/apis/manage-category";
import { editCategory } from "@/utils/apis/manage-category";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const formSchema = z.object({
  name: z
    .string()
    .min(1, "*Nama Kategori Wajib di isi")
    .max(10, "Maksimal 10 Karakter"),
  description: z.string().nonempty("*Deskripsi Wajib di isi"),
  image: z.any()
  .refine((data) => !data || data.size <= MAX_FILE_SIZE, {
    message: "*Ukuran file terlalu besar, maksimal 5 MB",
  })
  .refine((data) => !data || ACCEPTED_IMAGE_TYPES.includes(data.type), {
    message:
      "*Format file yang di-upload salah, format file harus PNG, JPG, Jpeg, svg",
  }),
});

const EditKategori = () => {
  const { id } = useParams();
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCategoryById(id);

        if (result) {
          form.setValue("name", result.data.name);
          form.setValue("description", result.data.description);
          setPreview(result.data.image);
        } else {
          console.error("Category Data Not Found");
        }
      } catch (error) {
        console.log("Category Data Not Found", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const fileData = form.watch("image");
      console.log(fileData);

      if (!preview) {
        form.setError("image", {
          message: "*Gambar wajib diisi",
        });
        return; // Keluar dari fungsi jika file kosong
      }

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      if (fileData) {
        formData.append("image", fileData);
      }

      console.log(formData)

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
          const response = await editCategory(id, formData)
          console.log(response);
          Swal.fire({
            title: "Sukses Update Data",
            icon: "success",
            showConfirmButton: false,
            showCloseButton: true,
          }).then(() => {
            navigate(`/category-management/category`);
          });
        }
    } catch (error) {
      console.log("Error", error);
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
    <Layout userRole="admin">
      <div className="font-poppins">
        <h1 className="text-2xl font-semibold">Edit Kategori</h1>
        <div className="mb-10 mt-10 rounded-[12px] border border-[#F2994A] px-[38px] py-[45px] font-poppins text-[#092C4C]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Nama Paket */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Nama Kategori
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        className="border border-black"
                        placeholder="EX: Nama Kategori"
                        {...form.register("name")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#ED7878]">
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Deskripsi */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel className="text-lg font-semibold">
                      Deskripsi
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="description"
                        className="h-32 border border-black"
                        placeholder="Masukan Deskripsi untuk Kategori"
                        {...form.register("description")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#ED7878]">
                      {form.formState.errors.description?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Image */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel  className="text-lg font-semibold">
                      Image
                    </FormLabel>
                    <FormControl>
                        <div className="flex h-56 w-full cursor-pointer items-center justify-center rounded-lg border border-black p-4">
                          <div className="flex w-full flex-col items-center justify-center border border-dashed border-black font-poppins text-lg font-semibold text-[#A2D2FF]">
                            <InputFile
                              id="image"
                              preview={preview}
                              type="file"
                              className="hidden"
                              onChange={(e) => {
                                field.onChange(e.target.files[0]);
                                handleImageChange(e.target.files[0]);
                              }}
                              setPreview={setPreview}
                            />
                          </div>
                        </div>
                    </FormControl>
                    <FormMessage className="text-[#ED7878]">
                      {form.formState.errors.image?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <div className="mt-10 flex justify-between">
                <Button
                  className="w-[200px] bg-[#ED7878]"
                  onClick={() => navigate("/category-management/category")}
                >
                  Batal
                </Button>

                <Button className="w-[200px]" type="submit">
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

export default EditKategori;
