/* eslint-disable react-hooks/rules-of-hooks */
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Index";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  judulTugas: z.string({
    required_error: "*Judul Tugas wajib di isi",
  }),
  deskripsiTugas: z.string({
    required_error: "*Deskripsi Tugas wajib di isi",
  }),
});

const createTasks = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log("data", data);
    Swal.fire({
      icon: "success",
      title: "Sukses Tambah Tugas",
      showConfirmButton: false,
      showCloseButton: true,
      timer: 3000,
    });
  };

  return (
    <Layout>
      <div className="container">
        <Breadcrumb />
        <div className="my-10 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="px-3 py-5 space-y-8 border-2 rounded-md border-slate-300"
            >
              <FormField
                control={form.control}
                name="judulTugas"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="judulTugas"
                        placeholder="Judul Tugas"
                        {...field}
                        variant="bottom"
                        className="mb-5 border-0 border-b rounded-none border-slate-300 active:border-0"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deskripsiTugas"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        id="deskripsiTugas"
                        placeholder="Deskripsi Tugas"
                        {...field}
                        variant="bottom"
                        className="border-0 border-b rounded-none border-slate-300 active:border-0"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button
                  id="cancelButtonTugas"
                  className="border-black"
                  variant={"outline"}
                  type="reset"
                >
                  <Link to="/kelas">Batal</Link>
                </Button>
                <Button
                  id="acceptButtonTugas"
                  variant={"default"}
                  type="submit"
                >
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

export default createTasks;
