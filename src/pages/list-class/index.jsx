import Layout from "@/components/layout/Index";
import CardListClass from "@/pages/list-class/CardListClass";
import { Button } from "@/components/ui/button";

import Filter from "../../assets/filter.svg";

import PemrogramanFrontend from "../../assets/pemrograman-frontend.svg";
import PemrogramanBackend from "../../assets/pemrograman-backend.svg";
import PemrogramanMobile from "../../assets/pemrograman-mobile.svg";
import PemrogramanJava from "../../assets/pemrograman-java.svg";
import Breadcrumb from "@/components/breadcrumb";

import { getCourse } from "@/utils/apis/class";
import { useEffect, useState } from "react";

const ListClass = () => {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getCourse();
      setCourse(result.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Layout>
      <div className="container mb-10">
        <Breadcrumb />
        <div className="mt-2 flex cursor-pointer justify-between">
          <div className="flex">
            <Button className="rounded-none border border-[#092C4C] bg-white p-[10px] text-[#092C4C]">
              <p className="font-poppins text-[16px] font-normal">Kategory</p>
            </Button>
            <Button className="rounded-none border border-[#092C4C] bg-white p-[10px] text-[#092C4C]">
              <p className="font-poppins text-[16px] font-normal">Filter</p>
              <img src={Filter} alt="" className="ml-2" />
            </Button>
          </div>
          <Button className="w-[168px] items-center justify-center rounded-lg bg-[#092C4C] px-[10px] py-[15px]">
            <p className="font-poppins text-[16px] font-semibold text-white">
              Tambah Kelas
            </p>
          </Button>
        </div>
        <div className="mt-5 flex items-center justify-end gap-2">
          <p className="font-poppins text-[16px]">Search</p>
          <input
            type="text"
            className="h-[44px] w-[240px] rounded border border-black p-[10px]"
            id="search"
          />
        </div>
      </div>

      <div>
        {course.map((item, index) => (
          <CardListClass
            key={index}
            img={item.image_url}
            judul={item.title}
            category={item.category.name}
            instructor={item.user.name}
            description={item.description}
            idCourse={item.id}
          />
        ))}
      </div>
    </Layout>
  );
};

export default ListClass;
