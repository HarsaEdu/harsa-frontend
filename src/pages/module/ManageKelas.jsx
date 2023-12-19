import Breadcrumb from "@/components/breadcrumb";
import EditIcon from "@/assets/icons/edit.svg";
import Layout from "@/components/layout/Index";
import { Link, useParams, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDetailCourse } from "@/utils/apis/courses";

const ManageKelas = () => {
  const roleName = localStorage.getItem("role_name");
  const params = useParams();
  const [name, setName] = useState("");
  const [course, setCourse] = useState([]);
  const [section, setSection] = useState([]);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const result = await getDetailCourse(+params.id);
      setCourse(result.data);
      setName(result.data.user.name);
      console.log(result.data);
      if (result.data.section !== null && result.data.section !== undefined) {
        setSection(result.data.section);
      } else {
        setSection([]);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <div className="container my-28 font-poppins">
        <Breadcrumb />
        <div className="11/12 my-5">
          {/* cover courses get from API course */}
          <img
            className="h-48 w-full rounded-t-xl object-cover object-top"
            src={course.image_url}
            alt=""
          />
        </div>
        <div className="my-2 flex items-center justify-between gap-2 text-3xl font-bold">
          <h1 className="w-3/4">{course.title}</h1>
          <Button
            onClick={() =>
              navigate(`/kelas/manage-kelas/update-kelas/${params.id}`)
            }
            className="text-xl font-semibold"
          >
            <img
              src={EditIcon}
              alt="edit-module"
              width={25}
              height={25}
              className="transition-colors"
            />
            Edit Kelas
          </Button>
        </div>
        <span className="text-xl font-bold">Deskripsi</span>
        <div className="my-2 flex items-start justify-between">
          <p className="w-11/12 text-justify">{course.description}</p>
          <a href={"/"} className="">
            <img src={EditIcon} alt="edit-module" width={22} height={22} />
          </a>
        </div>
        <div className="my-5 flex items-center">
          <span className="border border-black bg-[#092C4C] px-5 py-2 text-white">
            Instructor
          </span>
          <h1 className="border border-black px-3 py-2 font-semibold">
            {isLoading ? "Loading..." : name}
          </h1>
        </div>
        <div className="mt-8">
          <ul className="flex items-center">
            <li className="bg-[#F6F6F6] px-5 pt-1 text-center duration-150 ease-in  hover:rounded-t-[4px] hover:bg-[#092C4C] hover:text-white">
              <Link to={`/kelas/manage-kelas/${params.id}`}>Materi</Link>
            </li>
            <li className="bg-[#F6F6F6] px-5 pt-1 text-center duration-150  ease-in hover:rounded-t-[4px] hover:bg-[#092C4C] hover:text-white">
              <Link to={`/kelas/manage-kelas/${params.id}/ulasan-kelas`}>
                Ulasan
              </Link>
            </li>
            <li className="bg-[#F6F6F6] px-5 pt-1 text-center duration-150 ease-in hover:rounded-t-[4px] hover:bg-[#092C4C] hover:text-white">
              {roleName === "admin" ? (
                <Link to={`/kelas/manage-kelas/${params.id}/list-users`}>
                  User
                </Link>
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

export default ManageKelas;
