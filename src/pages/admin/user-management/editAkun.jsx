import { React, useState, useRef, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Swal from "sweetalert2";
import { EyeIcon, EyeOff } from "lucide-react";
import {
  ConfirmPasswordInputWithToggle,
  PasswordInputWithToggle,
} from "@/components/inputPassword";
import { useNavigate, useParams } from "react-router-dom";
import { getUserAccount } from "@/utils/apis/user";

export default function EditAkun() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const VALID_ROLE = ["Admin", "Instructor", "Student"];

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const editAkunSchema = z
    .object({
      email: z.string().email({ message: "*Gunakan Email Yang Valid" }),
      role: z.string().refine((value) => VALID_ROLE.includes(value), {
        message: "*Pilih Role Terlebih Dahulu",
      }),
      password: z
        .string()
        .min(1, { message: "*Isi Password Terlebih Dahulu" })
        .min(8, { message: "*Password Minimal 8 Karakter" }),
      confirmPassword: z
        .string()
        .min(1, { message: "*Isi Konfirmasi Password Terlebih Dahulu" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "*Password Tidak Sama",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(editAkunSchema),
    defaultValues: {
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserAccount(id);
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user account:", error);
        // Handle error, such as redirecting to an error page
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (userData) {
      // Set form values when userData is available
      form.reset({
        email: userData.email,
        role: userData.role,
      });
    }
  }, [userData, form]);


  const onSubmit = (data) => {
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
          timer: 2000,
        });
        // .then((result) => {
        //   if (result.isDismissed) {
        //     navigate("/kelas/manage-tugas");
        //   }
        // });
      }
    });
  };

  const onSave = (data) => {
    // Do something with the form values.
    // The values are already type-safe and validated based on your formSchema.
    console.log(data);
  };

  return (
    <div className="mb-4 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              {/* Inputan Email */}
              <div className="flex justify-between">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-xl font-bold">Email</FormLabel>
                      <FormControl>
                        <Input
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
                        <PasswordInputWithToggle ref={passwordRef} {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-4">
              {/* Inputan Role */}
              <div className="flex justify-between">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-xl font-bold">Role</FormLabel>
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
                          ref={confirmPasswordRef}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <Button
              className="h-16 w-52 border bg-[#ED7878] text-2xl font-bold text-white hover:bg-[#ED7878]"
              type="button"
              onClick={() => navigate("/")} //TODO: GANTI HALAMAN TUJUAN
            >
              Batal
            </Button>
            <Button className="h-16 w-64 text-2xl" type="submit">
              {" "}
              Simpan
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
