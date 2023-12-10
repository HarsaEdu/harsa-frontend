import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Index";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Breadcrumb from "@/components/breadcrumb";
import axios from "axios";
import { createSection } from "@/utils/apis/modules/api";

const formSchema = z.object({
    section: z.string({
        required_error: "Section wajib di isi.",
    }),
    materialTitle: z.string({
        required_error: "judul materi wajib di isi.",
    }),
});

const CreateMaterial = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [countMaterial, setCountMaterial] = useState(0);
    const [materialType, setMaterialType] = useState([]);
    const [subModules, setSubModules] = useState([]);

    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const addMaterial = () => {
        let newMaterial = [];
        form.getValues("material").map((_, index) => {
            newMaterial.push({
                title: form.getValues("materialTitle"),
                type: materialType[index],
                content_url: form.getValues(`material[${index}]`),
            });
        });
        setSubModules([...newMaterial]);
    };

    const onSubmit = async (data) => {
        if (materialType.length > 0) {
            form.clearErrors("material");
            const newData = {
                title: data.section,
                modules: {
                    title: data.materialTitle,
                    description: "lorem ipsum",
                    sub_modules: subModules,
                },
            };
            await createSection(params.id, newData);

            Swal.fire({
                icon: "success",
                title: "Sukses Tambah Module",
                showConfirmButton: false,
                showCloseButton: true,
                timer: 3000,
            }).then(() => {
                navigate("/kelas/manage-kelas/" + params.id);
            });
        } else {
            form.setError("material", {
                type: "manual",
                message: "Minimal satu link materi wajib diisi.",
            });
        }
    };

    return (
        <Layout>
            <div className="container mb-10 font-poppins">
                <Breadcrumb />
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="my-5 space-y-8 rounded border-2 px-3 py-5 font-semibold"
                    >
                        <FormField
                            control={form.control}
                            name="section"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Section" {...field} variant="bottom" />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="materialTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-poppins font-semibold text-[#092C4C]">
                                        Judul Materi
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Judul Materi"
                                            {...field}
                                            variant="bottom"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <div>
                            {Array.from({ length: countMaterial }).map((_, index) => (
                                <div key={index} className="mb-2">
                                    <FormLabel className="font-poppins font-semibold text-[#092C4C]">
                                        Materi {index + 1}
                                    </FormLabel>
                                    {materialType[index] === "video" ||
                                        (form.formState.errors.material &&
                                            materialType[index] === "") ? (
                                        <FormField
                                            control={form.control}
                                            name={`material[${index}]`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Link Video"
                                                            {...field}
                                                            variant="bottom"
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    ) : null}

                                    {materialType[index] === "slide" && (
                                        <FormField
                                            control={form.control}
                                            name={`material[${index}]`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Format PPT, Google Slide, PDF"
                                                            {...field}
                                                            variant="bottom"
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                </div>
                            ))}

                            <div style={{ marginTop: "0.5rem" }}>
                                <Dialog className="">
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="link"
                                            className="flex h-fit items-center p-0 font-poppins text-sm font-semibold text-[#092C4C] hover:text-[#092C4C]/70 "
                                            href=""
                                        >
                                            Tambah Link Materi <Plus className="inline-block h-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[361px]">
                                        <DialogHeader className={"items-center"}>
                                            <DialogTitle className="font-poppins font-bold text-[#092C4C]">
                                                Pilih Tipe Materi
                                            </DialogTitle>
                                        </DialogHeader>
                                        <RadioGroup
                                            className="flex flex-row justify-around"
                                            defaultValue={materialType}
                                            onValueChange={(value) => {
                                                setMaterialType([...materialType, value]);
                                                setCountMaterial((prev) => prev + 1);
                                            }}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <DialogClose>
                                                    <RadioGroupItem value="slide" id="slide" />
                                                    <Label className="ms-2 text-lg" htmlFor="slide">
                                                        Slide
                                                    </Label>
                                                </DialogClose>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <DialogClose>
                                                    <RadioGroupItem value="video" id="video" />
                                                    <Label className="ms-2 text-lg" htmlFor="video">
                                                        Video
                                                    </Label>
                                                </DialogClose>
                                            </div>
                                        </RadioGroup>
                                    </DialogContent>
                                </Dialog>
                                {form.formState.errors.material && (
                                    <FormMessage className="mt-2 text-red-500">
                                        {form.formState.errors.material.message}
                                    </FormMessage>
                                )}
                            </div>
                        </div>

                        <div>
                            <FormLabel className="font-poppins font-semibold text-[#092C4C]">
                                Kuis
                            </FormLabel>
                            <div style={{ marginTop: "0.5rem" }}>
                                <Link
                                    className="flex items-center font-poppins text-sm font-semibold text-[#092C4C] hover:text-[#092C4C]/70"
                                    to="/kelas/tambah-kuis"
                                >
                                    Tambah Kuis <Plus className="inline-block h-4" />
                                </Link>
                            </div>
                        </div>
                        <div>
                            <FormLabel className="font-poppins font-semibold text-[#092C4C]">
                                Tugas
                            </FormLabel>
                            <div style={{ marginTop: "0.5rem" }}>
                                <a
                                    className="flex items-center font-poppins text-sm font-semibold text-[#092C4C] hover:text-[#092C4C]/70 "
                                    href=""
                                >
                                    Tambah Tugas <Plus className="inline-block h-4" />
                                </a>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <Button
                                variant={"outline"}
                                type="reset"
                                onClick={() => {
                                    navigate("/kelas/manage-kelas/" + params.id);
                                }}
                            >
                                Batal
                            </Button>
                            <Button
                                variant={"default"}
                                type="submit"
                                onClick={() => {
                                    addMaterial();
                                }}
                            >
                                Simpan
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Layout>
    );
};
export default CreateMaterial;
