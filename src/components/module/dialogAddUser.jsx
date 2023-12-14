import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CardModuleStudent from "@/components/card/cardModule";
import Pagination from "./pageination";
import { getAllStudents } from "@/utils/apis/user";

const DialogDemo = () => {
  const [modules, setModules] = useState([]);
  const [section, setSection] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  async function fetchData() {
    try {
      const result = await getAllStudents();
      setModules(result.data);
      if (result.data !== null && result.data !== undefined) {
        // Menerapkan pagination
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
    setCurrentPage(1); // Kembali ke halaman pertama saat mengganti ukuran halaman
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Tambah Data User</Button>
      </DialogTrigger>
      <DialogContent className="bg-[#092C4C] sm:max-w-[760px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            <div className="grid max-h-[80vh] grid-cols-2 gap-2 overflow-y-scroll">
              {section.length > 0 ? (
                section.map((module) => (
                  <div key={module.id}>
                    <CardModuleStudent
                      StudentName={module.username}
                      RoleUser={module.role_name}
                      AddressUser={module.address}
                    />
                  </div>
                ))
              ) : (
                <div className="mb-8 text-center">Belum Ada Modul</div>
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
              type="submit"
              className="sticky bg-slate-600 hover:bg-slate-400"
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
