import { React, useState, useEffect } from "react"
import Layout from "@/components/layout/Index"
import Breadcrumb from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import CardQuiz from "./cardQuiz"
import { getQuiz } from "@/utils/apis/quizzes"

import PlusIcon from "../../assets/Plus.svg"
import FileIcon from "../../assets/File.svg"

const ManageQuiz = () => {
    const [quizData, setQuizData] = useState([]);

 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await getQuiz();
      console.log("API Response:", response);

      if (response.code === 200 && response.data) {
        setQuizData(response.data);
      } else {
        console.error("Error fetching quiz data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching quiz data:", error.message);
    }
  };

  fetchData();
}, []);

    return(
        <Layout>
            <div className="container mb-10 font-poppins">
                <div className="flex">
                    <Breadcrumb />
                </div>
                <div className="flex justify-between items-center mt-3">
                    <div className="flex flex-row justify-center items-center">
                        <h2 className="mr-2 text-[#092C4C]">Search</h2>
                        <Input
                        className="w-[200px] border-[#092C4C] rounded-[12px]" 
                        />
                    </div>
                    <Link to='/kelas/tambah-pertanyaan'>
                        <Button>
                            Tambah Kuis 
                            <img src={PlusIcon} alt="Icon" className="w-[16px] ml-2"/>
                        </Button>
                    </Link>
                </div>
            
                {quizData.length > 0 ? (
                    // Tampilkan CardQuiz jika ada data
                    quizData.map((quiz) => (
                        <CardQuiz
                            key={quiz.id}
                            data={quiz}
                        />
                    ))
                    ) : (
                    // Tampilkan pesan jika tidak ada data
                    <div className="flex flex-col justify-center items-center mt-20">
                        <h3 className="text-[#999999]">Belum ada kuis yang dibuat</h3>
                        <img src={FileIcon} alt="Icon" className="w-[198px]" />
                    </div>
                    )}
                </div>
        </Layout>
    )
}

export default ManageQuiz