import { React, useState, useEffect } from "react";
import Upload from "@/assets/Upload.svg";
import { Input } from "./ui/input";
import { X } from "lucide-react";

export default function InputFile(props) {
  const { textUpload, className, onChange, preview, id, setPreview } = props;

  const handleDelete = () => {
    setPreview("");
  };

  return (
    <div className="border-input flex h-48 items-center justify-center rounded-lg border border-gray-400 bg-transparent px-3 py-4 outline-none focus-within:border-[#092C4C] hover:border-[#092C4C]">
      {preview ? (
        <div className="relative h-40 border">
          <img src={preview} className="h-full w-full object-cover" />
          <div className="absolute right-0 top-0 m-2 cursor-pointer rounded-full bg-white p-1">
            {/* Add your 'X' component or icon here */}
            <X size={15} onClick={handleDelete} />
          </div>
        </div>
      ) : (
        <div className="absolute">
          <div className="">
            <div className="flex flex-col items-center gap-2 py-12">
              <img src={Upload} className="h-12" />
              <span>{textUpload}</span>
            </div>
          </div>
        </div>
      )}
      <Input
        id={id}
        onChange={onChange}
        type="file"
        className={`h-full w-full opacity-0 ${preview ? "hidden" : ""}`}
      />
    </div>
  );
}

{
  /* CONTOH PENGGUNAAN ADA JUGA DI APP.JSX

 <InputFile
  textUpload="Upload Cover"
  preview={preview}
  onChange={(e) => {
    handleImageChange(e.target.files[0]);
  }}
  setPreview={setPreview}
  />

Dan pakai state 

  const [preview, setPreview] = useState("");

Dan Tambah Fungsi

const handleImageChange = (file) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(""); // Reset the preview when image is deleted
    }
  };
*/
}

{
  /* CONTOH PEMAKAIAN DENGAN FORM SHADCN 
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  image: z
    .any()
    .refine((data) => data !== undefined && data !== null && data !== "", {
      message: "Image is required",
    }),
});

function App() {
  const [preview, setPreview] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
    },
  });

  const onSubmit = (data) => {
    if (preview == "") {
      form.setError("image", { message: "Image is Required" });
    } else {
      setImage(URL.createObjectURL(data.image));
      console.log(data); // untuk test datanya masuk atau tidak
      setPreview("");
      form.resetField("image");
    } 
  };

  const handleImageChange = (file) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(""); // Reset the preview when image is deleted
    }
  };

  return (
    <Layout>
     <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <InputFile
                    textUpload="Upload Cover"
                    preview={preview}
                    onChange={(e) => {
                      field.onChange(e.target.files[0]);
                      console.log(field);
                      handleImageChange(e.target.files[0]);
                    }}
                    setPreview={setPreview}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Layout>
  );
}
*/
}
