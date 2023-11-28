import ManageClass from "@/components/module/materiComponenet";
import { Button } from "../../components/ui/button";
import EditIcon from "@/assets/icons/edit.svg";
import Breadcrumb from "@/components/breadcrumb";
import Layout from "@/components/layout";
import { Link } from "react-router-dom";

const materiOverview = () => {
  return (
    <Layout>
      <div className="container-md font-poppins">
        <Breadcrumb />
        <div className="flex w-full justify-center border border-slate-300 p-16">
          <span>Dropzone Area</span>
        </div>
        <div className="my-2 flex items-center gap-2 text-3xl font-bold">
          <h1>Pemrograman frontend</h1>
          <a href={"/"}>
            <img src={EditIcon} alt="edit-module" width={22} height={22} />
          </a>
        </div>
        <span className="text-xl font-bold">Deskripsi</span>
        <div className="my-2 flex items-start justify-between">
          <p className="w-11/12 text-justify">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popular
          </p>
          <a href={"/"} className="">
            <img src={EditIcon} alt="edit-module" width={22} height={22} />
          </a>
        </div>
        <div className="my-4">
          <ul className="flex items-center space-x-2">
            <li className="px-5 pt-1 text-center duration-150 ease-in hover:rounded-t-[4px] hover:bg-[#092C4C] hover:text-white">
              <Link href="/">Materi</Link>
            </li>
            <li className="px-5 pt-1 text-center duration-150 ease-in hover:rounded-t-[4px] hover:bg-[#092C4C] hover:text-white">
              <Link href="/">Ulasan</Link>
            </li>
            <li className="px-5 pt-1 text-center duration-150 ease-in hover:rounded-t-[4px] hover:bg-[#092C4C] hover:text-white">
              <Link href="/">User</Link>
            </li>
          </ul>
          <div className="flex flex-col border border-slate-300 px-2">
            <div className="flex justify-end">
              <Button className="m-2 rounded-[4px] bg-[#092C4C] text-white">
                <Link href="/">Tambah Modul</Link>
              </Button>
            </div>
            <ManageClass />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default materiOverview;
