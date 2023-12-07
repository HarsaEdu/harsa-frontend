import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Breadcrumb from "@/components/breadcrumb";
import Layout from "@/components/layout/Index";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ConfirmPasswordInputWithToggle,
  PasswordInputWithToggle,
} from "@/components/inputPassword";

export default function AddUser() {
  const VALID_ROLE = ["Customer", "Instructor"];
  const navigate = useNavigate();

  const addUserSchema = z.object({
    email: z.string().email({ message: "*Gunakan Email Yang Valid" }),
    role: z.string().refine((value) => VALID_ROLE.includes(value), {
      message: "*Pilih Role Terlebih Dahulu",
    }),
    password: z.string().min(8, { message: "*Password Minimal 8 Karakter" }),
    confirmPassword: z.string(),
    firstName: z.string().min(1, { message: "*Masukkan Nama Depan" }),
    lastName: z.string().min(1, { message: "*Masukkan Nama Belakang" }),
    bio: z.string().min(1, { message: "*Masukkan Bio" }),
    dateBirth: z.string().min(1, { message: "*Masukkan Tanggal Lahir" }), // Use z.date() for date field
    phoneNumber: z.string().min(1, { message: "*Masukkan Nomor Telpon" }),
    gender: z.string().min(1, { message: "*Pilih Gender" }),
    hometown: z.string().min(1, { message: "*Masukkan Asal Kota" }),
    address: z.string().min(1, { message: "*Masukkan Alamat" }),
    profession: z.string().min(1, { message: "*Masukkan Pekerjaan" }),
    username: z.string().min(1, { message: "*Masukkan Username" }),
  });

  const form = useForm({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      bio: "",
      dateBirth: "",
      phoneNumber: "",
      gender: "",
      hometown: "",
      address: "",
      profession: "",
      username: "",
    },
  });

  const onSubmit = async (data) => {
    const result = await Swal.fire({
      title: "Yakin kamu mau Tambah User dengan data ini?",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#092C4C",
      confirmButtonText: "Ya, Tambah User",
      cancelButtonText: "Batal",
      cancelButtonColor: "#F2994A",
    });

    if (result.isConfirmed) {
      onSave(data);
      Swal.fire({
        title: "Sukses Tambah User",
        icon: "success",
        showConfirmButton: false,
        showCloseButton: true,
        timer: 2000,
      });
    }
  };

  const onSave = (data) => {
    // Do something with the form values.
    // The values are already type-safe and validated based on your addUserSchema.
    console.log(data);
    // Add logic to save user data (e.g., send to backend)
  };

  const userRole = "admin";

  return (
    <Layout userRole={userRole}>
      <Breadcrumb />
      <section className="m-5 space-y-10 border border-[#092C4C] p-10">
        <h1 className="text-3xl font-bold">Tambah User</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <div className="grid grid-cols-2 gap-10">
              <section className="space-y-10">
                {/* Inputan First Name */}
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xl font-bold">
                          Nama Depan
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="firstName"
                            placeholder="cth: John Doe"
                            {...field}
                            className="rounded-lg border-black text-lg font-bold active:border-0"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Inputan Last Name */}
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xl font-bold">
                          Nama Belakang
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="cth: Mack"
                            id="lastName"
                            {...field}
                            className="rounded-lg border-black text-lg font-bold active:border-0"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Inputan Bio */}
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xl font-bold">Bio</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Student"
                            id="bio"
                            {...field}
                            className="rounded-lg border-black text-lg font-bold active:border-0"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Inputan Tanggal Lahir */}
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="dateBirth"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xl font-bold">
                          Tanggal Lahir
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="12/12/2001"
                            id="dateBirth"
                            {...field}
                            className="rounded-lg border-black text-lg font-bold active:border-0"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Inputan Nomor Telpon */}
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xl font-bold">
                          Nomor Telpon
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="08xxxxxxxxxx"
                            id="phone"
                            {...field}
                            className="rounded-lg border-black text-lg font-bold active:border-0"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Inputan Gender */}
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xl font-bold">
                          Gender
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex space-x-5">
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="male"
                                    className="h-8 w-8"
                                  />
                                </FormControl>
                                <FormLabel className="text-xl font-bold">
                                  Laki-laki
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="female"
                                    className="h-8 w-8"
                                  />
                                </FormControl>
                                <FormLabel className="text-xl font-bold">
                                  Perempuan
                                </FormLabel>
                              </FormItem>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Inputan Asal Kota */}
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="hometown"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xl font-bold">
                          Asal Kota
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Broklyn"
                            id="hometown"
                            {...field}
                            className="rounded-lg border-black text-lg font-bold active:border-0"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <section className="space-y-10">
                {/* Inputan Alamat */}
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xl font-bold">
                          Alamat
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ST petter street, 98"
                            id="address"
                            {...field}
                            className="rounded-lg border-black text-lg font-bold active:border-0"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Inputan Pekerjaan */}
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xl font-bold">
                          Pekerjaan
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Student"
                            id="profession"
                            {...field}
                            className="rounded-lg border-black text-lg font-bold active:border-0"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Inputan Role */}
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xl font-bold">
                          Role
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="rounded-lg border-black text-lg font-bold">
                              <SelectValue placeholder="Pilih Role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {VALID_ROLE.map((item, index) => (
                              <SelectItem
                                value={item}
                                key={index}
                                className="text-lg font-bold hover:bg-slate-100"
                              >
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Inputan Username */}
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xl font-bold">
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="johnDoe@xyz"
                            id="username"
                            {...field}
                            className="rounded-lg border-black text-lg font-bold active:border-0"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Inputan Email */}
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xl font-bold">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="johnDoe@xyz"
                            id="email"
                            {...field}
                            className="rounded-lg border-black text-lg font-bold active:border-0"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Inputan Password */}
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xl font-bold">
                          Password
                        </FormLabel>
                        <FormControl>
                          <PasswordInputWithToggle
                            {...field}
                            placeholder="8 Character"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Inputan Confirm Password */}
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xl font-bold">
                          Konfirmasi Password
                        </FormLabel>
                        <FormControl>
                          <ConfirmPasswordInputWithToggle
                            {...field}
                            placeholder="Repeat it"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </section>
            </div>

            <section className="flex justify-between">
              <Button
                className="h-16 w-52 border bg-[#ED7878] text-2xl font-bold text-white hover:bg-[#ED7878]"
                type="button"
                onClick={() => navigate("/user-management")}
              >
                Batal
              </Button>
              <Button className="h-16 w-64 text-2xl" type="submit">
                Tambah
              </Button>
            </section>
          </form>
        </Form>
      </section>
    </Layout>
  );
}
