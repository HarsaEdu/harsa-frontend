/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "@/components/layout/Index";
import Breadcrumb from "@/components/breadcrumb";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Swal from "sweetalert2";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  judulMateri: z.string({
    required_error: "*Judul Tugas wajib di isi",
  }),
  deskripsiMateri: z.string({
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
              className="space-y-8 rounded-md border-2 border-slate-300 px-3 py-5"
            >
              <FormField
                control={form.control}
                name="judulMateri"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Judul Tugas"
                        {...field}
                        variant="bottom"
                        className="mb-5 border-slate-300 bg-transparent"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deskripsiMateri"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Deskripsi Tugas"
                        {...field}
                        variant="bottom"
                        className="mb-5 border-slate-300 bg-transparent"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button
                  className="border-black"
                  variant={"outline"}
                  type="reset"
                >
                  <Link to="/kelas">Batal</Link>
                </Button>
                <Button variant={"default"} type="submit">
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
