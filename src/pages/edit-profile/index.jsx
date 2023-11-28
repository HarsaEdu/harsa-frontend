import React from "react";
import EditProfileLayout from "@/components/layout/EditProfileLayout";
import { CardEditProfile } from "@/components/card/CardEditProfile";
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
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Swal from "sweetalert2";

const formSchema = z.object({
  fullname: z.string().nonempty("*Nama Lengkap wajib di isi"),
  birthdate: z.string().nonempty("*Tanggal Lahir wajib di isi"),
  job: z.string().nonempty("*Pekerjaan wajib di isi"),
  gender: z.string().nonempty("*Gender wajib di isi"),
  domisili: z.string().nonempty("*Domisili wajib di isi"),
  email: z.string().nonempty("*Email / No. Telepon wajib di isi"),
});

export default function EditProfile() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      birthdate: "",
      job: "",
      gender: "",
      domisili: "",
      email: "",
    },
  });

  const onSubmit = (data) => {
    Swal.fire({
      width: "500px",
      reverseButtons: true,
      icon: "question",
      title: "Yakin kamu mau menyimpan perubahan ini?",
      showCancelButton: true,
      confirmButtonColor: "#092C4C",
      cancelButtonColor: "#F2994A",
      confirmButtonText: "Ya, Simpan"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          width: "400px",
          icon: "success",
          title: "Sukses Simpan Materi",
          showConfirmButton: false,
          showCloseButton: true,
        });
      }
    });
    
    form.reset()
  };

  return (
    <div>
      <EditProfileLayout>
        <div className="rounded-xl border border-[#f2994a]  p-5 ">
          <div className="flex items-center gap-5">
            <div className="h-20 w-20">
              <img
                className="rounded-full"
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                alt=""
              />
            </div>
            <div>
              <p className="text-2xl font-bold">Joko Joestar</p>
              <p>Online</p>
            </div>
          </div>

          <div className="mt-14">
            <p className="text-xl font-semibold">Tanggal Lahir</p>
            <p className="font-normal">4 Juni 1998</p>
          </div>

          <div className="mt-14">
            <p className="text-xl font-semibold">Email / No. Telepon</p>
            <p className="font-normal">jojoko@gmail.com</p>
          </div>

          <div className="mt-14">
            <p className="text-xl font-semibold">Profesi</p>
            <p className="font-normal">Guru Seni Budaya</p>
          </div>

          <div className="mt-14">
            <p className="text-xl font-semibold">Domisili</p>
            <p className="font-normal">San Andreas</p>
          </div>

          <div className="mt-14">
            <p className="text-xl font-semibold">Gender</p>
            <p className="font-normal">Pria</p>
          </div>

          <div className="mt-14">
            <p className="text-xl font-semibold">Kelas yang diajar</p>
            <div className="mt-5 flex flex-wrap gap-5">
              <CardEditProfile title="Becoming Professional UI/UX" />
              <CardEditProfile title="Pengenalan Dasar Sistem Informasi" />
              <CardEditProfile title="Design Grafis Untuk Pemula" />
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-[#f2994a] p-5">
          <div>
            <p className="text-3xl font-bold">Edit Profile</p>
          </div>
          <div className="mt-14">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormItem>
                  <FormLabel className="text-2xl font-semibold">
                    Nama Lengkap
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="rounded-xl border border-[#092C4C] border-opacity-50"
                      {...form.register("fullname")}
                    />
                  </FormControl>
                  <FormMessage className="text-[#ED7878]">
                    {form.formState.errors.fullname?.message}
                  </FormMessage>
                </FormItem>

                <div className="grid grid-cols-2 gap-48">
                  <FormItem>
                    <FormLabel className="text-2xl font-semibold">
                      Tanggal Lahir
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="rounded-xl border border-[#092C4C] border-opacity-50"
                        {...form.register("birthdate")}
                      />
                    </FormControl>
                    <FormMessage className="text-[#ED7878]">
                      {form.formState.errors.birthdate?.message}
                    </FormMessage>
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-2xl font-semibold">
                      Profesi
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="rounded-xl border border-[#092C4C] border-opacity-50"
                        {...form.register("job")}
                      />
                    </FormControl>
                    <FormMessage className="text-[#ED7878]">
                      {form.formState.errors.job?.message}
                    </FormMessage>
                  </FormItem>
                </div>

                <div className="grid grid-cols-2 gap-48">
                  <FormItem>
                    <FormLabel className="text-2xl font-semibold">
                      Gender
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="rounded-xl border border-[#092C4C] border-opacity-50"
                        {...form.register("gender")}
                      />
                    </FormControl>
                    <FormMessage className="text-[#ED7878]">
                      {form.formState.errors.gender?.message}
                    </FormMessage>
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-2xl font-semibold">
                      Domisili
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="rounded-xl border border-[#092C4C] border-opacity-50"
                        {...form.register("domisili")}
                      />
                    </FormControl>
                    <FormMessage className="text-[#ED7878]">
                      {form.formState.errors.domisili?.message}
                    </FormMessage>
                  </FormItem>
                </div>

                <FormItem>
                  <FormLabel className="text-2xl font-semibold">
                    Email / No. Telepon
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="rounded-xl border border-[#092C4C] border-opacity-50"
                      {...form.register("email")}
                    />
                  </FormControl>
                  <FormMessage className="text-[#ED7878]">
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>

                <FormItem>
                  <FormLabel className="text-2xl font-semibold">
                    Kelas Yang Diajar
                  </FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-3 justify-items-center">
                      <CardEditProfile title="Becoming Professional UI/UX" />
                      <CardEditProfile title="Pengenalan Dasar Sistem Informasi" />
                      <CardEditProfile title="Design Grafis Untuk Pemula" />
                      <CardEditProfile title="Becoming Professional UI/UX" />
                      <CardEditProfile title="Becoming Professional UI/UX" />
                      <CardEditProfile title="Pengenalan Dasar Sistem Informasi" />
                      <CardEditProfile title="Design Grafis Untuk Pemula" />
                      <CardEditProfile title="Becoming Professional UI/UX" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[#ED7878]">
                    {form.formState.errors.domisili?.message}
                  </FormMessage>
                </FormItem>

              <Button className="w-72 h-16 rounded-xl font-normal text-2xl">Simpan Perubahan</Button>
              </form>
            </Form>
          </div>
        </div>
      </EditProfileLayout>
    </div>
  );
}
