import { React, useState, useEffect } from "react";
import Layout from "@/components/layout/Index"
import {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
} from "@/components/ui/form"

import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputFile from "@/components/inputFile";
import { Textarea } from "@/components/ui/textarea";
import UploadIcon from "../../../assets/upload2.svg"
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const formSchema = z.object({
nama: z.string().min(1, "*Nama Paket Wajib di isi"),
durasi: z.string().min(1, "*Durasi Wajib di isi"),
harga: z.string().min(1, "*Harga Wajib di isi"),
deskripsi: z.string().nonempty("*Deskripsi Wajib di isi"),
image: z
    .any()
    .refine((data) => data !== undefined && data !== null && data !== "", {
      message: "*Image  wajib di isi",
    })
    .refine((data) => data?.size <= MAX_FILE_SIZE, {
        message: "*Ukuran file terlalu besar, maksimal 5 MB",
    })
    .refine((data) => ACCEPTED_IMAGE_TYPES.includes(data?.type), {
      message: "*Format file yang di upload salah, format file harus PNG, JPG, Jpeg, svg",
    }),
});


const EditSubscriptionPackage = () => {
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [apiImageUrl, setApiImageUrl] = useState("");
    const [isNewImageSelected, setIsNewImageSelected] = useState(false);

    console.log("ID from params:", id);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
        nama: "",
        durasi: "",
        deskripsi: "",
        image: "",
    },
    mode: 'onChange',
});


useEffect(() => {
    const fetchAllSubs = async () => {
      try {
        const response = await axios.get(
          "https://api.harsaedu.my.id/web/subs-plan", 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const allSubs = response.data.data;

        // Cari FAQ berdasarkan ID dari daftar semua FAQ
        const selectedSubs = allSubs.find((subs) => subs.id.toString() === id);

        // Jika FAQ ditemukan, set nilai awal formulir
        if (selectedSubs) {
          form.setValue("nama", selectedSubs.title);
          form.setValue("durasi", selectedSubs.duration);
          form.setValue("harga", selectedSubs.price);
          form.setValue("deskripsi", selectedSubs.description);
        //   form.setValue("image", selectedSubs.image);
          setApiImageUrl(selectedSubs.image);
        } else {
          console.error(`Subs with ID ${id} not found`);
        }
      } catch (error) {
        console.error("Error fetching all Subs:", error);
      }
    };

    fetchAllSubs();
  }, [id, form]);


  const handleImageChange = (file) => {
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
      setIsNewImageSelected(true);
    } else {
      setPreview("");    }
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

      console.log(requestData)

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
            timer: 2000,
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
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      await axios.put(`https://api.harsaedu.my.id/web/subs-plan/${id}`, data, {
        headers,
      });
  
      form.reset();
    } catch (error) {
      console.error("Error updating Subs data:", error);
    }
  };
  


    return(
        <Layout userRole="admin">
            <div className="font-poppins mt-">
                <h1 className="font-semibold text-2xl">Edit Paket Langganan</h1>
                <div className="border border-[#F2994A] py-[45px] px-[38px] rounded-[12px] mt-10 mb-10 font-poppins text-[#092C4C]">
                
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
                        <FormItem
                        className="mt-5"
                        >
                            <FormLabel 
                            name="durasi"
                            >
                                <p className="font-semibold text-lg">Durasi</p>
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
                        <FormItem
                        className="mt-5"
                        >
                            <FormLabel 
                            name="harga"
                            >
                                <p className="font-semibold text-lg">Harga</p>
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
                        <FormItem
                        className="mt-5"
                        >
                            <FormLabel 
                            name="deskripsi"
                            >
                                <p className="font-semibold text-lg">Deskripsi</p>
                            </FormLabel>
                            <FormControl name="deskripsi">
                                <Textarea
                                id="deskripsis"
                                className="border border-black h-32"
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
                            <FormItem
                            className="mt-5">
                                <p className="font-semibold text-lg mb-3">Image</p>

                                <FormLabel 
                                name="image"
                                htmlFor="image"
                                className="cursor-pointer"
                                >
                                    <div className="w-full h-56 border border-black rounded-lg flex justify-center items-center p-4 cursor-pointer">
                                        <div className="border border-black border-dashed w-full flex flex-col justify-center items-center font-poppins font-semibold text-[#A2D2FF] text-lg">
                                        <InputFile
                                        id="image"
                                        type="file"
                                        preview={preview || apiImageUrl}
                                        onChange={(e) => {
                                            field.onChange(e.target.files[0]);
                                            handleImageChange(e.target.files[0]);
                                            form.setValue("image", e.target.files[0]);
                                            console.log("InputFile onChange called");
                                            console.log("Form image value after setting:", form.getValues("image"));
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

                        <div className="flex justify-between mt-10">
                            <Button
                            className="bg-[#ED7878] w-[200px]"
                            onClick={() => navigate("/langganan")}
                            >
                                Batal
                            </Button>

                            <Button
                            className="w-[200px]"
                            type="submit"
                            >
                                Tambah
                            </Button>
                        </div>
                        </form>
                    </Form>

                </div>
            </div>
        </Layout>
    )
}

export default EditSubscriptionPackage