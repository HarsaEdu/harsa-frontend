import React from "react";
import axios from "axios";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/utils";
import moment from "moment/moment";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
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
  const VALID_ROLE = ["Admin", "Instructor", "Student"];
  const currentYear = new Date().getFullYear()
  const roleMapping = {
    Admin: 1,
    Instructor: 2,
    Student: 3,
  };
  const navigate = useNavigate();

  const addUserSchema = z.object({
    email: z.string().min(1, {message: "*Isi Email Terlebih Dahulu"}).email({ message: "*format email salah, tambahkan karakter @" }),
    role: z.string().refine((value) => VALID_ROLE.includes(value), {
      message: "*Isi Role Terlebih Dahulu",
    }),
    firstName: z.string().min(1, { message: "*Isi Nama Depan Terlebih Dahulu" }),
    lastName: z.string().min(1, { message: "*Isi Nama Belakang Terlebih Dahulu" }),
    bio: z.string().min(1, { message: "*Isi Bio Terlebih Dahulu" }),
    dateBirth: z.date()
    .refine((value) => value !== null, {
      message: "*Isi Tanggal Lahir Terlebih Dahulu",
    })
    .refine((value) => {
      // Pastikan value adalah objek tanggal yang valid
      return !isNaN(value.getTime());
    }, {
      message: "*Isi Tanggal Lahir Terlebih Dahulu",
    }), // Use z.date() for date field
    phoneNumber: z.string().min(1, { message: "*Isi Nomer Telepon Terlebih Dahulu" }),
    gender: z.string().min(1, { message: "*Pilih Jenis Kelamin" }),
    hometown: z.string().min(1, { message: "*Isi Asal Kota Terlebih Dahulu" }),
    address: z.string().min(1, { message: "*Isi Alamat Terlebih Dahulu" }),
    profession: z.string().min(1, { message: "*Isi Pekerjaan Terlebih Dahulu" }),
    username: z.string().min(1, { message: "*Isi Username Terlebih Dahulu" }),
    password: z
        .string()
        .min(1, { message: "*Isi Password Terlebih Dahulu" })
        .min(8, { message: "*Password Minimal 8 Karakter" }),
    confirmPassword: z
        .string()
        .min(1, { message: "*Isi Konfirmasi Password Terlebih Dahulu" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "*Password Tidak Cocok, Harap Periksa Kembali",
      path: ["confirmPassword"],
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
      dateBirth: null,
      phoneNumber: "",
      gender: "",
      hometown: "",
      address: "",
      profession: "",
      username: "",
    },
  });

  const formatDateForAPI = (date) => {
    return date ? format(new Date(date), 'yyyy-MM-dd') : '';
  };

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("access_token");
      const formattedDate = formatDateForAPI(data.dateBirth);
      const role_id = roleMapping[data.role];

      // Kirim data ke backend menggunakan axios
      const response = await axios.post(
        'https://api.harsaedu.my.id/web/users',
        {
          email: data.email,
          username: data.username,
          password: data.password,
          first_name: data.firstName,
          last_name: data.lastName,
          address: data.address,
          phone_number: data.phoneNumber,
          role_id: role_id,
          gender: data.gender,
          bio: data.bio,
          city: data.hometown,
          date_birth: formattedDate,
          job: data.profession,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gantilah dengan cara Anda mendapatkan token
          },
        }
      );

      if (response.status === 201) {
        console.log('User added successfully:', response.data);
        Swal.fire({
          title: "Sukses Tambah User",
          icon: "success",
          showConfirmButton: false,
          showCloseButton: true,
        }).then(() => {
          navigate("/user-management");
        });
      } else {
        console.error('Failed to add user. Unexpected response:', response);
        Swal.fire({
          title: "Gagal Tambah User",
          icon: "error",
          showConfirmButton: false,
          showCloseButton: true,
        });
      }
    } catch (error) {
      console.error('Error adding user:', error);
      Swal.fire({
        title: "Gagal Tambah User",
        text: error.response.data.message,
        icon: "error",
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  };

  return (
    <Layout>
      <div className="container mb-10">
          <Breadcrumb />
          <section className="m-5  font-poppins space-y-10 border border-[#092C4C] p-10">
            <h1 className="text-3xl font-semibold">Tambah User</h1>
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
                            <FormLabel className="text-xl font-semibold">
                              Nama Depan
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="firstName"
                                placeholder="cth: John Doe"
                                {...field}
                                className="rounded-lg border-black text-lg font-semibold active:border-0"
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
                            <FormLabel className="text-xl font-semibold">
                              Nama Belakang
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="cth: Mack"
                                id="lastName"
                                {...field}
                                className="rounded-lg border-black text-lg font-semibold active:border-0"
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
                            <FormLabel className="text-xl font-semibold">Bio</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Student"
                                id="bio"
                                {...field}
                                className="rounded-lg border-black text-lg font-semibold active:border-0"
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
                            <FormLabel className="text-xl font-semibold">
                              Tanggal Lahir
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    type="button"
                                    className={`w-full border-black pl-3 text-left font-semibold ${
                                      !field.value && "text-muted-foreground"
                                    }`}
                                  >
                                    {field.value ? (
                                      format(new Date(field.value), "P")
                                    ) : (
                                      <span className="text-muted-foreground">
                                        MM/DD/YYYY
                                      </span>
                                    )}

                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                {console.log(field.value)}
                                <Calendar
                                  defaultMonth={field.value}
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  fromYear={1980}
                                  toYear={currentYear}
                                  disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                  className="bg-white"
                                  captionLayout="dropdown-buttons"
                                />
                              </PopoverContent>
                            </Popover>
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
                            <FormLabel className="text-xl font-semibold">
                              Nomor Telpon
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="08xxxxxxxxxx"
                                id="phone"
                                {...field}
                                className="rounded-lg border-black text-lg font-semibold active:border-0"
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
                            <FormLabel className="text-xl font-semibold">
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
                                        value="m"
                                        className="h-8 w-8"
                                      />
                                    </FormControl>
                                    <FormLabel className="text-xl font-semibold">
                                      Laki-laki
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem
                                        value="f"
                                        className="h-8 w-8"
                                      />
                                    </FormControl>
                                    <FormLabel className="text-xl font-semibold">
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
                            <FormLabel className="text-xl font-semibold">
                              Asal Kota
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Broklyn"
                                id="hometown"
                                {...field}
                                className="rounded-lg border-black text-lg font-semibold active:border-0"
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
                            <FormLabel className="text-xl font-semibold">
                              Alamat
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="ST petter street, 98"
                                id="address"
                                {...field}
                                className="rounded-lg border-black text-lg font-semibold active:border-0"
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
                            <FormLabel className="text-xl font-semibold">
                              Pekerjaan
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Student"
                                id="profession"
                                {...field}
                                className="rounded-lg border-black text-lg font-semibold active:border-0"
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
                            <FormLabel className="text-xl font-semibold">
                              Role
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="rounded-lg border-black text-lg font-semibold">
                                  <SelectValue placeholder="Pilih Role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {VALID_ROLE.map((item, index) => (
                                  <SelectItem
                                    value={item}
                                    key={index}
                                    className="text-lg font-semibold hover:bg-slate-100"
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
                            <FormLabel className="text-xl font-semibold">
                              Username
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="johnDoe@xyz"
                                id="username"
                                {...field}
                                className="rounded-lg border-black text-lg font-semibold active:border-0"
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
                            <FormLabel className="text-xl font-semibold">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="johnDoe@xyz"
                                id="email"
                                {...field}
                                className="rounded-lg border-black text-lg font-semibold active:border-0"
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
                            <FormLabel className="text-xl font-semibold">
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
                            <FormLabel className="text-xl font-semibold">
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
                    className="h-16 w-52 border bg-[#ED7878] text-2xl font-semibold text-white hover:bg-[#ED7878]"
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
      </div>
    </Layout>
  );
}
