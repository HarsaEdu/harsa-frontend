import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailEmpty(false);
    setPasswordEmpty(false);
    setInvalid(false);
    if (email !== "" && password !== "") {
      if (email === "admin" && password === "admin") {
        alert("Berhasil Login!");
      } else {
        setInvalid(true);
      }
    } else {
      setEmailEmpty(true);
      setPasswordEmpty(true);
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
            onSubmit={handleSubmit}
            className="flex h-full w-full flex-col items-center justify-center gap-5"
          >
            <div>
              <label
                htmlFor="email"
                className="flex flex-col justify-center gap-1"
              >
                <span className="ml-1 text-lg font-semibold">Email</span>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-[500px] rounded-lg border border-gray-400 bg-transparent px-3 py-4 outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
                />
              </label>
              {emailEmpty && (
                <p className="text-[#ED7878]">*Email wajib disi</p>
              )}
              {invalid && (
                <p className="text-[#ED7878]">
                  *Email yang anda masukan tidak terdaftar
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="flex flex-col justify-center gap-1"
              >
                <span className="ml-1 text-lg font-semibold">Password</span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-[500px] rounded-lg border border-gray-400 bg-transparent px-3 py-4 outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
                />
              </label>
              {passwordEmpty && (
                <p className="text-[#ED7878]">*Password wajib di isi</p>
              )}
              {invalid && (
                <p className="text-[#ED7878]">
                  *Password yang anda masukan salah
                </p>
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
