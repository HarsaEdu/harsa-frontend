import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus } from "lucide-react";
import check from "@/assets/icons/check.svg";
import close from "@/assets/icons/close.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editModule, getModuleById } from "@/utils/apis/modules/api";
import { Accordion } from "@radix-ui/react-accordion";
import Swal from "sweetalert2";

const formSchema = z.object({
  materialTitle: z.string({
    required_error: "*judul materi wajib di isi.",
  }),
});

const FormUpdateMaterial = ({ moduleTitle, moduleId, isupdate }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [module, setModule] = useState({});
  const [countMaterial, setCountMaterial] = useState(0);
  const [materialType, setMaterialType] = useState([]);
  const [subModules, setSubModules] = useState([]);
  const fetchData = async () => {
    try {
      const result = await getModuleById(moduleId);
      setModule(result.data);
      setCountMaterial(result.data.sub_modules.length);
      const tempMaterialType = [];
      const tempSubModules = [];
      result.data.sub_modules.forEach((subModule) => {
        tempMaterialType.push(subModule.type);
        tempSubModules.push({
          title: result.data.title,
          type: subModule.type,
          content_url: subModule.content_url,
          id: subModule.id,
        });
      });
      setMaterialType(tempMaterialType);
      setSubModules(tempSubModules);
      form.setValue("materialTitle", moduleTitle);
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
    fetchData();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const addMaterial = () => {
    let newMaterial = [];
    form.getValues().material.map((_, index) => {
      newMaterial.push({
        title: form.getValues("materialTitle"),
        type: materialType[index],
        content_url: form.getValues(`material[${index}]`),
      });
      if (subModules[index] && subModules[index].id) {
        newMaterial[index].id = subModules[index].id;
      }
    });
    setSubModules([...newMaterial]);
  };

  const onSubmit = async (data) => {
    if (data.materialTitle !== "") {
      if (subModules.length > 0 && subModules[0].content_url !== "") {
        form.clearErrors("material");
        const newData = {
          title: data.materialTitle,
          description: "lorem ipsum",
          sub_modules: subModules,
        };

        try {
          await editModule(moduleId, newData);

          Swal.fire({
            icon: "success",
            title: "Sukses Edit Module",
            showConfirmButton: false,
            showCloseButton: true,
            timer: 3000,
          }).then(() => {
            window.location.reload();
          });
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Gagal Edit Module",
            text: error.message,
          });
        }
      } else {
        form.setError("material", {
          type: "manual",
          message: "Minimal satu link materi wajib diisi.",
        });
      }
    } else {
      if (subModules[0].content_url === "") {
        form.setError("material", {
          type: "manual",
          message: "Minimal satu link materi wajib diisi.",
        });
      }
      form.setError("materialTitle", {
        type: "manual",
        message: "*judul materi wajib di isi.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="materialTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between font-poppins font-semibold text-[#092C4C]">
                <span>Judul Materi</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Judul Materi"
                  {...field}
                  variant="bottom"
                  className="border-black bg-transparent"
                  name="materialTitle"
                  defaultValue={moduleTitle}
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
              (form.formState.errors.material && materialType[index] === "") ? (
                <>
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
                            defaultValue={
                              subModules[index] && subModules[index].content_url
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              ) : null}

              {materialType[index] === "slide" && (
                <>
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
                            defaultValue={
                              subModules[index] && subModules[index].content_url
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
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
                  Tambah Link Materi <Plus className="inline-block h-4" />
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
          {!module.quizzes && (
            <div style={{ marginTop: "0.5rem" }}>
              <Link
                className="flex items-center font-poppins text-sm font-semibold text-[#092C4C] hover:text-[#092C4C]/70"
                to={`/kelas/manage-kelas/${params.id}/manage-module/${params.idSection}/manage-kuis`}
              >
                Tambah Kuis <Plus className="inline-block h-4" />
              </Link>
            </div>
          )}
          {module.quizzes &&
            module.quizzes.map((submission) => (
              <div
                key={submission.id}
                className="mt-4 flex w-full rounded-2xl bg-[#A2D2FF] pl-11"
              >
                <div className="my-7 me-auto">
                  <span className="text-lg font-bold">Kuis</span>
                  <p>{submission.title}</p>
                </div>
                <Link
                  to={`/kelas/manage-kelas/${params.id}/manage-module/${module.id}/manage-kuis/${submission.id}/jawaban`}
                  className="flex items-center rounded-r-2xl bg-[#092C4C] px-11 py-7 font-semibold text-[#fff]"
                >
                  Manage Kuis
                </Link>
              </div>
            ))}
        </div>
        <div>
          <FormLabel className="font-poppins font-semibold text-[#092C4C]">
            Tugas
          </FormLabel>
          {module.submissions &&
            module.submissions.map((submission) => (
              <div
                key={submission.id}
                className="mt-4 flex w-full rounded-2xl bg-[#A2D2FF] pl-11"
              >
                <div className="my-7 me-auto">
                  <span className="text-lg font-bold">Tugas</span>
                  <p>{submission.title}</p>
                </div>
                <Link
                  to={`/kelas/manage-kelas/${params.id}/manage-module/${module.id}/manage-tugas/${params.idSection}/detail-tugas/${submission.id}`}
                  className="flex items-center rounded-r-2xl bg-[#092C4C] px-11 py-7 font-semibold text-[#fff]"
                >
                  Manage Tugas
                </Link>
              </div>
            ))}
          <div style={{ marginTop: "0.5rem" }}>
            <Link
              className="flex items-center font-poppins text-sm font-semibold text-[#092C4C] hover:text-[#092C4C]/70 "
              to={`/kelas/manage-kelas/${params.id}/manage-module/${module.id}/manage-tugas/${params.idSection}`}
            >
              Tambah Tugas <Plus className="inline-block h-4" />
            </Link>
          </div>
        </div>
        <div className="flex justify-between" style={{ marginBottom: "10px" }}>
          <Button
            className="border-black"
            variant={"outline"}
            type="reset"
            onClick={() => {
              window.location.reload();
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
  );
};

export default FormUpdateMaterial;
