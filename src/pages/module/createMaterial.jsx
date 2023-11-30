import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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

const formSchema = z.object({
    section: z.string({
        required_error: "Section wajib di isi.",
    }),
    titleMateri: z.string({
        required_error: "judul materi wajib di isi.",
    }),
    materi: z
        .string({
            required_error: "link materi wajib di isi.",
        })
        .url({
            message: "Masukkan tautan materi yang valid",
        }),
});

const CreateMaterial = () => {
    const [materialType, setMaterialType] = useState("");

    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data) => {
        console.log("data", data);
        Swal.fire({
            icon: "success",
            title: "Sukses Tambah Module",
            showConfirmButton: false,
            showCloseButton: true,
            timer: 3000,
        });
    };

    return (
        <Layout>
            <div className="container mb-10 font-poppins">
            <Breadcrumb />
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 rounded border-2 px-3 py-5 mt-5 font-semibold"
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
                            name="titleMateri"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-poppins font-semibold text-[#092C4C]">Judul Materi</FormLabel>
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
                            <FormLabel className="font-poppins font-semibold text-[#092C4C]">Materi</FormLabel>
                            {materialType === "video" || (form.formState.errors.materi && materialType === "") ? (
                                <FormField
                                    control={form.control}
                                    name="materi"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Link Video"
                                                    {...field}
                                                    variant="bottom"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            ) : null}

                            {materialType === "slide" && (
                                <FormField
                                    control={form.control}
                                    name="materi"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Format PPT, Google Slide, PDF"
                                                    {...field}
                                                    variant="bottom"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <div style={{ marginTop: "0.5rem" }}>
                                <Dialog className="">
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="link"
                                            className="flex h-fit items-center p-0 text-sm text-[#092C4C] hover:text-[#092C4C]/70 font-poppins font-semibold "
                                            href=""
                                        >
                                            Tambah Link Materi <Plus className="inline-block h-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[361px]">
                                        <DialogHeader className={"items-center	"}>
                                            <DialogTitle className="font-poppins text-[#092C4C] font-bold">Pilih Tipe Materi</DialogTitle>
                                        </DialogHeader>
                                        <RadioGroup
                                            className="flex flex-row justify-around"
                                            defaultValue={materialType}
                                            onValueChange={(value) => {
                                                setMaterialType(value);
                                            }}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <DialogClose>
                                                    <RadioGroupItem value="slide" id="slide" />
                                                    <Label className="text-lg ms-2" htmlFor="slide">Slide</Label>
                                                </DialogClose>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <DialogClose>
                                                    <RadioGroupItem value="video" id="video" />
                                                    <Label className="text-lg ms-2" htmlFor="video">Video</Label>
                                                </DialogClose>
                                            </div>
                                        </RadioGroup>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>

                        <div>
                            <FormLabel className="font-poppins font-semibold text-[#092C4C]">Kuis</FormLabel>
                            <div style={{ marginTop: "0.5rem" }}>
                                <Link className="flex items-center text-sm text-[#092C4C] hover:text-[#092C4C]/70 font-poppins font-semibold" to='/kelas/tambah-kuis'>
                                    Tambah Kuis <Plus className="inline-block h-4" />
                                </Link>
                            </div>
                        </div>
                        <div>
                            <FormLabel className="font-poppins font-semibold text-[#092C4C]">Tugas</FormLabel>
                            <div style={{ marginTop: "0.5rem" }}>
                                <a
                                    className="flex items-center text-sm text-[#092C4C] hover:text-[#092C4C]/70 font-poppins font-semibold "
                                    href=""
                                >
                                    Tambah Tugas <Plus className="inline-block h-4" />
                                </a>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <Button variant={"outline"} type="reset">
                                Batal
                            </Button>
                            <Button variant={"default"} type="submit">
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
