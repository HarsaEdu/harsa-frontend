import React from "react"
import Layout from "@/components/layout/Index"
import Breadcrumb from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

import Plus from "../../assets/Plus.svg"
import File from "../../assets/File.svg"
import Bell from "../../assets/bell.svg"

const TambahKuis = () => {
    return(
        <Layout>
            <div className="flex justify-end">
                <img src={Bell} alt="Icon" className="w-[50px]" />
            </div>
            <div className="flex">
                <Breadcrumb />
                <Link To="#" className="font-poppins">Kelas &gt;</Link>
                <Link To="#" className="font-poppins">Tambah Kuis</Link>
            </div>
            <div className="flex justify-between items-center mt-3">
                <div className="flex flex-row justify-center items-center">
                    <h2 className="font-poppins mr-2 text-[#092C4C]">Search</h2>
                    <Input
                    className="w-[200px] border-[#092C4C] rounded-[12px]" 
                    />
                </div>
                <div>
                    <Button>
                        Tambah Kuis 
                        <img src={Plus} alt="Icon" className="w-[16px] ml-2"/>
                    </Button>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center mt-20">
                <h3 className="text-[#999999] font-poppins">Belum ada kuis yang dibuat</h3>
                <img src={File} alt="Icon" className="w-[198px]"/>
            </div> 
        </Layout>
    )
}

export default TambahKuis