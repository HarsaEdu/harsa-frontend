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
import { updateSubs } from "@/utils/apis/subs-plan";
import { getDetailSubs } from "@/utils/apis/subs-plan";

import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputFile from "@/components/inputFile";
import { Textarea } from "@/components/ui/textarea";
import UploadIcon from "../../../assets/upload2.svg";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const formSchema = z.object({
  nama: z.string().min(1, "*Isi Nama Paket Terlebih Dahulu"),
  durasi: z.coerce.number().min(1, "*Isi Durasi Paket Terlebih Dahulu"),
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
      message:
        "*Format file yang diupload salah, format file harus PNG, JPG, Jpeg, svg",
    }),
});

const EditSubscriptionPackage = () => {
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const [apiImageUrl, setApiImageUrl] = useState("");
  const [isNewImageSelected, setIsNewImageSelected] = useState(false);

  console.log("ID from params:", params.id);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      durasi: "",
      deskripsi: "",
      image: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    const fetchAllSubs = async () => {
      try {
        const response = await getDetailSubs(params.id);
        const selectedSubs = response.data;

        if (selectedSubs) {
          form.setValue("nama", selectedSubs.title);
          form.setValue("durasi", selectedSubs.duration);
          form.setValue("harga", selectedSubs.price);
          form.setValue("deskripsi", selectedSubs.description);
          setApiImageUrl(selectedSubs.image);
        } else {
          console.error(`Subs with ID ${params.id} not found`);
        }
      } catch (error) {
        console.error("Error fetching all Subs:", error);
      }
    };

    fetchAllSubs();
  }, [params.id, form]);

  const handleImageChange = (file) => {
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
      setIsNewImageSelected(true);
    } else {
      setPreview("");
    }
    console.log("Selected image:", file);
  };

  const onSubmit = async (data) => {
    // Data untuk dikirim ke backend
    const requestData = {
      title: data.nama,
      duration: parseInt(data.durasi),
      price: parseInt(data.harga),
      description: data.deskripsi,
      image: isNewImageSelected ? data.image : apiImageUrl,
    };

    console.log(requestData);

    Swal.fire({
      title: "Yakin kamu mau Menyimpan data ini?",
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
          title: "Sukses Edit Data Paket",
          icon: "success",
          showConfirmButton: false,
          showCloseButton: true,
        }).then(() => {
          navigate(`/langganan`);
        });
      }
    });
  };

  const handleCancel = () => {
    form.reset();
    setPreview("");
    setIsNewImageSelected(false);
  };

  const onSave = async (data) => {
    try {
      const subsId = params.id;

      const updatedSubs = await updateSubs(subsId, data);

      form.reset();
    } catch (error) {
      console.error("Error updating Subs data:", error);
    }
  };

  return (
    <Layout userRole="admin">
      <div className="mt- font-poppins">
        <h1 className="text-2xl font-semibold">Edit Paket Langganan</h1>
        <div className="mb-10 mt-10 rounded-[12px] border border-[#F2994A] px-[38px] py-[45px] font-poppins text-[#092C4C]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Nama Paket */}
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1 text-lg font-semibold">
                      Nama
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="nama"
                        placeholder="EX :paket....."
                        className="border border-black"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

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
                <FormControl name="harga">
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
                    id="deskripsis"
                    className="h-32 border border-black"
                    placeholder="Masukan Deskripsi untuk Paket"
                    {...form.register("deskripsi")}
                  />
                </FormControl>
                <FormMessage className="text-[#ED7878]">
                  {form.formState.errors.deskripsi?.message}
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
                            type="file"
                            preview={preview || apiImageUrl}
                            onChange={(e) => {
                              field.onChange(e.target.files[0]);
                              handleImageChange(e.target.files[0]);
                              form.setValue("image", e.target.files[0]);
                              console.log("InputFile onChange called");
                              console.log(
                                "Form image value after setting:",
                                form.getValues("image"),
                              );
                            }}
                            setPreview={(file) => {
                              setPreview(URL.createObjectURL(file));
                              setIsNewImageSelected(true);
                            }}
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

export default EditSubscriptionPackage;
