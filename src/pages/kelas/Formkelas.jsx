import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaUpload, FaTimes } from "react-icons/fa";

const formSchema = z.object({
  judul: z.string().nonempty("*Judul wajib di isi"),
  deskripsi: z.string().nonempty("*Deskripsi wajib di isi"),
  option: z.string().nonempty("*Kategori wajib di pilih"),
  uploads: z.string().nonempty("*Gambar wajib di pilih"),
});

const DropzoneComponent = ({ setPreview, setValue }) => {
  const [file, setFile] = useState(null);

  const handleImageChange = (newFile) => {
    if (newFile) {
      setPreview(URL.createObjectURL(newFile));
      setFile(newFile);
      setValue("uploads", newFile);
    } else {
      setPreview("");
      setFile(null);
      setValue("uploads", "");
    }
  };

  const removeImage = () => {
    setPreview("");
    setFile(null);
    setValue("uploads", "");
  };

  return (
    <div className="my-5 text-center relative">
      {file ? (
        <>
          <img
            src={URL.createObjectURL(file)}
            alt="Cover Preview"
            className="rounded-lg border border-[#092C4C] max-h-40 object-cover mx-auto"
          />
          <button
            className="absolute top-0 right-0 m-2 bg-white rounded-full p-1 cursor-pointer"
            onClick={removeImage}
          >
            <FaTimes size={16} color="#092C4C" />
          </button>
        </>
      ) : (
        <label
          htmlFor="upload"
          className="cursor-pointer flex flex-col items-center border rounded-lg border-[#092C4C] p-8"
        >
          <FaUpload size={40} className="mx-auto text-[#092C4C]" />
          <div className="mt-1">Upload Cover Course</div>
        </label>
      )}
      <input
        type="file"
        id="upload"
        style={{ display: "none" }}
        onChange={(e) => {
          handleImageChange(e.target.files[0]);
        }}
      />
    </div>
  );
};

export default function FormKelas() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      judul: "",
      deskripsi: "",
      option: "",
    },
  });

  const [preview, setPreview] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const onSubmit = async (data) => {
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleCancel = () => {
    form.reset();
    setPreview("");
  };

  return (
    <main className="bg-[#FFFFFF]">
      <section className={`mx-auto max-w-[800px] rounded-lg border border-[#092C4C] p-8 relative overflow-hidden ${showAlert ? "alert-open" : ""}`}>
        <h1 className="mb-5 text-2xl font-bold text-[#092C4C]">Tambah Kelas</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 px-4"
          >
            <FormItem>
              <FormLabel className="ml-1 text-lg font-bold text-[#092C4C]">
                Judul
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Judul Kelas"
                  className="h-[40px] w-[710px] rounded-s border border-[#092C4C] bg-transparent px-3 py-4 text-black outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
                  {...form.register("judul")}
                />
              </FormControl>
              <FormMessage className="text-[#ED7878]">
                {form.formState.errors.judul?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel className="ml-1 flex text-lg font-bold text-[#092C4C]">
                Deskripsi
              </FormLabel>
              <FormControl>
                <textarea
                  placeholder="Deskripsi"
                  className="h-[175px] w-[710px] resize-none rounded-lg border border-[#092C4C] bg-transparent px-3 py-4 text-black outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
                  {...form.register("deskripsi")}
                />
              </FormControl>
              <FormMessage className="text-[#ED7878]">
                {form.formState.errors.deskripsi?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel className="ml-1 text-lg font-bold text-[#092C4C]">
                Kategori
              </FormLabel>
              <FormControl>
                <select
                  className="flex h-[40px] w-[710px] rounded-lg border border-[#092C4C] bg-transparent px-2 py-2 text-black outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]"
                  {...form.register("option")}
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>
                  <option value="uiux">UI/UX</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="flutter">Flutter</option>
                </select>
              </FormControl>
              <FormMessage className="text-[#ED7878]">
                {form.formState.errors.option?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel className="ml-1 text-lg font-bold text-[#092C4C]">
                Cover
              </FormLabel>
              <FormControl>
                <DropzoneComponent
                  setPreview={setPreview}
                  setValue={form.setValue}
                />
              </FormControl>
              <FormMessage className="text-[#ED7878]">
                {form.formState.errors.uploads?.message}
              </FormMessage>
            </FormItem>

            <div className="flex justify-between">
              <Button
                type="button"
                onClick={handleCancel}
                className="text-s h-[40px] w-[150px] rounded-lg border border-[#092C4C] bg-[#FFFFFF] py-4 text-center font-bold text-[#092C4C] hover:bg-[#092C4C]/90 active:scale-95"
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="text-s h-[40px] w-[150px] rounded-lg bg-[#092C4C] py-4 text-center font-bold text-white hover:bg-[#092C4C]/90 active:scale-95"
              >
                Simpan
              </Button>
            </div>
          </form>
        </Form>
        {showAlert && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded border border-[#092C4C]">
              <button onClick={handleAlertClose}>Close</button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
