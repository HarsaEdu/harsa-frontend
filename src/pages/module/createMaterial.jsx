import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/utils/utils";

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
import Layout from "@/components/layout/Index"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Plus } from 'lucide-react';


const formSchema = z.object({
    section: z.string({
        required_error: "Section wajib di isi.",
    }),
    titleMateri: z.string({
        required_error: "judul materi wajib di isi.",
    }),
    video: z.string({
        required_error: "link video wajib di isi.",
    }).url({
        message: "Masukkan tautan video yang valid",
    }),
    materi: z.string({
        required_error: "link materi wajib di isi.",
    }).url({
        message: "Masukkan tautan materi yang valid",
    }),
    deadlineTugas: z.date({
        required_error: "set deadline wajib di isi.",
    }),
});

const CreateMaterial = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data) => {
        console.log("data", data);
    };

    return (
        <Layout>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 border rounded px-3 py-5">
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
                                <FormLabel className="text-[#092C4C]">Judul Materi</FormLabel>
                                <FormControl>
                                    <Input placeholder="Judul Materi" {...field} variant="bottom" />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="video"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#092C4C]">Link Video</FormLabel>
                                <FormControl>
                                    <Input placeholder="Link Video" {...field} variant="bottom" />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <div style={{ marginTop: "0.5rem" }}>
                        <a className="text-sm font-medium text-[#092C4C] hover:text-[#092C4C]/70 flex items-center" href="">Tambah Link video <Plus className="inline-block h-4" /></a>
                    </div>
                    <FormField
                        control={form.control}
                        name="materi"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#092C4C]">Materi</FormLabel>
                                <FormControl>
                                    <Input placeholder="Format PPT, Google Slide, PDF" {...field} variant="bottom" />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <div style={{ marginTop: "0.5rem" }}>
                        <a className="text-sm font-medium text-[#092C4C] hover:text-[#092C4C]/70 flex items-center" href="">Tambah Link Materi <Plus className="inline-block h-4" /></a>
                    </div>
                    <div>
                        <FormLabel className="text-[#092C4C]">Kuis</FormLabel>
                        <div style={{ marginTop: "0.5rem" }}>
                            <a className="text-sm font-medium text-[#092C4C] hover:text-[#092C4C]/70 flex items-center" href="">Tambah Kuis <Plus className="inline-block h-4" /></a>
                        </div>
                    </div>
                    <div>
                        <FormLabel className="text-[#092C4C]">Tugas</FormLabel>
                        <div style={{ marginTop: "0.5rem" }}>
                            <a className="text-sm font-medium text-[#092C4C] hover:text-[#092C4C]/70 flex items-center" href="">Tambah Tugas <Plus className="inline-block h-4" /></a>
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="deadlineTugas"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-[#092C4C]">Set Deadline Tugas</FormLabel>
                                <Popover avoidCollisions={false} side="bottom" align="center">
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                style={{ width: "275px" }}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Choose date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-white" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between">
                        <Button variant={"outline"} type="reset">Batal</Button>
                        <Button variant={"default"} type="submit">Simpan</Button>
                    </div>
                </form>
            </Form>
        </Layout>
    );
}
export default CreateMaterial

