import React from "react"
import DeleteIcon from "../../assets/Delete.svg"
import EditIcon from "../../assets/edits.svg"

const CardQuiz = ({ title, lesson, description, amount, className }) => {
        return (
        <div className={`border border-[#F2994A] rounded-[27px] mb-6 ${className}`}>
            <div className="bg-[#092C4C] h-[52px] rounded-t-[27px]"></div>
            <div className="px-[20px] py-[25px] mb-5 font-poppins text-[#092C4C] text-sm">
            <div className="flex justify-between">
                <h1 className="font-bold text-black text-3xl">{title}</h1>
                <div className="flex gap-2 cursor-pointer">
                <img src={EditIcon} alt="EditIcon" />
                <img src={DeleteIcon} alt="DeleteIcon" />
                </div>
            </div>
            <p className="mt-3 mb-2">kelas : {lesson}</p>
            <p className="mb-2">deskripsi : {description}</p>
            <p className="mb-2">Jumlah Soal : {amount}</p>
            </div>
        </div>
        );
    };

export default CardQuiz;
