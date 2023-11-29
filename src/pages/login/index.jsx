import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().nonempty("*Email wajib di isi"),
  password: z.string().nonempty("*Password wajib di isi"),
});

export default function Login() {
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://api.harsaedu.my.id/web/auth/login",
        {
          email: data.email,
          password: data.password,
        },
      );
      if (response.status === 200) {
        const { access_token } = response.data.data;
        const cookies = new Cookies();
        cookies.set("authToken", access_token, { path: "/" });
        navigate("/dashboard");
      }
    } catch (error) {
      form.setError("email", {
        type: "manual",
        message: "*Email yang Anda masukkan tidak terdaftar",
      });
      form.setError("password", {
        type: "manual",
        message: "*Password yang Anda masukkan salah",
      });
      // console.error("An error occurred during login:", error);
    }
  };

  return (
    <main className="h-screen w-screen overflow-hidden">
      <div className="grid h-full w-full grid-cols-2">
        <section className="flex items-center justify-center bg-[#092C4C]">
          <img src="/public/assets/logos/logo-3.svg" alt="Harsa" />
        </section>

        <section className="relative w-full space-y-5 bg-white">
          <h1 className="absolute left-16 top-14 text-6xl font-bold">
            Welcome
            <br />
            Back!
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex h-full w-full flex-col items-center justify-center gap-5"
            >
              <FormItem>
                <FormLabel className="ml-1 text-lg font-semibold">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Email"
                    className="h-[53px] w-[500px] rounded-lg border border-gray-400 bg-transparent px-3 py-4 outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
                    {...form.register("email")}
                  />
                </FormControl>
                <FormMessage className="text-[#ED7878]">
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>

              <FormItem>
                <FormLabel className="ml-1 text-lg font-semibold">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="h-[53px] w-[500px] rounded-lg border border-gray-400 bg-transparent px-3 py-4 outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
                    {...form.register("password")}
                  />
                </FormControl>
                <FormMessage className="text-[#ED7878]">
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>

              <Button
                type="submit"
                className="h-[58px] w-[500px] rounded-lg bg-[#092C4C] py-4 text-center text-xl font-semibold text-white hover:bg-[#092C4C]/90 active:scale-95"
              >
                Sign in
              </Button>
            </form>
          </Form>
        </section>
      </div>
    </main>
  );
}
