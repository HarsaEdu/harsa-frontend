import { React, useState } from "react";
import Layout from "@/components/layout/Index";
import Breadcrumb from "@/components/breadcrumb";
import InputFile from "@/components/inputFile";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import HeaderQuiz from "./tambah-kuis/header";
import ManageTugas from "./manage-tugas";

const formSchema = z.object({
  image: z
    .any()
    .refine((data) => data !== undefined && data !== null && data !== "", {
      message: "Image is required",
    }),
});

function App() {
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("");
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
      console.log(data);
      setPreview("");
      form.resetField("image");
    }
  };

  const handleImageChange = (file) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview("");
      setImage("");
    }
  };

  return (
    <div>
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
                      handleImageChange(e.target.files[0]);
                    }}
                    setPreview={setPreview}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <img src={image} alt="" />
    </div>
  );
}

export default App;
