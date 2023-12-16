import { React, useEffect, useState } from "react";
import Layout from "@/components/layout/Index";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import CardQuiz from "./cardQuiz";

import PlusIcon from "../../assets/Plus.svg";
import FileIcon from "../../assets/File.svg";
import { getAllQuiz } from "@/utils/apis/quiz";
import Swal from "sweetalert2";

const AddQuiz = () => {
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
      searchParams.set("limit", 10);
    }

    try {
      setIsLoading(true);
      const result = await getAllQuiz({ ...query }, 1); //TODO: GANTI ID QUIZ SESUAI MODUL
      const { data } = result;
      setData(data);
    } catch (error) {
      Swal.fire({ title: "Error", text: error.message });
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <div className="container mb-10 font-poppins">
        <div className="flex">
          <Breadcrumb />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-row items-center justify-center">
            <h2 className="mr-2 text-[#092C4C]">Search</h2>
            <Input className="w-[200px] rounded-[12px] border-[#092C4C]" />
          </div>
          <Link to="/kelas/tambah-pertanyaan">
            <Button>
              Tambah Kuis
              <img src={PlusIcon} alt="Icon" className="ml-2 w-[16px]" />
            </Button>
          </Link>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center">
          {isLoading ? (
            <div>Loading...</div>
          ) : data.length > 0 ? (
            <div className="mt-4 flex w-full flex-col gap-x-8">
              {data.map((item, index) => (
                <CardQuiz
                  key={index}
                  className="w-full"
                  title={item.title}
                  lesson={item.course_title}
                  description={item.description}
                  amount={item.number_questions}
                  editOnClick={() =>
                    navigate(`/kelas/tambah-pertanyaan/${item.id}`)
                  }
                  deleteOnClick={() => Swal.fire({ title: "Belum Integrasi" })}
                />
              ))}
            </div>
          ) : (
            <div>
              {" "}
              <h3 className="text-[#999999] ">Belum ada kuis yang dibuat</h3>
              <img src={FileIcon} alt="Icon" className="w-[198px]" />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AddQuiz;
