import { useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Swal from "sweetalert2";

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
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Index";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Breadcrumb from "@/components/breadcrumb";
import deleteIcon from "@/assets/Delete.svg";
import arrowBottom from "@/assets/icons/arrow-bottom.svg";
import arrowTop from "@/assets/icons/arrow-top.svg";
import editIcon from "@/assets/Edit.svg";
import check from "@/assets/icons/check.svg";
import close from "@/assets/icons/close.svg";
import { id } from "date-fns/locale";

const formSchema = z.object({
  titleMateri: z.string({
    required_error: "judul materi wajib di isi.",
  }),
  materi: z
    .string({
      required_error: "link materi wajib di isi.",
    })
    .url({
      message: "Masukkan tautan materi yang valid",
    }),
});

const UpdateMaterial = () => {
  const [materialType, setMaterialType] = useState("");
  const [isAddMaterial, setIsAddMaterial] = useState(false);
  const [isEditSection, setIsEditSection] = useState(false);
  const [isEditMaterial, setIsEditMaterial] = useState({
    isEdit: false,
    id: "",
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log("data", data);
    Swal.fire({
      icon: "success",
      title: "Sukses Tambah Module",
      showConfirmButton: false,
      showCloseButton: true,
      timer: 3000,
    });
    setIsAddMaterial(false);
  };

  return (
    <Layout>
      <div className="container">
        <Breadcrumb />
        <div className="my-5 space-y-4 rounded border bg-[#D9D9D9] px-3 py-14">
          {isEditSection && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
                <FormField
                  control={form.control}
                  name="section"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Persiapan Kelas"
                          {...field}
                          variant="bottom"
                          className="border-black bg-transparent"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <div className="absolute bottom-2.5 right-2.5 flex gap-2">
                  <img
                    src={close}
                    alt=""
                    onClick={() => {
                      setIsEditSection(false);
                    }}
                  />
                  <button type="submit">
                    <img src={check} alt="" />
                  </button>
                </div>
              </form>
            </Form>
          )}
          {!isEditSection && (
            <div className="flex items-center gap-2">
              <p className="font-poppins text-xl font-semibold">
                Persiapan Kelas
              </p>
              <img
                className="h-6 rounded bg-[#092C4C]"
                src={editIcon}
                alt=""
                onClick={() => {
                  setIsEditSection(true);
                }}
              />
            </div>
          )}
          <div className="flex flex-row items-center justify-between rounded border-2 border-black p-2">
            {!isEditMaterial.isEdit && isEditMaterial.id === "" && (
              <>
                <p className="font-poppins">
                  Pengenalan Tentang Front-End Developer
                </p>
                <div className="flex items-center gap-2">
                  <img className="h-6" src={deleteIcon} alt="" />
                  <img
                    className="h-4"
                    src={arrowBottom}
                    alt=""
                    onClick={() => {
                      setIsEditMaterial({ isEdit: true, id: "1" });
                    }}
                  />
                </div>
              </>
            )}
            {isEditMaterial.isEdit && isEditMaterial.id === "1" && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="titleMateri"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-between font-poppins font-semibold text-[#092C4C]	">
                          <span>Judul Materi</span>
                          <img
                            className=""
                            src={arrowTop}
                            alt=""
                            onClick={() => {
                              setIsEditMaterial({ isEdit: false, id: "" });
                            }}
                          />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Judul Materi"
                            {...field}
                            variant="bottom"
                            className="border-black bg-transparent"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <div>
                    <FormLabel className="font-poppins font-semibold text-[#092C4C]">
                      Materi
                    </FormLabel>
                    {materialType === "video" ||
                      (form.formState.errors.materi && materialType === "") ? (
                      <FormField
                        control={form.control}
                        name="materi"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Link Video"
                                {...field}
                                variant="bottom"
                                className="border-black bg-transparent"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    ) : null}

                    {materialType === "slide" && (
                      <FormField
                        control={form.control}
                        name="materi"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Format PPT, Google Slide, PDF"
                                {...field}
                                variant="bottom"
                                className="border-black bg-transparent"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    )}

                    <div style={{ marginTop: "0.5rem" }}>
                      <Dialog className="">
                        <DialogTrigger asChild>
                          <Button
                            variant="link"
                            className="flex h-fit items-center p-0 font-poppins text-sm font-semibold text-[#092C4C] hover:text-[#092C4C]/70 "
                            href=""
                          >
                            Tambah Link Materi{" "}
                            <Plus className="inline-block h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[361px]">
                          <DialogHeader className={"items-center	"}>
                            <DialogTitle className="font-poppins font-semibold text-[#092C4C]">
                              Pilih Tipe Materi
                            </DialogTitle>
                          </DialogHeader>
                          <RadioGroup
                            className="flex flex-row justify-around"
                            defaultValue={materialType}
                            onValueChange={(value) => {
                              setMaterialType(value);
                            }}
                          >
                            <div className="flex items-center space-x-2">
                              <DialogClose>
                                <RadioGroupItem value="slide" id="slide" />
                                <Label className="ms-2 text-lg" htmlFor="slide">
                                  Slide
                                </Label>
                              </DialogClose>
                            </div>
                            <div className="flex items-center space-x-2">
                              <DialogClose>
                                <RadioGroupItem value="video" id="video" />
                                <Label className="ms-2 text-lg" htmlFor="video">
                                  Video
                                </Label>
                              </DialogClose>
                            </div>
                          </RadioGroup>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <div>
                    <FormLabel className="font-poppins font-semibold text-[#092C4C]">
                      Kuis
                    </FormLabel>
                    <div className="flex w-full bg-[#A2D2FF] rounded-2xl pl-11 mt-4">
                      <div className="my-7 me-auto">
                        <span className="text-lg font-bold">Kuis</span>
                        <p>Pengenalan UI/UX</p>
                      </div>
                      <Link to="/kuis" className="flex items-center bg-[#092C4C] py-7 px-11 rounded-r-2xl text-[#fff] font-semibold">
                            Manage Kuis
                      </Link>
                    </div>
                  </div>
                  <div>
                    <FormLabel className="font-poppins font-semibold text-[#092C4C]">
                      Tugas
                    </FormLabel>
                    <div className="flex w-full bg-[#A2D2FF] rounded-2xl pl-11 mt-4">
                      <div className="my-7 me-auto">
                        <span className="text-lg font-bold">Tugas</span>
                        <p>Pengenalan UI/UX</p>
                      </div>
                      <Link to="/kuis" className="flex items-center bg-[#092C4C] py-7 px-11 rounded-r-2xl text-[#fff] font-semibold">
                        Manage Tugas
                      </Link>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button
                      className="border-black"
                      variant={"outline"}
                      type="reset"
                      onClick={() => setIsAddMaterial(false)}
                    >
                      Batal
                    </Button>
                    <Button variant={"default"} type="submit">
                      Simpan
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>

          {!isAddMaterial && (
            <Button
              variant="link"
              className="flex h-fit items-center p-0 font-poppins text-sm font-semibold text-[#092C4C] hover:text-[#092C4C]/70 "
              onClick={() => setIsAddMaterial(true)}
            >
              Tambah Materi <Plus className="inline-block h-4" />
            </Button>
          )}

          {isAddMaterial && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 rounded border-2 border-black px-3 py-5"
              >
                <FormField
                  control={form.control}
                  name="titleMateri"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-poppins font-semibold text-[#092C4C]">
                        Judul Materi
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Judul Materi"
                          {...field}
                          variant="bottom"
                          className="border-black bg-transparent"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <div>
                  <FormLabel className="font-poppins font-semibold text-[#092C4C]">
                    Materi
                  </FormLabel>
                  {materialType === "video" ||
                    (form.formState.errors.materi && materialType === "") ? (
                    <FormField
                      control={form.control}
                      name="materi"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Link Video"
                              {...field}
                              variant="bottom"
                              className="border-black bg-transparent"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  ) : null}

                  {materialType === "slide" && (
                    <FormField
                      control={form.control}
                      name="materi"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Format PPT, Google Slide, PDF"
                              {...field}
                              variant="bottom"
                              className="border-black bg-transparent"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  )}

                  <div style={{ marginTop: "0.5rem" }}>
                    <Dialog className="">
                      <DialogTrigger asChild>
                        <Button
                          variant="link"
                          className="flex h-fit items-center p-0 font-poppins text-sm font-semibold text-[#092C4C] hover:text-[#092C4C]/70 "
                          href=""
                        >
                          Tambah Link Materi{" "}
                          <Plus className="inline-block h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[361px]">
                        <DialogHeader className={"items-center	"}>
                          <DialogTitle className="font-poppins font-semibold text-[#092C4C]">
                            Pilih Tipe Materi
                          </DialogTitle>
                        </DialogHeader>
                        <RadioGroup
                          className="flex flex-row justify-around"
                          defaultValue={materialType}
                          onValueChange={(value) => {
                            setMaterialType(value);
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <DialogClose>
                              <RadioGroupItem value="slide" id="slide" />
                              <Label className="ms-2 text-lg" htmlFor="slide">
                                Slide
                              </Label>
                            </DialogClose>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DialogClose>
                              <RadioGroupItem value="video" id="video" />
                              <Label className="ms-2 text-lg" htmlFor="video">
                                Video
                              </Label>
                            </DialogClose>
                          </div>
                        </RadioGroup>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div>
                  <FormLabel className="font-poppins font-semibold text-[#092C4C]">
                    Kuis
                  </FormLabel>
                  <div style={{ marginTop: "0.5rem" }}>
                    <a
                      className="flex items-center font-poppins text-sm font-semibold text-[#092C4C] hover:text-[#092C4C]/70 "
                      href=""
                    >
                      Tambah Kuis <Plus className="inline-block h-4" />
                    </a>
                  </div>
                </div>
                <div>
                  <FormLabel className="font-poppins font-semibold text-[#092C4C]">
                    Tugas
                  </FormLabel>
                  <div style={{ marginTop: "0.5rem" }}>
                    <Link
                      className="flex items-center font-poppins text-sm font-semibold text-[#092C4C] hover:text-[#092C4C]/70 "
                      to="/kelas/manage-module"
                    >
                      Tambah Tugas <Plus className="inline-block h-4" />
                    </Link>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button
                    className="border-black"
                    variant={"outline"}
                    type="reset"
                    onClick={() => setIsAddMaterial(false)}
                  >
                    Batal
                  </Button>
                  <Button variant={"default"} type="submit">
                    Simpan
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default UpdateMaterial;
