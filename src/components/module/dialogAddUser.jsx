import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import CardModuleStudent from "@/components/card/cardModule";
import Pagination from "./pageination";
import { getAllStudents } from "@/utils/apis/user";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  enrollUser,
  getAllSubscribers,
} from "@/utils/apis/courseTrackingWeb/api";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const DialogDemo = () => {
  const [modules, setModules] = useState([]);
  const [section, setSection] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  async function fetchData() {
    try {
      const result = await getAllSubscribers(params.id);
      setModules(result.data);
      if (result.data !== null && result.data !== undefined) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setSection(result.data.slice(startIndex, endIndex));
      } else {
        setSection([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setItemsPerPage(newPageSize);
    setCurrentPage(1);
  };

  const handleRadioChange = (event) => {
    setSelectedModuleId(event.target.value);
  };

  async function onSave(id) {
    try {
      await enrollUser(id, params.id);
      Swal.fire({
        title: "Berhasil",
        text: "User Sudah Ditambahkan",
        timer: 2000,
        timerProgressBar: true,
        showCloseButton: true,
      });
      window.location.reload();
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text: "Gagal Menambahkan User",
        icon: "error",
        timer: 2000,
        showCloseButton: true,
        timerProgressBar: true,
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Tambah Data User</Button>
      </DialogTrigger>
      <DialogContent className="bg-[#092C4C] sm:max-w-[760px]">
        <DialogHeader>
          <DialogDescription>
            <div className="mt-6 grid max-h-[80vh] grid-cols-2 gap-2 overflow-y-scroll">
              {section.length > 0 ? (
                section.map((module) => (
                  <div key={module.id}>
                    <CardModuleStudent
                      StudentName={module.username}
                      RoleUser={module.role_name}
                      AddressUser={module.address}
                      idUser={module.id}
                      onRadioChange={handleRadioChange}
                    />
                  </div>
                ))
              ) : (
                <div className="mb-8 text-center text-white">
                  Belum Ada User Mendaftar
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={modules.length}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
          <div>
            <Button
              type="button"
              disabled={!selectedModuleId}
              className="sticky bg-slate-600 hover:bg-slate-400"
              onClick={() => onSave(selectedModuleId)}
            >
              Save changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDemo;
