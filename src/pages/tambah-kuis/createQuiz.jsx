import React from "react"
import QuestionCard from "./questionCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useQuestionsData } from './questionsData';

import EditIcon from "../../assets/Edit.svg"
import DeleteIcon from "../../assets/trash.svg"
import CopyIcon from "../../assets/copy-light.svg"
import AddIcon from "../../assets/Add.svg"

const CreateQuiz = () => {
    const [selectedQuestionIndices, setSelectedQuestionIndices] = useState({});
    const { questions, updateQuestions } = useQuestionsData();

const handleClick = () => {
    Swal.fire({
        icon: 'success',
        title: 'Sukses Membuat Kuis',
        showCloseButton: true,
        closeButtonHtml: '<i class="fas fa-times"></i>',
        showConfirmButton: false,
        customClass: {
            title: 'text-[#333333] font-bold text-2xl mb-4',
            closeButton: 'bg-[#E5E5E5] text-[#4F4F4F] text-2xl rounded-full p-2 m-2',
        },
    });
}

const handleRadioChange = (id, groupName) => {
    setSelectedQuestionIndices({
        ...selectedQuestionIndices,
        [groupName]: id,
    });
};

const handleDeleteClick = (id, groupName) => {
    const updatedQuestions = {
    ...questions,
    [groupName]: questions[groupName].map((q) => {
        if (q.id === id) {
            return { ...q, deleted: true };
        }
        return q;
    }),
};

updateQuestions(updatedQuestions);

    if (selectedQuestionIndices[groupName] === id) {
        setSelectedQuestionIndices({
            ...selectedQuestionIndices,
            [groupName]: null,
        });
    }
};

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

            <div className="font-poppins font-normal text-[#092C4C] text-justify text-base mt-4">
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
        </div>

        
        {/* question 1 */}
        <div className="border border-[#F2994A] pt-[24px] px-[15px] rounded-[27px] mt-4">
            <div className="flex justify-between items-center text-[#092C4C]">
                <div className="flex justify-between">
                    <p className="text-[14px] font-inter font-semibold mt-2 mb-3">Pertanyaan</p>
                </div>
            </div>

            <QuestionCard
                questions={questions["data-1"].filter((q) => !q.deleted)}
                groupName="data-1"
                onRadioChange={(id) => handleRadioChange(id, "data-1")}
                onDeleteClick={(id) => handleDeleteClick(id, "data-1")}
            />
        
            <div className="flex justify-start items-center text-[#092C4C]">
                <Input
                    type="radio"
                    className="w-[20px] cursor-pointer"
                    name="radio-1"
                />
                <p className="ml-2 text-bas">Tambah Opsi</p>
            </div>
            <div className="flex justify-end items-center gap-3 mr-10 cursor-pointer">
                <img src={CopyIcon} alt="CopyIcon" />
                <img src={DeleteIcon} alt="DeleteIcon" />
            </div>
        </div>

        {/* question 2 */}
        <div className="border border-[#F2994A] pt-[24px] px-[15px] rounded-[27px] mt-4">
            <div className="flex justify-between items-center text-[#092C4C]">
                <div className="flex justify-between">
                    <p className="text-[14px] font-inter font-semibold mt-2 mb-3">Pertanyaan</p>
                </div>
            </div>

            <QuestionCard
                questions={questions["data-2"].filter((q) => !q.deleted)}
                groupName="data-2"
                onRadioChange={(id) => handleRadioChange(id, "data-2")}
                onDeleteClick={(id) => handleDeleteClick(id, "data-2")}
            />
        
            <div className="flex justify-start items-center text-[#092C4C]">
                <Input
                    type="radio"
                    className="w-[20px] cursor-pointer"
                    name="radio-2"
                />
                <p className="ml-2 text-bas">Tambah Opsi</p>
            </div>
            <div className="flex justify-end items-center gap-3 mr-10 cursor-pointer">
                <img src={CopyIcon} alt="CopyIcon" />
                <img src={DeleteIcon} alt="DeleteIcon" />
            </div>
        </div>

        {/* question 3 */}
        <div className="border border-[#F2994A] pt-[24px] px-[15px] rounded-[27px] mt-4">
            <div className="flex justify-between items-center text-[#092C4C]">
                <div className="flex justify-between">
                    <p className="text-[14px] font-inter font-semibold mt-2 mb-3">Pertanyaan</p>
                </div>
            </div>

            <QuestionCard
                questions={questions["data-3"].filter((q) => !q.deleted)}
                groupName="radio-3"
                onRadioChange={(id) => handleRadioChange(id, "data-3")}
                onDeleteClick={(id) => handleDeleteClick(id, "data-3")}
            />
        
            <div className="flex justify-start items-center text-[#092C4C]">
                <Input
                    type="radio"
                    className="w-[20px] cursor-pointer"
                    name="radio-3"
                />
                <p className="ml-2 text-bas">Tambah Opsi</p>
            </div>
            <div className="flex justify-end items-center gap-3 mr-10 cursor-pointer">
                <img src={CopyIcon} alt="CopyIcon" />
                <img src={DeleteIcon} alt="DeleteIcon" />
            </div>
        </div>
            
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

export default CreateQuiz