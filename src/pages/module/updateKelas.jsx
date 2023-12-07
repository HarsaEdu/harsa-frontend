import ManageClass from "@/components/module/materiComponent";
import { Modules, Header } from "../../utils/moduleStatic";
import { Button } from "../../components/ui/button";
import Breadcrumb from "@/components/breadcrumb";
import InputFile from "@/components/inputFile";
import EditIcon from "@/assets/icons/edit.svg";
import Layout from "@/components/layout/Index";
import { Link } from "react-router-dom";
import { useState } from "react";

const MateriOverview = () => {
  const [preview, setPreview] = useState("");
  const handleImageChange = (file) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview("");
    }
  };

  return (
    <Layout>
      <div className="container font-poppins">
        <Breadcrumb />
        <div className="my-5">
          <InputFile
            textUpload="Upload Cover"
            preview={preview}
            onChange={(e) => {
              handleImageChange(e.target.files[0]);
            }}
            setPreview={setPreview}
          />
        </div>
        <div className="my-2 flex items-center gap-2 text-3xl font-bold">
          <h1>{Header.title}</h1>
          <a href={"/"}>
            <img src={EditIcon} alt="edit-module" width={22} height={22} />
          </a>
        </div>
        <span className="text-xl font-bold">Deskripsi</span>
        <div className="my-2 flex items-start justify-between">
          <p className="w-11/12 text-justify">{Header.deskripsi}</p>
          <a href={"/"} className="">
            <img src={EditIcon} alt="edit-module" width={22} height={22} />
          </a>
        </div>
        <div className="my-4">
          <ul className="flex items-center">
            <li className="px-5 pt-1 text-center duration-150 ease-in hover:rounded-t-[4px]  bg-[#F6F6F6] hover:bg-[#092C4C] hover:text-white">
              <Link href="/">Materi</Link>
            </li>
            <li className="px-5 pt-1 text-center duration-150 ease-in  bg-[#F6F6F6] hover:rounded-t-[4px] hover:bg-[#092C4C] hover:text-white">
              <Link href="/">Ulasan</Link>
            </li>
            <li className="px-5 pt-1 text-center duration-150 ease-in bg-[#F6F6F6] hover:rounded-t-[4px] hover:bg-[#092C4C] hover:text-white">
              <Link href="/">User</Link>
            </li>
          </ul>
          <div className="flex flex-col border border-slate-300 px-2">
            <div className="mb-5 flex justify-end">
              <Button id="module" className="m-2 rounded-[4px] bg-[#092C4C] text-white">
                <Link to='/kelas/tambah-modul'>Tambah Modul</Link>
              </Button>
            </div>
            {Modules.map((Module) => (
              <div key={Module.id}>
                <ManageClass
                  tipeMateri={Module.tipeMateri}
                  judulMateri={Module.judulMateri}
                  teksMateri={Module.teksMateri}
                  videoMateri={Module.videoMateri}
                  tugasMateri={Module.tugasMateri}
                  kuisMateri={Module.kuis}
                  subtitleMateri={Module.judulMateri}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MateriOverview;
