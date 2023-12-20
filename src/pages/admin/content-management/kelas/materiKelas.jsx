import ManageClass from "@/components/module/materiComponent";
import { Button } from "@/components/ui/button";
import { Link, Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDetailCourse } from "@/utils/apis/courses";
import { deleteSubModule } from "@/utils/apis/modules/api";
import Swal from "sweetalert2";
import DeleteIcon from "@/assets/icons/delete.svg";
import withReactContent from "sweetalert2-react-content";

const MateriOverview = () => {
  const params = useParams();
  const [section, setSection] = useState([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getDetailCourse(params.id);
      setSection(result.data.section);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDeleteSubModule = async (idSection) => {
    try {
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Data submodul akan dihapus permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!",
      });

      if (result.isConfirmed) {
        await deleteSubModule(params.id, idSection);
        fetchData();
        MySwal.fire({
          icon: "success",
          title: "Sukses Tambah Kelas",
          showConfirmButton: false,
          showCloseButton: true,
          customClass: {
            closeButton: "swal2-cancel-button",
          },
          buttonsStyling: false,
        });
      }
    } catch (error) {
      console.error("Gagal menghapus submodul", error);
      Swal.fire({
        title: "Error!",
        text: "Gagal menghapus data course.",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <div className="rounded-sm border border-slate-300">
        <div className="flex flex-col px-2">
          <div className="mb-5 flex justify-end">
            <Button
              id="module"
              className="m-2 rounded-[4px] bg-[#092C4C] text-white"
            >
              <Link
                to={`/kelas/manage-kelas/${params.id}/manage-modul/tambah-modul`}
              >
                Tambah Modul
              </Link>
            </Button>
          </div>
          {section !== null ? (
            section.map((Modules) => (
              <div key={Modules.id}>
                <div className="mx-2 my-3 h-full border border-slate-300 px-2 font-poppins">
                  <div className="flex items-center justify-between rounded-md">
                    <h1 className="text-2xl font-bold">{Modules.title}</h1>
                    <div className="flex items-center">
                      <Button
                        id="deleteButton"
                        onClick={() => handleDeleteSubModule(Modules.id)}
                        className="m-2 rounded-[4px] bg-[#092C4C] font-semibold text-[#092C4C] hover:bg-[#092C4C]"
                      >
                        <img src={DeleteIcon} alt="" width={38} height={38} />
                      </Button>
                      <Button
                        className="m-2 rounded-[4px] bg-[#A2D2FF] font-semibold text-[#092C4C] hover:bg-[#81b1df]"
                        id="manageModuleButton"
                      >
                        <Link
                          to={`/kelas/manage-kelas/${params.id}/manage-modul/${Modules.id}`}
                        >
                          Manage Modul
                        </Link>
                      </Button>
                    </div>
                  </div>
                  {Modules.module.length > 0 ? (
                    Modules.module.map((module) => (
                      <ManageClass key={module.id} idSection={module.id} />
                    ))
                  ) : (
                    <p>Tidak ada modul</p>
                  )}
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
