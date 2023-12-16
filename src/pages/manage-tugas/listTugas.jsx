import { React, useState, useEffect, useCallback, useMemo } from "react";
import Layout from "@/components/layout/Index";
import Breadcrumb from "@/components/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useParams,
  useSearchParams,
  useNavigate,
  Link,
} from "react-router-dom";
import { Plus } from "lucide-react";
import { getAllSubmission, deleteSubmission } from "@/utils/apis/submission";
import CardTugas from "@/components/card/cardTugas";
import Swal from "sweetalert2";
import { debounce } from "lodash";

export default function ListTugas() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  async function fetchData() {
    let query = Object.fromEntries([...searchParams]);

    if (searchParams.has("search")) {
      searchParams.set("offset", 0);
      setSearchValue(searchParams.get("search"));
    } else {
      searchParams.set("offset", 0);
    }

    try {
      setIsLoading(true);
      const result = await getAllSubmission(params.idSection, { ...query });
      const { data } = result;
      setData(data);
    } catch (error) {
      Swal.fire({ title: "Error", text: error.message });
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }

  const getSuggestions = useCallback(
    async function (search) {
      if (!search) {
        searchParams.delete("search");
        searchParams.set("offset", 0);
      } else {
        searchParams.set("search", search);
        searchParams.set("offset", 0);
      }
      setSearchParams(searchParams);
    },
    [searchParams],
  );

  const getSuggestionsDebounce = useMemo(
    () => debounce(getSuggestions, 1000),
    [getSuggestions],
  );

  function onInputChange(newValue) {
    setSearchValue(newValue);
    getSuggestionsDebounce(newValue);
  }

  async function onDelete(idSubmission, idSection) {
    try {
      await deleteSubmission(idSubmission, idSection);
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleDelete(idSubmission, idSection) {
    try {
      Swal.fire({
        title: "Yakin kamu mau Hapus data ini?",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: "#092C4C",
        confirmButtonText: "Ya, Simpan",
        cancelButtonText: "Batal",
        cancelButtonColor: "#F2994A",
      }).then((result) => {
        if (result.isConfirmed) {
          onDelete(idSubmission, idSection);
          Swal.fire({
            title: "Sukses Menghapus Tugas",
            icon: "success",
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000,
            timerProgressBar: true,
          }).then((result) => {
            if (result.isDismissed) {
              fetchData();
            }
          });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Layout>
      <Breadcrumb />
      <div className="mt-8 flex w-full flex-col gap-8">
        {/* Component Search dan Tombol Tambah Tugas */}
        <div className="flex w-full justify-between">
          <div className="flex w-full items-center space-x-3">
            <p className="text-xl font-semibold">Search</p>{" "}
            <Input
              id="search"
              className=" w-4/12 rounded-xl border-[#092C4C]"
              value={searchValue}
              onChange={(e) => onInputChange(e.currentTarget.value)}
            />
          </div>
          <div className="flex w-1/2 items-center justify-end space-x-3">
            <Link to={`/kelas/tambah-modul/tambah-tugas/${params.idSection}`}>
              <Button
                id="tambah-tugas"
                className="rounded-xl bg-[#092C4C] px-6 py-5 text-xl hover:bg-[#142331]"
              >
                Tambah Tugas
                <Plus size={25} className="ms-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* CardTugas */}
        <div className="text-center">
          {isLoading ? (
            <div>Loading...</div>
          ) : data.length > 0 ? (
            <div className="mt-4 grid grid-cols-2 gap-x-8">
              {data.map((item, index) => (
                <CardTugas
                  key={index}
                  className="w-full"
                  title={item.submission_title}
                  lesson={item.course_title}
                  description={item.content}
                  editOnClick={() =>
                    navigate(
                      `/kelas/manage-tugas/${params.idSection}/${item.id}`,
                    )
                  }
                  deleteOnClick={() => handleDelete(item.id, params.idSection)}
                />
              ))}
            </div>
          ) : (
            <div>Tidak Ada Data Ditampilkan</div>
          )}
        </div>
      </div>
    </Layout>
  );
}
