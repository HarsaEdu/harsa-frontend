import ManageClass from "@/components/module/materiComponent";
import { Modules } from "@/utils/moduleStatic";
import { Button } from "@/components/ui/button";
import { Link, Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDetailCourse } from "@/utils/apis/class";

const MateriOverview = () => {
  const params = useParams();
  const [course, setCourse] = useState([]);
  const [section, setSection] = useState([]);
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
            section.map((Module, index) => (
              <div key={Module.id}>
                <ManageClass
                  courseId={params.id}
                  sectionId={Module.id}
                  tipeMateri={Module.title}
                  judulMateri={Module.module[0].title}
                  teksMateri={Module.teksMateri}
                  videoMateri={Module.videoMateri}
                  tugasMateri={Module.tugasMateri}
                  kuisMateri={Module.kuis}
                  subtitleMateri={Module.judulMateri}
                />
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
