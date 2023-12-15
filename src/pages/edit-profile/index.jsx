import React, { useEffect, useState } from "react";
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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/utils";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Swal from "sweetalert2";
import { getUserProfile, editUserProfile } from "@/utils/apis/user";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import moment from "moment";


const formSchema = z.object({
  first_name: z.string().nonempty("*Nama Lengkap wajib di isi"),
  last_name: z.optional(z.string()),
  date_birth: z.date({
    required_error: "*Tanggal Lahir wajib di isi",
  }),
  bio: z.optional(z.string()),
  gender: z.string().nonempty("*Gender wajib di isi"),
  phone_number: z.string().nonempty("*Email / No. Telepon wajib di isi"),
  city: z.string().nonempty("*Domisili wajib di isi"),
  address: z.optional(z.string()),
  job: z.string().nonempty("*Pekerjaan wajib di isi"),
});

export default function EditProfile() {
  const id = localStorage.getItem("id");
  console.log(typeof id)
  const [profileData, setProfileData] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      date_birth: "",
      bio: "",
      gender: "",
      phone_number: "",
      city: "",
      address: "",
      job: "",
    },
  });

  async function fetchData() {
    try {
      const result = await getUserProfile(id);
      console.log(result.data);
      setProfileData(result.data);
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  const onSubmit = (data) => {
    const [firstname, ...lastNameParts] = data.first_name.split(" ")
    const lastname = lastNameParts.join(" ")
    const requestData = {
      first_name: firstname,
      last_name: lastname,
      date_birth: data.date_birth.toISOString(),
      bio: profileData.bio,
      gender: data.gender,
      phone_number: data.phone_number,
      city: data.city,
      address: profileData.address,
      job: data.job,
    }
    Swal.fire({
      title: "Yakin kamu mau simpan data ini?",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#092C4C",
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
      cancelButtonColor: "#F2994A",
    }).then(async (result) =>{
      try {
        if(result.isConfirmed) {
          const response = await editUserProfile(id, requestData)
          console.log(response.status)
        if (response.code === 200) {
          Swal.fire({
            title: "Sukses Update Data",
            icon: "success",
            showConfirmButton: false,
            showCloseButton: true,
          });
          form.reset();
          fetchData()
        } else {
          Swal.fire({
            title: "Gagal Update Data",
            text: "Terjadi kesalahan saat menyimpan data.",
            icon: "error",
            showConfirmButton: true,
          });
        }
        }
      } catch (error) {
        console.log("Error", error)
      }
    })
  }


  return (
    <div>
      <EditProfileLayout>
        <div className="rounded-xl border border-[#f2994a] p-5 font-poppins ">
          <div className="flex items-center gap-5">
            <div className="h-20 w-20">
              <img
                className="rounded-full"
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                alt=""
              />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {profileData.first_name} {profileData.last_name}
              </p>
              <p>Online</p>
            </div>
          </div>

          <div className="mt-14">
            <p className="text-xl font-semibold">Tanggal Lahir</p>
            {profileData.date_birth &&
             format(
              parseISO(profileData.date_birth+"Z"), // Mengonversi ke objek Date
              'dd-MM-yyyy'
            )}
          </div>

          <div className="mt-14">
            <p className="text-xl font-semibold">Email / No. Telepon</p>
            <p className="font-normal">
              {profileData.email} / {profileData.phone_number}
            </p>
          </div>

          <div className="mt-14">
            <p className="text-xl font-semibold">Profesi</p>
            <p className="font-normal">{profileData.job}</p>
          </div>

          <div className="mt-14">
            <p className="text-xl font-semibold">Domisili</p>
            <p className="font-normal">{profileData.city}</p>
          </div>

          <div className="mt-14">
            <p className="text-xl font-semibold">Gender</p>
            <p className="font-normal">{profileData.gender}</p>
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
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-2xl font-semibold">
                        Nama Lengkap
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="rounded-xl border border-[#092C4C] border-opacity-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-48">
                  <FormField
                    control={form.control}
                    name="date_birth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-2xl font-semibold">
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

                  <FormField
                    control={form.control}
                    name="job"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-2xl font-semibold">
                          Profesi
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="rounded-xl border border-[#092C4C] border-opacity-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-48">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-2xl font-semibold">
                          Gender
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="rounded-xl border border-[#092C4C] border-opacity-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-2xl font-semibold">
                          Domisili
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="rounded-xl border border-[#092C4C] border-opacity-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-2xl font-semibold">
                        Email / No. Telepon
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="rounded-xl border border-[#092C4C] border-opacity-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel className="text-2xl font-semibold">
                    Kelas Yang Diajar
                  </FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-3 justify-items-center gap-y-3">
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

                <Button className="h-16 w-72 rounded-xl text-2xl font-normal">
                  Simpan Perubahan
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </EditProfileLayout>
    </div>
  );
}
