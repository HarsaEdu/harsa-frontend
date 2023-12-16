import { React, useState, useEffect } from "react";
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
import { createSubs } from "@/utils/apis/subs-plan";
import { getSubs } from "@/utils/apis/subs-plan";
import withReactContent from "sweetalert2-react-content";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputFile from "@/components/inputFile";
import { Textarea } from "@/components/ui/textarea";
import UploadIcon from "../../../assets/upload2.svg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const formSchema = z.object({
  nama: z.string().min(1, "*Isi Nama Paket Terlebih Dahulu"),
  durasi: z.string().min(1, "*Isi Durasi Paket Terlebih Dahulu"),
  harga: z.coerce.number().min(1, "*Masukkan Nominal Harga Terlebih Dahulu"),
  deskripsi: z.string().nonempty("*Isi Deskripsi Paket Terlebih Dahulu"),
  image: z
    .any()
    .refine((data) => data !== undefined && data !== null && data !== "", {
      message: "*Masukkan Gambar Terlebih Dahulu",
    })
    .refine((data) => data?.size <= MAX_FILE_SIZE, {
      message: "*Ukuran file terlalu besar, maksimal 5 mb",
    })
    .refine((data) => ACCEPTED_IMAGE_TYPES.includes(data?.type), {
      message: "*Format file yang dapat diupload hanya PNG, JPG, Jpeg dan svg",
    }),
});

const AddSubscriptionPackage = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [subs, setSubs] = useState([]);
  const MySwal = withReactContent(Swal);

  const setImage = (imageUrl) => {
    console.log("Setting image:", imageUrl);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      durasi: "",
      harga: null,
      deskripsi: "",
      image: null,
    },
  });

  useEffect(() => {
    // Panggil fungsi getCategory saat komponen dimuat
    fetchSubs();
  }, []);

  const fetchSubs = async () => {
    try {
      // Memanggil fungsi getCategory untuk mengambil data kategori
      const response = await getSubs();

      setSubs(response.data);
    } catch (error) {
      console.error("Failed to get categories:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const fileData = form.watch("image");
      console.log(fileData);

      // Membuat objek data yang akan dikirim ke backend
      const formData = new FormData();
      formData.append("title", data.nama);
      formData.append("duration", data.durasi);
      formData.append("price", data.harga);
      formData.append("description", data.deskripsi);
      formData.append("image", fileData);

      // Menampilkan konfirmasi sebelum mengirim data ke backend
      const confirmResult = await MySwal.fire({
        icon: "info",
        title: "Konfirmasi",
        text: "Apakah Anda yakin ingin menambahkan Data ini?",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      });

      if (confirmResult.isConfirmed) {
        // Memanggil fungsi createCourse untuk membuat kelas baru dengan data yang sesuai
        const response = await createSubs(formData);

        console.log(response);

        setPreview("");
        form.reset();

        const result = await MySwal.fire({
          icon: "success",
          title: "Sukses Tambah Data paket Langganan",
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
      form.setError("image", { message: errorMessage });
    }
  };

  const handleImageChange = (file) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview("");
      // Reset nilai pada field "upload" jika file dihapus
      form.resetField("image", null);
    }
  };

  return (
    <Layout userRole="admin">
      <div className="font-poppins">
        <h1 className="text-2xl font-semibold">Tambah Paket Langganan</h1>
        <div className="mb-10 mt-10 rounded-[12px] border border-[#F2994A] px-[38px] py-[45px] font-poppins text-[#092C4C]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Nama Paket */}
              <FormItem>
                <FormLabel name="nama">
                  <p className="text-lg font-semibold">Nama Paket</p>
                </FormLabel>
                <FormControl name="nama">
                  <Input
                    id="nama"
                    className="border border-black"
                    placeholder="EX :paket....."
                    {...form.register("nama")}
                  />
                </FormControl>
                <FormMessage className="text-[#ED7878]">
                  {form.formState.errors.nama?.message}
                </FormMessage>
              </FormItem>

              {/* Durasi */}
              <FormItem className="mt-5">
                <FormLabel name="durasi">
                  <p className="text-lg font-semibold">Durasi</p>
                </FormLabel>
                <FormControl name="yourFieldName">
                  <Input
                    id="durasi"
                    className="border border-black"
                    placeholder="Ex :30 hari"
                    {...form.register("durasi")}
                  />
                </FormControl>
                <FormMessage className="text-[#ED7878]">
                  {form.formState.errors.durasi?.message}
                </FormMessage>
              </FormItem>

              {/* Harga */}
              <FormItem className="mt-5">
                <FormLabel name="harga">
                  <p className="text-lg font-semibold">Harga</p>
                </FormLabel>
                <FormControl name="description">
                  <Input
                    id="harga"
                    className="border border-black"
                    placeholder="EX : 10000"
                    {...form.register("harga")}
                  />
                </FormControl>
                <FormMessage className="text-[#ED7878]">
                  {form.formState.errors.harga?.message}
                </FormMessage>
              </FormItem>

              {/* Deskripsi */}
              <FormItem className="mt-5">
                <FormLabel name="deskripsi">
                  <p className="text-lg font-semibold">Deskripsi</p>
                </FormLabel>
                <FormControl name="deskripsi">
                  <Textarea
                    id="deskripsi"
                    className="h-32 border border-black"
                    placeholder="Masukan Deskripsi untuk Paket"
                    {...form.register("deskripsi")}
                  />
                </FormControl>
                <FormMessage className="text-[#ED7878]">
                  {form.formState.errors.deskripsi?.message}
                </FormMessage>
              </FormItem>

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
                            onChange={(file) => {
                              field.onChange(file.target.files[0]);
                              console.log(file.target.files[0]);
                              handleImageChange(file.target.files[0]);
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
                  onClick={() => navigate("/langganan")}
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

export default AddSubscriptionPackage;
