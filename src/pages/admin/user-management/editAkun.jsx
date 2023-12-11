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
import { getUserAccount, updateUserAccount } from "@/utils/apis/user";

export default function EditAkun() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const VALID_ROLE = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Instructor" },
    { id: 3, name: "Student" },
  ];
  

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const editAkunSchema = z
    .object({
      email: z.string().email({ message: "*Gunakan Email Yang Valid" }),
      role: z.number()
      .nullable()
      .refine((value) => value !== null, {
        message: "*Role wajib di pilih",
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
        role: userData.role.id,
      });
    }
  }, [userData, form]);

  const onSubmit = (data) => {
    Swal.fire({
      title: "Yakin kamu mau Simpan data ini?",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#092C4C",
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
      cancelButtonColor: "#F2994A",
    }).then((result) => {
      if (result.isConfirmed) {
        saveUserData(data);
      }
    });
  };

  const saveUserData = async (data) => {
    try {
      // Buat objek payload sesuai dengan struktur request yang diinginkan
      const payload = {
        id: id,
        email: data.email,
        password: data.password,
        role_id: data.role, // Sesuaikan dengan nilai yang sesuai
      };

      // Panggil fungsi untuk mengupdate data user
      await updateUserAccount(payload);

      Swal.fire({
        title: "Sukses Update Data",
        icon: "success",
        showConfirmButton: false,
        showCloseButton: true,
        timer: 2000,
      });

      // Redirect atau navigasi ke halaman lain setelah berhasil update
      navigate("/user-management");
    } catch (error) {
      console.error("Failed to update user data:", error);
      // Handle error, such as displaying an error message
    }
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
                        onValueChange={(value) => form.setValue("role", Number(value))}
                        value={form.watch("role") || ""}  // Gunakan string kosong jika nilainya null
                        defaultValue=""
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-lg border-black text-lg font-bold">
                            <SelectValue placeholder="Pilih Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {VALID_ROLE.map((role) => (
                            <SelectItem
                              value={role.id}
                              key={role.id}
                              className="text-lg font-bold hover:bg-slate-100"
                            >
                              {role.name}
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
              onClick={() => navigate("/user-management")} //TODO: GANTI HALAMAN TUJUAN
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
