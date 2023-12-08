import ManageClass from "@/components/module/materiComponent";
import { Modules } from "@/utils/moduleStatic";
import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

const MateriOverview = () => {
  return (
    <div>
      <div className="rounded-sm border border-slate-300">
        <div className="flex flex-col px-2">
          <div className="mb-5 flex justify-end">
            <Button
              id="module"
              className="m-2 rounded-[4px] bg-[#092C4C] text-white"
            >
              <Link to="/kelas/tambah-modul">Tambah Modul</Link>
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
      <Outlet />
    </div>
  );
};

export default MateriOverview;
