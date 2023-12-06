<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { React, useState } from "react";
import Layout from "@/components/layout/Index";
import Breadcrumb from "@/components/breadcrumb";
import EditTugas from "./manage-tugas/editTugas";
import InputFile from "@/components/inputFile";
import MateriOverview from "./module/updateKelas";

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
      <MateriOverview />
    </div>
=======
import Layout from '../components/layout/Index.jsx';
import Formkelas from '../pages/kelas/Formkelas.jsx';
=======
import Layout from "../components/layout/Index.jsx";
import Formkelasinstructor from "../pages/kelas/Formkelasinstructor.jsx";
import Formkelasadmin from "../pages/kelas/Formkelasadmin.jsx";
>>>>>>> 19a4c00 (feat: add form tambah kelas admin)
=======
import Layout from "@/components/layout/Index.jsx";
import Form from "../pages/kelas/Formkelasadmin";
>>>>>>> 75cd273 (feat: add dropzone validation)

function App() {
  const userRole = "admin";

  return (
<<<<<<< HEAD
    <>
      <Layout>
        <Formkelasadmin />
      </Layout>
    </>
>>>>>>> 3e4d37d (feat: add from tambah kelas)
=======
    <Layout>
      <Form />
    </Layout>
>>>>>>> 75cd273 (feat: add dropzone validation)
=======
import Layout from "@/components/layout/Index.jsx";
import Form from "../pages/kelas/Formkelasadmin";

function App() {
  const userRole = "admin";

  return (
    <Layout>
      <Form />
    </Layout>
>>>>>>> 1989afc128079573fbb69e4670e0036a4d0e3d3e
  );
}

export default App;
