import { React, useState } from "react";
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import UploadIcon from "../../../assets/upload2.svg"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const MAX_FILE_SIZE_MB = 5;

const formSchema = z.object({
    packagename: z.string().nonempty("*Nama Paket Wajib di isi"),
    duration: z.string().nonempty("*Durasi Wajib di isi"),
    description: z.string().nonempty("*Deskripsi Wajib di isi"),
    image: z.unknown().refine((value) => {
        return value instanceof File;
    }, {
        message: "*Image Wajib di isi",
    }).refine((value) => {
        if (value instanceof File) {
            const supportedFormats = ['png', 'jpg', 'jpeg', 'svg'];
            const extension = value.name.split('.').pop().toLowerCase();
            return supportedFormats.includes(extension);
        }
        return false;
    }, {
        message: "*Format file yang diunggah salah. Harap unggah file dengan format PNG, JPG, JPEG, atau SVG."
    }).refine((value) => {
        if (value instanceof File) {
            const fileSizeMB = value.size / (1024 * 1024);
            return fileSizeMB <= MAX_FILE_SIZE_MB;
        }
        return false;
    }, {
        message: `Ukuran file terlalu besar. Maksimal ${MAX_FILE_SIZE_MB} MB.`
    }),
});


const EditSubscriptionPackage = () => {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
        packagename: "",
        duration: "",
        description: "",
        image: null,
    },
});

    
const onSubmit = async (data) => {
    const confirmationResult = await Swal.fire({
            title: "Yakin kamu mau Menyimpan  data ini?",
            showCancelButton: true,
            showConfirmButton: true,
            icon: "question",
            confirmButtonColor: "#092C4C",
            confirmButtonText: "Ya, Simpan",
            cancelButtonText: "Batal",
            cancelButtonColor: "#F2994A",
            customClass: {
            popup: 'text-center',
            title: 'mb-2', 
        },
    });

    if (confirmationResult.isConfirmed) {
        console.log(data);
    
        localStorage.setItem('subscriptionData', JSON.stringify(data));
    
        Swal.fire({
            icon: 'success',
            title: 'Sukses Edit  Data Paket',
            showCloseButton: true,
            closeButtonHtml: '<i class="fas fa-times"></i>',
            showConfirmButton: false,
            customClass: {
            title: 'text-[#333333] font-bold text-2xl mb-4',
            closeButton: 'bg-[#E5E5E5] text-[#4F4F4F] text-2xl rounded-full p-2 m-2',
        },
    });
    
        navigate("/langganan");
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
                        <FormItem>
                            <FormLabel 
                            name="packagename">
                                <p className="font-semibold text-lg">Nama Paket</p>
                            </FormLabel>
                            <FormControl 
                            name="packagename">
                                <Input
                                id="packagename"
                                className="border border-black"
                                placeholder="EX :paket....."
                                {...form.register("packagename")}
                                />
                            </FormControl>
                            <FormMessage className="text-[#ED7878]">
                                {form.formState.errors.packagename?.message}
                            </FormMessage>
                        </FormItem>

                        {/* Durasi */}
                        <FormItem
                        className="mt-5"
                        >
                            <FormLabel 
                            name="duration"
                            >
                                <p className="font-semibold text-lg">Durasi</p>
                            </FormLabel>
                            <FormControl name="yourFieldName">
                                <Input
                                id="duration"
                                className="border border-black"
                                placeholder="Ex :30 hari"
                                {...form.register("duration")}
                                />
                            </FormControl>
                            <FormMessage className="text-[#ED7878]">
                                {form.formState.errors.duration?.message}
                            </FormMessage>
                        </FormItem>

                        {/* Deskripsi */}
                        <FormItem
                        className="mt-5"
                        >
                            <FormLabel 
                            name="description"
                            >
                                <p className="font-semibold text-lg">Deskripsi</p>
                            </FormLabel>
                            <FormControl name="description">
                                <Textarea
                                id="description"
                                className="border border-black h-32"
                                placeholder="Masukan Deskripsi untuk Paket"
                                {...form.register("description")}
                                />
                            </FormControl>
                            <FormMessage className="text-[#ED7878]">
                                {form.formState.errors.description?.message}
                            </FormMessage>
                        </FormItem>

                        {/* Image */}
                        <FormItem
                        className="mt-5"
                        >
                            <p className="font-semibold text-lg mb-3">Image</p>

                            <FormLabel 
                            name="image"
                            htmlFor="image"
                            className="cursor-pointer"
                            >
                                <div className="w-full h-56 border border-black rounded-lg flex justify-center items-center p-4">
                                    <div className="border border-black border-dashed w-full flex flex-col justify-center items-center p-5 font-poppins font-semibold text-[#A2D2FF] text-lg">
                                        <img 
                                        src={UploadIcon}
                                        alt=""
                                        style={{ maxWidth: "100%", maxHeight: "100%" }} 
                                        />
                                        <p>Drop File here of browse</p>
                                    </div>
                                </div>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/jpeg, image/jpg, image/png"
                                    className="hidden"
                                    {...form.register("image")} 
                                />
                            </FormLabel>
                            <FormMessage className="text-[#ED7878]">
                                {form.formState.errors.image?.message && (
                                    <div>
                                        {Array.isArray(form.formState.errors.image.message) ? (
                                            form.formState.errors.image.message.map((error, index) => (
                                                <div key={index}>{error}</div>
                                            ))
                                        ) : (
                                            <div>{form.formState.errors.image.message}</div>
                                        )}
                                    </div>
                                )}
                            </FormMessage>
                        </FormItem>

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