import ManageClass from "@/components/module/materiComponent";
import { Button } from "@/components/ui/button";
import { Link, Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import { getModuleById, getModuleBySection } from "@/utils/apis/modules/api";
import { getDetailCourse } from "@/utils/apis/courses";
import DeleteIcon from "@/assets/icons/delete.svg";

const MateriOverview = () => {
  const params = useParams();
  const [Modules, setModules] = useState([]);
  const [section, setSection] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getDetailCourse(+params.id);
      setModules(result.data);
      console.log(result.data);
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
    <div>
      <div className="rounded-sm border border-slate-300">
        <div className="flex flex-col px-2">
          <div className="mb-5 flex justify-end">
            <Button
              id="module"
              className="m-2 rounded-[4px] bg-[#092C4C] text-white"
            >
              <Link to={`/kelas/tambah-modul/${params.id}`}>Tambah Modul</Link>
            </Button>
          </div>
          {section.length > 0 ? (
            section.map((Modules) => (
              <div key={Modules.id}>
                <div className="mx-2 my-3 h-full border border-slate-300 px-2 font-poppins">
                  <div className="flex items-center justify-between rounded-md">
                    <h1 className="text-2xl font-bold">{Modules.title}</h1>
                    <div className="flex items-center">
                      <a href="/">
                        <img
                          src={DeleteIcon}
                          alt="delete-icon"
                          width={38}
                          height={38}
                        />
                      </a>
                      <Button className="m-2 rounded-[4px] bg-[#A2D2FF] font-semibold text-[#092C4C] hover:bg-[#81b1df]">
                        <Link
                          to={"/kelas"}
                          // to={`/kelas/manage-kelas/manage-modul/${courseId}/section/${sectionId}`}
                        >
                          Manage Modul
                        </Link>
                      </Button>
                    </div>
                  </div>
                  {/* <ManageClass
                    judulMateri={Module.title}
                    teksMateri={Module.sub_modules.teksMateri}
                    videoMateri={Module.sub_modules.content_url}
                    tugasMateri={Module.sub_modules.tugasMateri}
                    kuisMateri={Module.quizzes}
                    subtitleMateri={Module.submissions}
                  /> */}
                </div>
              </div>
            ))
          ) : (
            <div className="mb-8 text-center">Belum Ada Modul</div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MateriOverview;
