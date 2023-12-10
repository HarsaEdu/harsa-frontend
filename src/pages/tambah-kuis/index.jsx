import React from "react"
import Layout from "@/components/layout/Index"
import Breadcrumb from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import CardQuiz from "./cardQuiz"

import PlusIcon from "../../assets/Plus.svg"
import FileIcon from "../../assets/File.svg"

const AddQuiz = () => {
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
                <div className="flex flex-col justify-center items-center mt-20">
                    <h3 className="text-[#999999] ">Belum ada kuis yang dibuat</h3>
                    <img src={FileIcon} alt="Icon" className="w-[198px]"/>
                </div> 
            </div>

            <CardQuiz
                title="Kuis 1"
                lesson="Pemrograman  Frontend"
                description="Kuis Pemrograman Dasar (KKM 78)"
                amount="10"
            />
            <CardQuiz
                title="Kuis 2"
                lesson="Pemrograman  Frontend"
                description="Kuis Pemrograman Dasar (KKM 78)"
                jamount="10"
            />
        </Layout>
    )
}

export default AddQuiz