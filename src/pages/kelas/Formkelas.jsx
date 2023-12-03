import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  judul: z.string().nonempty("*Judul wajib di isi"),
  deskripsi: z.string().nonempty("*Deskripsi wajib di isi "),
  option: z.string().nonempty("*Kategori wajib di pilih "),
});

export default function FormKelas() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      judul: "",
      deskripsi: "",
      option: "",
    },
  });

  const onSubmit = (data) => {
    alert("Sukses Tambah Kelas");
    form.reset();
  };

  return (
    <main className="bg-[#FFFFFF]">
      <section className="mx-auto h-[650px] max-w-[1000px] rounded-lg border border-[#092C4C] p-4">
        <h1 className="mb-5 text-2xl font-bold text-[#092C4C]">Tambah Kelas</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 px-4"
          >
            <FormItem>
              <FormLabel className="ml-1 text-lg font-bold text-[#092C4C]">
                Judul
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Judul Kelas"
                  className="h-[40px] w-[850px] rounded-s border border-[#092C4C] bg-transparent px-3 py-4 text-black outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
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
                <textarea
                  placeholder="Deskripsi"
                  className="h-[175px] w-[850px] resize-none rounded-lg border border-[#092C4C] bg-transparent px-3 py-4 text-black outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
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
                <select
                  className="flex h-[40px] w-[850px] rounded-lg border border-[#092C4C] bg-transparent px-2 py-2 text-black outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
                  {...form.register("option")}
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>
                  <option value="uiux">UI/UX</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="flutter">Flutter</option>
                </select>
              </FormControl>
              <FormMessage className="text-[#ED7878]">
                {form.formState.errors.option?.message}
              </FormMessage>
            </FormItem>

            <div className="flex justify-between">
              <Button
                type="button"
                onClick={() => form.reset()}
                className="text-s ml-[45px] h-[40px] w-[150px] rounded-lg border border-[#092C4C] bg-[#FFFFFF] py-4 text-center font-bold text-[#092C4C] hover:bg-[#092C4C]/90 active:scale-95"
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="text-s mr-[80px] h-[40px] w-[150px] rounded-lg bg-[#092C4C] py-4 text-center font-bold text-white hover:bg-[#092C4C]/90 active:scale-95"
              >
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
}
