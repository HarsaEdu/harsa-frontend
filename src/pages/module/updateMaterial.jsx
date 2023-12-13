import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import editIcon from "@/assets/Edit.svg";
import check from "@/assets/icons/check.svg";
import close from "@/assets/icons/close.svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  createModuleBySection,
  createSection,
  getModuleBySection,
} from "@/utils/apis/modules/api";

const formSchema = z.object({
  materialTitle: z.string({
    required_error: "judul materi wajib di isi.",
  }),
});

const UpdateMaterial = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState([]);
  const [countMaterial, setCountMaterial] = useState(0);
  const [materialType, setMaterialType] = useState([]);
  const [subModules, setSubModules] = useState([]);
  const [isAddMaterial, setIsAddMaterial] = useState(false);
  const [isEditSection, setIsEditSection] = useState(false);

  const fetchModules = async () => {
    const response = await getModuleBySection(params.id, params.idSection);
    setModule(response.data);
  };
  useEffect(() => {
    fetchModules();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const addMaterial = () => {
    let newMaterial = [];
    form.getValues("material").map((_, index) => {
      newMaterial.push({
        title: form.getValues("materialTitle"),
        type: materialType[index],
        content_url: form.getValues(`material[${index}]`),
      });
    });
    setSubModules([...newMaterial]);
  };

  const handleCreateSubmit = async (data) => {
    if (materialType.length > 0) {
      form.clearErrors("material");
      const newData = {
        title: data.materialTitle,
        description: "lorem ipsum",
        sub_modules: subModules,
      };

      await createModuleBySection(params.idSection, newData);

      Swal.fire({
        icon: "success",
        title: "Sukses Tambah Module",
        showConfirmButton: false,
        showCloseButton: true,
      }).then(() => {
        setIsAddMaterial(false);
      });
    } else {
      form.setError("material", {
        type: "manual",
        message: "Minimal satu link materi wajib diisi.",
      });
    }
  };

  return (
    <Layout>
      <div className="container">
        <Breadcrumb />
        <div className="my-5 space-y-4 rounded border bg-[#F6F6F6] px-3 py-14">
          {isEditSection && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit()} className="relative">
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

          <Accordion
            type="single"
            collapsible
            className="my-1 w-full rounded border-2 border-black px-2"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold">
                Pengenalan Tentang Front-End Developer{" "}
                <img className="ms-auto h-5" src={deleteIcon} alt="" />
              </AccordionTrigger>
              <AccordionContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit()}
                    className="w-full space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="materialTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex justify-between font-poppins font-semibold text-[#092C4C]	">
                            <span>Judul Materi</span>
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
                                  <Label
                                    className="ms-2 text-lg"
                                    htmlFor="slide"
                                  >
                                    Slide
                                  </Label>
                                </DialogClose>
                              </div>
                              <div className="flex items-center space-x-2">
                                <DialogClose>
                                  <RadioGroupItem value="video" id="video" />
                                  <Label
                                    className="ms-2 text-lg"
                                    htmlFor="video"
                                  >
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
                      <div className="mt-4 flex w-full rounded-2xl bg-[#A2D2FF] pl-11">
                        <div className="my-7 me-auto">
                          <span className="text-lg font-bold">Kuis</span>
                          <p>Pengenalan UI/UX</p>
                        </div>
                        <Link
                          to="/kelas/tambah-kuis"
                          className="flex items-center rounded-r-2xl bg-[#092C4C] px-11 py-7 font-semibold text-[#fff]"
                        >
                          Manage Kuis
                        </Link>
                      </div>
                    </div>
                    <div>
                      <FormLabel className="font-poppins font-semibold text-[#092C4C]">
                        Tugas
                      </FormLabel>
                      <div className="mt-4 flex w-full rounded-2xl bg-[#A2D2FF] pl-11">
                        <div className="my-7 me-auto">
                          <span className="text-lg font-bold">Tugas</span>
                          <p>Pengenalan UI/UX</p>
                        </div>
                        <Link
                          to={`/kelas/manage-kelas/manage-tugas/${params.idSection}`}
                          className="flex items-center rounded-r-2xl bg-[#092C4C] px-11 py-7 font-semibold text-[#fff]"
                        >
                          Manage Tugas
                        </Link>
                      </div>
                    </div>
                    <div
                      className="flex justify-between"
                      style={{ marginBottom: "10px" }}
                    >
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>

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
                onSubmit={form.handleSubmit(handleCreateSubmit)}
                className="my-5 space-y-8 rounded border-2 px-3 py-5 font-semibold"
              >
                <FormField
                  control={form.control}
                  name="materialTitle"
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
                  {Array.from({ length: countMaterial }).map((_, index) => (
                    <div key={index} className="mb-2">
                      <FormLabel className="font-poppins font-semibold text-[#092C4C]">
                        Materi {index + 1}
                      </FormLabel>
                      {materialType[index] === "video" ||
                      (form.formState.errors.material &&
                        materialType[index] === "") ? (
                        <FormField
                          control={form.control}
                          name={`material[${index}]`}
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
                            </FormItem>
                          )}
                        />
                      ) : null}

                      {materialType[index] === "slide" && (
                        <FormField
                          control={form.control}
                          name={`material[${index}]`}
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
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  ))}

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
                        <DialogHeader className={"items-center"}>
                          <DialogTitle className="font-poppins font-bold text-[#092C4C]">
                            Pilih Tipe Materi
                          </DialogTitle>
                        </DialogHeader>
                        <RadioGroup
                          className="flex flex-row justify-around"
                          defaultValue={materialType}
                          onValueChange={(value) => {
                            setMaterialType([...materialType, value]);
                            setCountMaterial((prev) => prev + 1);
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
                    {form.formState.errors.material && (
                      <FormMessage className="mt-2 text-red-500">
                        {form.formState.errors.material.message}
                      </FormMessage>
                    )}
                  </div>
                </div>

                <div>
                  <FormLabel className="font-poppins font-semibold text-[#092C4C]">
                    Kuis
                  </FormLabel>
                  <div style={{ marginTop: "0.5rem" }}>
                    <Link
                      className="flex items-center font-poppins text-sm font-semibold text-[#092C4C] hover:text-[#092C4C]/70"
                      to="/kelas/tambah-kuis"
                    >
                      Tambah Kuis <Plus className="inline-block h-4" />
                    </Link>
                  </div>
                </div>
                <div>
                  <FormLabel className="font-poppins font-semibold text-[#092C4C]">
                    Tugas
                  </FormLabel>
                  <div style={{ marginTop: "0.5rem" }}>
                    <a
                      className="flex items-center font-poppins text-sm font-semibold text-[#092C4C] hover:text-[#092C4C]/70 "
                      href=""
                    >
                      Tambah Tugas <Plus className="inline-block h-4" />
                    </a>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button
                    variant={"outline"}
                    type="reset"
                    onClick={() => {
                      navigate("/kelas/manage-kelas/" + params.id);
                    }}
                  >
                    Batal
                  </Button>
                  <Button
                    variant={"default"}
                    type="submit"
                    onClick={() => {
                      addMaterial();
                    }}
                  >
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
