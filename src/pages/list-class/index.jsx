import Layout from "@/components/layout/Index";
import CardListClass from "@/pages/list-class/CardListClass";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { deleteCourse } from "@/utils/apis/courses/api";

import Filter from "../../assets/filter.svg";
import Breadcrumb from "@/components/breadcrumb";
import { Link, useSearchParams } from "react-router-dom";

import { getCourse, getMyCourse } from "@/utils/apis/courses";
import { getCategory } from "@/utils/apis/category";
import { useEffect, useState, useCallback, useMemo } from "react";
import { debounce } from "lodash";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ListClass = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [course, setCourse] = useState([]);
  const [categories, setCategories] = useState([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, [searchParams]);

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

  async function fetchData() {
    try {
      let query = Object.fromEntries([...searchParams]);

      if (searchParams.has("search")) {
        searchParams.set("offset", 0);
        setSearchValue(searchParams.get("search"));
      } else {
        searchParams.set("offset", 0);
        searchParams.set("limit", 999999);
      }

      if (searchParams.has("category")) {
        searchParams.set("offset", 0);
        query.category = searchParams.get("category");
      }

      console.log(query);

      const result = await (localStorage.getItem("role_name") == "instructor"
        ? getMyCourse(query)
        : getCourse(query));
      setCourse(result.data);
    } catch (error) {
      setCourse([]);
      console.log(error.message);
    }
  }

  function onSelectChange(newValue) {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newValue === "semua") {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", newValue);
      newSearchParams.set("offset", 0);
      newSearchParams.set("limit", 999999999);
    }

    setSearchParams(newSearchParams);
  }

  const fetchCategories = async () => {
    try {
      // Memanggil fungsi getCategory untuk mengambil data kategori
      const response = await getCategory();

      // Setel data kategori ke dalam state
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to get categories:", error);
    }
  };

  const handleDeleteCourse = async (idCourse) => {
    try {
      // Menampilkan konfirmasi SweetAlert
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Data course akan dihapus permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!",
      });

      if (result.isConfirmed) {
        // Panggil fungsi deletecourse untuk menghapus course
        await deleteCourse(idCourse);
        fetchData();

        // Menampilkan pesan SweetAlert setelah penghapusan berhasil
        MySwal.fire({
          icon: "success",
          title: "Sukses Hapus Kelas",
          showConfirmButton: false,
          showCloseButton: true,
          customClass: {
            closeButton: "swal2-cancel-button",
          },
          buttonsStyling: false,
        });
      }
    } catch (error) {
      console.error("Failed to delete course", error);

      // Menampilkan pesan SweetAlert jika penghapusan gagal
      Swal.fire({
        title: "Error!",
        text: "Gagal menghapus data course.",
        icon: "error",
      });
    }
  };

  return (
    <Layout>
      <div className="container mb-10">
        <Breadcrumb />
        <div className="mt-2 flex cursor-pointer justify-between">
          <div className="flex">
            <Button className="rounded-none border border-[#092C4C] bg-white p-[10px] text-[#092C4C]">
              <p className="font-poppins text-[16px] font-normal">Kategory</p>
            </Button>
            <Popover>
              <PopoverTrigger>
                {" "}
                <Button className="rounded-none border border-[#092C4C] bg-white p-[10px] text-[#092C4C]">
                  <p className="font-poppins text-[16px] font-normal">Filter</p>
                  <img src={Filter} alt="" className="ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col space-y-1">
                <Button
                  className={`rounded-none border border-[#092C4C] bg-white p-[10px] text-[#092C4C] ${
                    !searchParams.get("category") && "bg-[#092C4C] text-white"
                  } `}
                  onClick={() => onSelectChange("semua")}
                >
                  Semua
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    value={category.id}
                    className={`rounded-none border border-[#092C4C] bg-white p-[10px] text-[#092C4C] transition-all duration-100 ease-in hover:bg-[#092C4C] hover:text-white ${
                      searchParams.get("category") === category.name &&
                      "bg-[#092C4C] text-white"
                    }`}
                    onClick={() => onSelectChange(category.name)}
                  >
                    {category.name}
                  </Button>
                ))}
              </PopoverContent>
            </Popover>
          </div>
          <Link to="/kelas/tambah-kelas">
            <Button className="w-[168px] items-center justify-center rounded-lg bg-[#092C4C] px-[10px] py-[15px]">
              <p className="font-poppins text-[16px] font-semibold text-white">
                Tambah Kelas
              </p>
            </Button>
          </Link>
        </div>
        <div className="mt-5 flex items-center justify-end gap-2">
          <p className="font-poppins text-[16px]">Search</p>
          <input
            type="text"
            className="h-[44px] w-[240px] rounded border border-black p-[10px]"
            id="search"
            value={searchValue}
            onChange={(e) => onInputChange(e.currentTarget.value)}
          />
        </div>
      </div>

      <div>
        {course.length > 0 ? (
          course.map((item, index) => (
            <CardListClass
              key={index}
              img={item.image_url}
              judul={item.title}
              category={item.category.name}
              instructor={item.user.name}
              description={item.description}
              idCourse={item.id}
              onDelete={() => handleDeleteCourse(item.id)}
            />
          ))
        ) : (
          <div className="text-center">Belum Ada Kelas Yang Dibuat</div>
        )}
      </div>
    </Layout>
  );
};

export default ListClass;
