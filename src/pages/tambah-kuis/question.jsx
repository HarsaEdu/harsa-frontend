import React from "react"

import EditIcon from "../../assets/Edit.svg"
import CeklisIcon from "../../assets/ceklis.svg"
import CrossIcon from "../../assets/cross.svg"
import DeleteIcon from "../../assets/Delete.svg"
import CopyIcon from "../../assets/copy-light.svg"
import AddIcon from "../../assets/Add.svg"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
const Question = () => {
    const [questions, setQuestions] = useState([
        {
            id: 1,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
        },
        {
            id: 2,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
        },
        {
            id: 3,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
        },
        {
            id: 4,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
        },
        
])

function handleClick(){
    Swal.fire({
        icon: 'success',
        title: 'Sukses Membuat Kuis',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    });
}

    return(
        <div className="border border-[#092C4C] mt-8 rounded-[13px] py-[50px] px-[15px]">
            <div className="border border-[#F2994A] py-[25px] px-[15px] rounded-[27px]">
                <div className="flex justify-between items-center">
                    <div className="text-[#092C4C]">
                        <h1 className="font-semibold font-poppins text-[30px]">Kuis 1</h1>
                        <p className="text-[14px] font-inter font-semibold mt-2">Deskripsi Formulir</p>
                    </div>
                    <div>
                        <Link to="#">
                            <img src={EditIcon} alt="EditIcon" className="bg-[#092C4C] w-[31px] py-[4px] px-[4px] rounded-[4px]" />
                        </Link>
                        <Link To="#">
                            <img src={EditIcon} alt="EditIcon" className="bg-[#092C4C] w-[31px] mt-3 py-[4px] px-[4px] rounded-[4px]" />
                        </Link>
                        
                    </div>
                </div>

                <div className="font-poppins font-normal text-[#092C4C] text-justify text-[18px] mt-4">
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
            </div>

            {Array.from({ length: 3 }, (_, index) => (
            <div className="border border-[#F2994A] pt-[24px] px-[15px] rounded-[27px] mt-4">
                <div className="flex justify-between items-center text-[#092C4C]">
                    <div className="flex justify-between">
                        <p className="text-[14px] font-inter font-semibold mt-2 mb-3">Pertanyaan</p>
                    </div>
                </div>

                {
                    questions.map((question, index) =>(
                        <div key={index} className="flex justify-between items-center text-[#092C4C] text-[12px font-poppins]">
                        <div className="flex justify-center items-center gap-2">
                            <Input
                            type="radio"
                            className="w-[28px] cursor-pointer"
                            name="question"
                            value="question"
                            />
                            <p>{question.description}</p>
                        </div>
                        
                        <div className="flex gap-3 ml-3 cursor-pointer">
                            {index === 0 ? (
                                <>
                                <img src={CeklisIcon} alt={`CeklisIcon-${index}`} />
                                <img src={CrossIcon} alt={`CrossIcon-${index}`} />
                                </>
                            ) : (
                                <img src={CrossIcon} alt={`CrossIcon-${index}`} />
                            )}
                        </div>
                    </div>
                    ))
                }
        
                <div className="flex justify-start items-center text-[#092C4C]">
                    <Input
                        type="radio"
                        className="w-[28px] cursor-pointer"
                        name="option"
                        value="option"
                    />
                    <p className="ml-2">Tambah Opsi</p>
                </div>
                <div className="flex justify-end items-center gap-3 mr-10">
                    <img src={CopyIcon} alt="CopyIcon" />
                    <img src={DeleteIcon} alt="DeleteIcon" />
                </div>
            </div>
            ))}

            <div className="flex mt-4 font-poppins font-semibold text-[24px] text-[#092C4C]">
                <Link To="#">Tambah Pertanyaan</Link>
                <img src={AddIcon} alt="AddIcon" />
            </div>
            <div className="flex justify-end mb-10">
                <Button
                className="w-[150px]"
                onClick={handleClick}
                >
                    Simpan
                </Button>
            </div>
        </div>
    )
}

export default Question