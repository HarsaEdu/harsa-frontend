import React from "react";
import QuestionCard from "./questionCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useQuestionsData } from "./questionsData";

import EditIcon from "../../assets/Edit.svg";
import DeleteIcon from "../../assets/trash.svg";
import CopyIcon from "../../assets/copy-light.svg";
import AddIcon from "../../assets/Add.svg";
import { getQuizById } from "@/utils/apis/quiz";

import CeklisIcon from "../../assets/ceklis.svg";
import CrossIcon from "../../assets/cross.svg";

const EditQuiz = () => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const params = useParams();

  const { questions, updateQuestions } = useQuestionsData();
  const [selectedQuestionIndices, setSelectedQuestionIndices] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setIsLoading(true);
      const result = await getQuizById(params.idQuiz);
      const { data } = result;
      setData(data);
    } catch (error) {
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }

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
          popup: "text-center",
          title: "mb-2",
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
              closeButton:
                "bg-[#E5E5E5] text-[#4F4F4F] text-2xl rounded-full p-2 m-2",
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
          closeButton:
            "bg-[#E5E5E5] text-[#4F4F4F] text-2xl rounded-full p-2 m-2",
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

  return (
    <div className="mt-8 rounded-[13px] border border-[#092C4C] px-[15px] py-[50px]">
      <div className="rounded-[27px] border border-[#F2994A] px-[15px] py-[25px]">
        <div className="flex items-center justify-between">
          <div className="text-[#092C4C]">
            {isEditingTitle ? (
              <div>
                <p className="mb-2 font-poppins text-[20px] font-semibold">
                  Judul Kuis:
                </p>
                <Input
                  type="text"
                  className="w-full"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <h1 className="font-poppins text-[30px] font-semibold">
                  {data.title}
                </h1>
                <p className="mt-3">Deskripsi Formulir</p>
              </div>
            )}
          </div>
          <div>
            <Link to="#" onClick={handleEditTitleClick}>
              {!isEditingTitle && (
                <img
                  src={EditIcon}
                  alt="EditIcon"
                  className="w-[31px] rounded-[4px] bg-[#092C4C] px-[4px] py-[4px]"
                />
              )}
            </Link>
            <Link to="#" onClick={handleEditDescriptionClick}>
              {!isEditingDescription && (
                <img
                  src={EditIcon}
                  alt="EditIcon"
                  className="mt-3 w-[31px] rounded-[4px] bg-[#092C4C] px-[4px] py-[4px]"
                />
              )}
            </Link>
          </div>
        </div>

        <div className="mt-4 text-justify font-poppins text-base font-normal text-[#092C4C]">
          {isEditingDescription ? (
            <div>
              <p className="mb-2 font-poppins text-[20px] font-semibold">
                Deskripsi:
              </p>
              <Textarea
                className="w-full border border-gray-200 p-4"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </div>
          ) : (
            <p>{data.description}</p>
          )}
        </div>
      </div>

      {/* question 1 */}
      <div>
        {data.length === 0 ? (
          <p>No questions available.</p>
        ) : (
          data.questions.map((question) => (
            <div className="mt-4 rounded-[27px] border border-[#F2994A] px-[15px] pt-[24px]">
              <div key={question.id} className="mb-4">
                <p className="mb-3 mt-2 font-inter text-xl font-bold text-[#092C4C]">
                  {question.question}
                </p>
                <>
                  {question.options.map((option) => (
                    <div className="flex justify-between" key={option.id}>
                      <div className="flex items-center justify-start text-[#092C4C]">
                        <Input
                          type="radio"
                          className="w-[20px] cursor-pointer"
                          name={`radio-${question.id}`}
                          value={option.value}
                        />
                        <p className="ml-2 text-lg font-bold text-[#092C4C]">
                          {option.value}
                        </p>
                      </div>
                      {option.is_right ? (
                        <img src={CeklisIcon} alt="Correct" className="w-4" />
                      ) : (
                        <img src={CrossIcon} alt="Incorrect" className="w-4" />
                      )}
                    </div>
                  ))}
                  <div className="flex items-center justify-start text-[#092C4C]">
                    <Input
                      type="radio"
                      className="w-[20px] cursor-pointer"
                      name="radio-1"
                    />
                    <p className="ml-2 text-lg font-bold text-[#092C4C]">
                      Tambah Opsi
                    </p>
                  </div>
                </>
              </div>
              <div className="mr-10 flex cursor-pointer items-center justify-end gap-3">
                <img src={CopyIcon} alt="CopyIcon" />
                <img src={DeleteIcon} alt="DeleteIcon" />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex font-poppins text-[24px] font-semibold text-[#092C4C]">
        <Link To="#">Tambah Pertanyaan</Link>
        <img src={AddIcon} alt="AddIcon" />
      </div>
      <div className="mb-10 flex justify-end">
        <Button className="w-[150px]" onClick={handleSaveClick}>
          Simpan
        </Button>
      </div>
    </div>
  );
};

export default EditQuiz;
