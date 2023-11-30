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
  return <div></div>;
}

export default App;
