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
  editSection,
  getModuleBySection,
  deleteModule
} from "@/utils/apis/modules/api";
import FormUpdateMaterial from "./formUpdateMaterial";

const formSchema = z.object({
  materialTitle: z.string({
    required_error: "judul materi wajib di isi.",
  }),
});

const formSchemaSection = z.object({
  section: z.string({
    required_error: "Section materi wajib di isi.",
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
    try {
      const response = await getModuleBySection(params.id, params.idSection);
      console.log(response.data);
      setModule(response.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Gagal Mendapatkan Module",
        text: error.message,
      });
    }
  };
  useEffect(() => {
    fetchModules();
    console.log("module", module);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const formSection = useForm({
    resolver: zodResolver(formSchemaSection),
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

      try {
        await createModuleBySection(params.idSection, newData);

        Swal.fire({
          icon: "success",
          title: "Sukses Tambah Module",
          showConfirmButton: false,
          showCloseButton: true,
        }).then(() => {
          setIsAddMaterial(false);
          fetchModules();
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Gagal Tambah Module",
          text: error.message,
        });
      }
    } else {
      form.setError("material", {
        type: "manual",
        message: "Minimal satu link materi wajib diisi.",
      });
    }
  };

  const handleEditSection = async (data) => {
    console.log(data);
    const newData = {
      title: data.section,
    };

    try {
      await editSection(params.id, params.idSection, newData);

      Swal.fire({
        icon: "success",
        title: "Sukses Edit Section",
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
      }).then(() => {
        setIsEditSection(false);
        fetchModules();
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Gagal Edit Section",
        text: error.message,
      });
    }
  };

  const handleMaterialUpdated = () => {
    console.log("material updated");
  };

  const handleDeleteModule = async (moduleId) => {
    try {
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Data modul akan dihapus permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!",
      });
  
      if (result.isConfirmed) {
        await deleteModule(moduleId);
        fetchModules(); // Gantilah dengan fungsi yang sesuai untuk mereload data
        Swal.fire({
          icon: "success",
          title: "Sukses Menghapus Modul",
          showConfirmButton: false,
          showCloseButton: true,
          customClass: {
            closeButton: "swal2-cancel-button",
          },
          buttonsStyling: false,
        });
      }
    } catch (error) {
      console.error("Gagal menghapus modul", error);
      Swal.fire({
        title: "Error!",
        text: "Gagal menghapus data modul.",
        icon: "error",
      });
    }
  };

  return (
    <Layout>
      <div className="container">
        <Breadcrumb />
        <div className="my-5 space-y-4 rounded border bg-[#F6F6F6] px-3 py-14">
          {isEditSection && (
            <Form {...formSection}>
              <form
                onSubmit={formSection.handleSubmit(handleEditSection)}
                className="relative"
              >
                <FormField
                  control={formSection.control}
                  name="section"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          variant="bottom"
                          className="border-black bg-transparent"
                          defaultValue={module.title}
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
                {module.title}
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

          <Accordion type="single" collapsible className="my-1 w-full">
            {module &&
              module.modules &&
              module.modules.map((singleModule) => (
                <AccordionItem
                  AccordionItem
                  key={singleModule.id}
                  value={`item-${singleModule.id}`}
                  className="my-2 rounded border-2 border-black px-2"
                >
                  <AccordionTrigger className="font-semibold">
                    {singleModule.title}
                    <img className="ms-auto h-5" src={deleteIcon} alt="delete" onClick={() => handleDeleteModule(singleModule.id)} />
                  </AccordionTrigger>
                  <AccordionContent>
                    <FormUpdateMaterial
                      moduleTitle={singleModule.title}
                      moduleId={singleModule.id}
                      isupdate={handleMaterialUpdated}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
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
                className="my-5 space-y-8 rounded border-2 border-black px-3 py-5 font-semibold"
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

                {/* <div>
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
                </div> */}

                <div className="flex justify-between">
                  <Button
                    variant={"outline"}
                    type="reset"
                    onClick={() => {
                      setIsAddMaterial(false);
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
