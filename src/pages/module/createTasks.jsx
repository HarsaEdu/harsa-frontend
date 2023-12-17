import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Index";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { createSubmission } from "@/utils/apis/submission";

const formSchema = z.object({
  title: z.string({
    required_error: "*Judul Tugas wajib di isi",
  }),
  content: z.string({
    required_error: "*Deskripsi Tugas wajib di isi",
  }),
});

const createTasks = () => {
  const params = useParams();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data) {
    try {
      await createSubmission(data, params.idSection);

      Swal.fire({
        icon: "success",
        title: "Sukses Tambah Tugas",
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
      }).then((result) => {
        if (result.isDismissed) {
          navigate(-1);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }

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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="title"
                        placeholder="Judul Tugas"
                        {...field}
                        variant="bottom"
                        className="mb-5 rounded-none border-0 border-b border-gray-500 active:border-0"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        id="content"
                        placeholder="Deskripsi Tugas"
                        {...field}
                        variant="bottom"
                        className="rounded-none border-0 border-b border-gray-500 active:border-0"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Link to={`/kelas/manage-kelas/${params.id}/manage-module/${params.idSection}/manage-tugas/${params.idSection}`}>
                  <Button
                    id="cancelButtonTugas"
                    className="border-black"
                    variant={"outline"}
                    type="reset"
                  >
                    Batal
                  </Button>
                </Link>
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
