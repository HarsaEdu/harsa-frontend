import { React } from "react";
import Upload from "@/assets/Upload.svg";
import { Input } from "./ui/input";

export default function InputFile(props) {
  const { textUpload, className, onChange, preview, id } = props;

  return (
    <div className="border-input flex h-48 items-center justify-center rounded-lg border">
      {preview ? (
        <div className="flex w-full items-center justify-end gap-3">
          <img src={preview} className="h-40 border" />
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
        className="h-full w-full opacity-0"
      />
    </div>
  );
}

{
  /* CONTOH PENGGUNAAN 

<InputFile
  textUpload="Upload Cover"
  preview={preview}
  onChange={(e) => {
    field.onChange(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  }}
/>; 

Dan pakai state 

  const [preview, setPreview] = useState("");

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
  image: z.any(),
});

unction App() {
  const [preview, setPreview] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
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
                      setPreview(URL.createObjectURL(e.target.files[0]));
                    }}
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
