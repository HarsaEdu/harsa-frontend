import { React, useState } from "react";
import Layout from "@/components/layout/Index";
import Breadcrumb from "@/components/breadcrumb";
import EditTugas from "./manage-tugas/editTugas";
import InputFile from "@/components/inputFile";

function App() {
  const [preview, setPreview] = useState("");
  const handleImageChange = (file) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(""); // Reset the preview when image is deleted
    }
  };
  return (
    <div>
      <InputFile
        textUpload="Upload Cover"
        preview={preview}
        onChange={(e) => {
          // field.onChange(e.target.files[0]);
          // console.log(field);
          handleImageChange(e.target.files[0]);
        }}
        setPreview={setPreview}
      />
    </div>
  );
}

export default App;
