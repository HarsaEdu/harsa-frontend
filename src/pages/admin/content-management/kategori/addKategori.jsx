import { React, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addCategory } from "@/utils/apis/manage-category";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const formSchema = z.object({
  name: z.string().min(1, "*Nama Kategori Wajib di isi"),
  description: z.string().nonempty("*Deskripsi Wajib di isi"),
  image: z
    .any()
    .refine((data) => data !== undefined && data !== null && data !== "", {
      message: "*Image  wajib di isi",
    })
    .refine((data) => data?.size <= MAX_FILE_SIZE, {
      message: "*ukuran file terlalu besar, maksimal 5 mb",
    })
    .refine((data) => ACCEPTED_IMAGE_TYPES.includes(data?.type), {
      message:
        "*Format file yang di upload salah, format file harus PNG, JPG, Jpeg, svg",
    }),
});

const AddKategori = () => {
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      duration: "",
      description: "",
      image: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("image", data.image);
      const result = await addCategory(formData);
      Swal.fire({
        title: "Sukses Tambah Data",
        icon: "success",
        showConfirmButton: false,
        showCloseButton: true,
      }).then((result) => {
        if (result.isDismissed) {
          navigate("/category-management/category");
        }
      });
    } catch (error) {
      console.log("error", error);
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
    <Layout userRole="admin">
      <div className="font-poppins">
        <h1 className="text-2xl font-semibold">Tambah Kategori</h1>
        <div className="mb-10 mt-10 rounded-[12px] border border-[#F2994A] px-[38px] py-[45px] font-poppins text-[#092C4C]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Nama Paket */}
              <FormItem>
                <FormLabel name="name">
                  <p className="text-lg font-semibold">Nama Kategori</p>
                </FormLabel>
                <FormControl name="name">
                  <Input
                    id="name"
                    className="border border-black"
                    placeholder="EX: Nama Kategori"
                    {...form.register("name")}
                  />
                </FormControl>
                <FormMessage className="text-[#ED7878]">
                  {form.formState.errors.name?.message}
                </FormMessage>
              </FormItem>

              {/* Deskripsi */}
              <FormItem className="mt-5">
                <FormLabel name="description">
                  <p className="text-lg font-semibold">Deskripsi</p>
                </FormLabel>
                <FormControl name="description">
                  <Textarea
                    id="description"
                    className="h-32 border border-black"
                    placeholder="Masukan Deskripsi untuk Kategori"
                    {...form.register("description")}
                  />
                </FormControl>
                <FormMessage className="text-[#ED7878]">
                  {form.formState.errors.description?.message}
                </FormMessage>
              </FormItem>

              {/* Image */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <p className="mb-3 text-lg font-semibold">Image</p>

                    <FormLabel
                      name="image"
                      htmlFor="image"
                      className="cursor-pointer"
                    >
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
                    </FormLabel>
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

export default AddKategori;
