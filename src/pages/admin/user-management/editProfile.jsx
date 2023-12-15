import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/utils";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Swal from "sweetalert2";
import moment from "moment/moment";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const VALID_GENDER = ["male", "female"];
  const editProfileSchema = z.object({
    firstName: z
      .string()
      .min(1, { message: "*Isi Nama Depan Terlebih Dahulu" }),
    lastName: z
      .string()
      .min(1, { message: "*Isi Nama Belakang Terlebih Dahulu" }),
    bio: z.string().min(1, { message: "*Isi Bio Terlebih Dahulu" }),
    dateBirth: z.date({
      required_error: "*Isi Tanggal Lahir Terlebih Dahulu",
    }),
    phoneNumber: z
      .string()
      .min(1, { message: "*Isi Nomer Telepon Terlebih Dahulu" }),
    gender: z.string().min(1, { message: "*Pilih Gender" }),
    hometown: z.string().min(1, { message: "*Isi Asal Kota Terlebih Dahulu" }),
    profession: z
      .string()
      .min(1, { message: "*Isi Pekerjaan Terlebih Dahulu" }),
    addres: z.string().min(1, { message: "*Isi Alamat Terlebih Dahulu" }),
  });
  
  const form = useForm({
    resolver: zodResolver(editProfileSchema),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const response = await axios.get(
          `https://api.harsaedu.my.id/web/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("refresh_token")}`, // Gantilah dengan cara Anda mendapatkan token
              'Content-Type': 'application/json',
            },
          }
        );
        const userData = response.data.data;
        form.reset({
          firstName: userData.first_name,
          lastName: userData.last_name,
          bio: userData.bio,
          dateBirth: parseISO(userData.date_birth),
          phoneNumber: userData.phone_number,
          gender: userData.gender,
          hometown: userData.city,
          profession: userData.job,
          addres: userData.address,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [form.reset]);

  const onSubmit = (data) => {
    console.log(data)
    Swal.fire({
      title: "Yakin kamu mau  Simpan  data ini?",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#092C4C",
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
      cancelButtonColor: "#F2994A",
    }).then((result) => {
      if (result.isConfirmed) {
        onSave(data);
        Swal.fire({
          title: "Sukses Update Data",
          icon: "success",
          showConfirmButton: false,
          showCloseButton: true,
        });
        // .then((result) => {
        //   if (result.isDismissed) {
        //     navigate("/kelas/manage-tugas"); //TODO: GANTI HALAMAN TUJUAN
        //   }
        // });
      }
    });
  };

  const onSave = async (data) => {
    try {
      const token = localStorage.getItem("refresh_token"); // Ganti dengan cara Anda mendapatkan token
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.put(
        `https://api.harsaedu.my.id/web/users/profile/${id}`,
        {
          first_name: data.firstName,
          last_name: data.lastName,
          date_birth: format(data.dateBirth, "yyyy-MM-dd'T'HH:mm:ssXXX"),
          bio: data.bio,
          gender: data.gender,
          phone_number: data.phoneNumber,
          city: data.hometown,
          address: data.addres,
          job: data.profession,
        }, {
          headers,
        }
      );

      if (response.data.code === 200) {
        Swal.fire({
          title: "Sukses Update Data",
          icon: "success",
          showConfirmButton: false,
          showCloseButton: true,
        }).then(() => {
          navigate("/user-management"); //TODO: GANTI HALAMAN TUJUAN
        });
      } else {
        // Handle error response
        Swal.fire({
          title: "Gagal Update Data",
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: "#ED7878",
        });
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="mb-4 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              {/* Inputan Nama Depan */}
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
              {/* Inputan Nomor Telepon */}
              <div className="flex justify-between">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-xl font-bold">
                        Nomor Telepon
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
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
            </div>
            <div className="space-y-4">
              {/* Inputan Nama Belakang */}
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
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              type="button"
                              className={cn(
                                "w-full border-black pl-3 text-left font-bold",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "P")
                              ) : (
                                <span>{moment().format("L")}</span>
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
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            className="bg-white"
                          />
                        </PopoverContent>
                      </Popover>
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
                          value={form.watch("gender") || ""}  // Gunakan string kosong jika nilainya null
                          defaultValue=""
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
                              <FormLabel className="text-xl font-bold">
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
            </div>
          </div>
          <div className="mt-8">
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="addres"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-xl font-bold">Alamat</FormLabel>
                    <FormControl>
                      <Textarea
                        id="address"
                        {...field}
                        className="rounded-lg border border-black text-xl font-bold"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <Button
              className="h-16 w-52 border bg-[#ED7878] text-2xl font-bold text-white hover:bg-[#ED7878]"
              type="button"
              onClick={() => navigate("/user-management")}
            >
              Batal
            </Button>
            <Button 
            id="saveButtonUser" 
            className="h-16 w-64 text-2xl" 
            type="submit">
              Simpan
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
