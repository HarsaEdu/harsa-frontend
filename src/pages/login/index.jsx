import { useForm, Controller } from "react-hook-form";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.email === "admin" && data.password === "admin") {
      alert("Berhasil Login!");
    } else {
      alert("Email atau password salah");
    }
  };

  return (
    <main className="h-screen w-screen">
      <div className="grid h-full w-full grid-cols-2">
        <section className="flex items-center justify-center bg-[#092C4C]">
          <img src="/public/assets/logos/logo-3.svg" alt="Harsa" />
        </section>

        <section className="relative w-full bg-white">
          <h1 className="absolute left-16 top-14 text-6xl font-bold">
            Welcome
            <br />
            Back!
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-full w-full flex-col items-center justify-center gap-5"
          >
            <div>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "*Email wajib diisi",
                  validate: (value) =>
                    value === "admin" ||
                    "*Email yang anda masukkan tidak terdaftar",
                }}
                render={({ field }) => (
                  <label
                    htmlFor="email"
                    className="flex flex-col justify-center gap-1"
                  >
                    <span className="ml-1 text-lg font-semibold">Email</span>
                    <input
                      {...field}
                      type="text"
                      placeholder="Email"
                      className={`w-[500px] rounded-lg border border-gray-400 bg-transparent px-3 py-4 outline-none focus-within:border-[#092C4C] hover:border-[#092C4C] ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                  </label>
                )}
              />
              {errors.email && (
                <p className="text-[#ED7878]">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "*Password wajib diisi",
                  validate: (value) =>
                    value === "admin" || "*Password yang anda masukkan salah",
                }}
                render={({ field }) => (
                  <label
                    htmlFor="password"
                    className="flex flex-col justify-center gap-1"
                  >
                    <span className="ml-1 text-lg font-semibold">Password</span>
                    <input
                      {...field}
                      type="password"
                      placeholder="Password"
                      className={`w-[500px] rounded-lg border border-gray-400 bg-transparent px-3 py-4 outline-none focus-within:border-[#092C4C] hover:border-[#092C4C] ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                  </label>
                )}
              />
              {errors.password && (
                <p className="text-[#ED7878]">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-[500px] rounded-lg bg-[#092C4C] py-4 text-center text-xl font-semibold text-white hover:bg-[#092C4C]/90 active:scale-95"
            >
              Sign In
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
