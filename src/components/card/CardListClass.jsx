import React from "react"
import { Button } from "../ui/button"

import Star from "../../assets/Star.svg"
import Delete from "../../assets/Delete.svg"
import Edit from "../../assets/Edit.svg"

const CardListClass = (props) => {
    const { judul, category, instructor, description, img } = props

    return(
            <div className="w-[1120px] mx-auto mb-4">
                <div>
                    <img src={img} alt="" />
                </div>
                <div className="border border-[#092C4C] p-[19px] rounded-b-[30px]">
                    <div className="flex justify-between cursor-pointer">
                        <h2 className="font-poppins font-semibold text-[32px]">{judul}</h2>
                        <div className="flex gap-1 justify-center items-center">
                            <a href="#">
                                <img src={Delete} alt="" className="w-[32px]"/>
                            </a>
                            
                            <Button
                            className="bg-[#092C4C] w-[170px] h-[32px] justify-center items-center px-[7px] py-[10px] rounded-lg"
                            >
                                <p className="text-white font-poppins font-semibold text-[16px]">Manage Kelas</p>
                                <img src={Edit} alt="" className="ml-2" />
                            </Button>
                        </div>
                    </div>
                    <div>
                        <p className="font-poppins font-normal  text-[14px] mt-2"><span className="font-semibold">Kategori</span> : {category}</p>
                        <p className="font-poppins font-normal text-[14px]"><span className="font-semibold">Instructor</span> : {instructor}</p>
                        <p className="font-poppins font-normal text-justify text-[14px] mt-2">{description}</p>
                        <div className="flex mt-2">
                            <img src={Star} alt="" className="w-[34px]" />
                            <img src={Star} alt="" className="w-[34px]"/>
                            <img src={Star} alt="" className="w-[34px]"/>
                            <img src={Star} alt="" className="w-[34px]"/>
                            <img src={Star} alt="" className="w-[34px]"/>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default CardListClass