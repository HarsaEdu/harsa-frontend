import React from "react"
import QuestionCard from "./questionCard"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useQuestionsData } from './questionsData';

import EditIcon from "../../assets/Edit.svg"
import DeleteIcon from "../../assets/trash.svg"
import CopyIcon from "../../assets/copy-light.svg"
import AddIcon from "../../assets/Add.svg"

const CreateQuiz = () => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [isUpdated, setIsUpdated] = useState(false);

    const { questions, updateQuestions } = useQuestionsData();
    const [selectedQuestionIndices, setSelectedQuestionIndices] = useState({});

    useEffect(() => {
        // Mengatur nilai default editedTitle dan editedDescription saat komponen dimount
        if (questions && questions["data-1"]) {
        setEditedTitle(questions["data-1"][0]?.title || "");
        setEditedDescription(questions["data-1"][0]?.description || "");
        }
    }, [questions]);

    const handleEditTitleClick = () => {
        setIsEditingTitle(true);
        setIsUpdated(true);
    };

    const handleEditDescriptionClick = () => {
        setIsEditingDescription(true);
        setIsUpdated(true);
    };

    const handleSaveClick = () => {
        if (isUpdated) {
            Swal.fire({
                title: "Yakin kamu mau Menyimpan  data ini?",
                showCancelButton: true,
                showConfirmButton: true,
                icon: "question",
                confirmButtonColor: "#092C4C",
                confirmButtonText: "Ya, Simpan",
                cancelButtonText: "Batal",
                cancelButtonColor: "#F2994A",
                customClass: {
                popup: 'text-center',
                title: 'mb-2', 
            },
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire({
                icon: "success",
                title: "Sukses Update  Data",
                showCloseButton: true,
                closeButtonHtml: '<i class="fas fa-times"></i>',
                showConfirmButton: false,
                customClass: {
                title: "text-[#333333] font-bold text-2xl mb-4",
                closeButton: "bg-[#E5E5E5] text-[#4F4F4F] text-2xl rounded-full p-2 m-2",
                },
            });

            setIsUpdated(false);
            }
        });
        } else {
        Swal.fire({
            icon: "success",
            title: "Sukses Menyimpan Kuis",
            showCloseButton: true,
            closeButtonHtml: '<i class="fas fa-times"></i>',
            showConfirmButton: false,
            customClass: {
            title: "text-[#333333] font-bold text-2xl mb-4",
            closeButton: "bg-[#E5E5E5] text-[#4F4F4F] text-2xl rounded-full p-2 m-2",
            },
        });
        }
    };

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
                    {isEditingTitle ? (
                        <div>
                            <p className="font-semibold font-poppins text-[20px] mb-2">Judul Kuis:</p>
                            <Input
                                type="text"
                                className="w-full"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div>
                            <h1 className="font-semibold font-poppins text-[30px]">{editedTitle || "Judul Form"}</h1>
                            <p className="mt-3">Deskripsi Formulir</p>
                        </div>
                    )}
                    </div>
                    <div>
                    <Link to="#" onClick={handleEditTitleClick}>
                        {!isEditingTitle && <img src={EditIcon} alt="EditIcon" className="bg-[#092C4C] w-[31px] py-[4px] px-[4px] rounded-[4px]" />}
                    </Link>
                    <Link to="#" onClick={handleEditDescriptionClick}>
                        {!isEditingDescription && <img src={EditIcon} alt="EditIcon" className="bg-[#092C4C] w-[31px] mt-3 py-[4px] px-[4px] rounded-[4px]" />}
                    </Link>
                    </div>
            </div>

            <div className="font-poppins font-normal text-[#092C4C] text-justify text-base mt-4">
            {isEditingDescription ? (
                        <div>
                            <p className="font-semibold font-poppins text-[20px] mb-2">Deskripsi:</p>
                            <Textarea
                                className="w-full border border-gray-200 p-4"
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                            />
                        </div>
                    ) : (
                        <p>
                            {questions["data-1"][0]?.description || "Deskripsi Anda disini"}
                        </p>
                    )}
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
            onClick={handleSaveClick}
            >
                Simpan
            </Button>
        </div>
    </div>
    )
}

export default CreateQuiz