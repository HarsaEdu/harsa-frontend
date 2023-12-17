import { Header } from "../../utils/moduleStatic";
import Breadcrumb from "@/components/breadcrumb";
import InputFile from "@/components/inputFile";
import EditIcon from "@/assets/icons/edit.svg";
import Layout from "@/components/layout/Index";
import { Link, useParams, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDetailCourse } from "@/utils/apis/courses";
import { Button } from "@/components/ui/button";

const MateriOverview = () => {
  const roleName = localStorage.getItem("role_name");
  const params = useParams();
  const [course, setCourse] = useState([]);
  const [section, setSection] = useState([]);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (file) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview("");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getDetailCourse(+params.id);
      setCourse(result.data);
      if (result.data.section !== null && result.data.section !== undefined) {
        setSection(result.data.section);
      } else {
        setSection([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Layout>
      <div className="container my-28 font-poppins">
        <Breadcrumb />
        <div className="my-5">
          {/* InputFile component is assumed to be defined elsewhere */}
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
          <h1>{course.title}</h1>
          <img
            src={EditIcon}
            alt="edit-module"
            width={22}
            height={22}
            onClick={() =>
              navigate(`/kelas/manage-kelas/update-kelas/${params.id}`)
            }
            style={{ cursor: "pointer" }}
          />
        </div>
        <span className="text-xl font-bold">Deskripsi</span>
        <div className="my-2 flex items-start justify-between">
          <p className="w-11/12 text-justify">{course.description}</p>
          <a href={"/"} className="">
            <img src={EditIcon} alt="edit-module" width={22} height={22} />
          </a>
        </div>
        <div className="mt-8">
          <ul className="flex items-center">
            <li className="bg-[#F6F6F6] px-5 pt-1 text-center duration-150 ease-in  hover:rounded-t-[4px] hover:bg-[#092C4C] hover:text-white">
              <Link to={`/kelas/manage-kelas/${params.id}`}>Materi</Link>
            </li>
            <li className="bg-[#F6F6F6] px-5 pt-1 text-center duration-150  ease-in hover:rounded-t-[4px] hover:bg-[#092C4C] hover:text-white">
              <Link to={`/kelas/manage-kelas/ulasan-kelas/${params.id}`}>
                Ulasan
              </Link>
            </li>
            <li className="bg-[#F6F6F6] px-5 pt-1 text-center duration-150 ease-in hover:rounded-t-[4px] hover:bg-[#092C4C] hover:text-white">
              {roleName === "admin" ? (
                <Link to="/kelas/manage-kelas/list-users">User</Link>
              ) : (
                <Link to={`/kelas/manage-kelas/${params.id}/list-user/`}>
                  User
                </Link>
              )}
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </Layout>
  );
};

export default MateriOverview;
