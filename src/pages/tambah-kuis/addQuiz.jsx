import { React, useState, useEffect } from "react"
import EditIcon from "../../assets/edits.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import QuestionCard from "./questionCard";
import { addQuiz } from "@/utils/apis/quizzes";

import AddIcon from "../../assets/Add.svg"

const AddQuiz = () => {
    const [editingTitle, setEditingTitle] = useState(false);
    const [editingDescription, setEditingDescription] = useState(false);
    const [title, setTitle] = useState("Kuis 1");
    const [description, setDescription] = useState(
        "Lorem Ipsum is simply dummy text..."
    );
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [quizData, setQuizData] = useState({
        questions: [],
        // properti lainnya...
      });
    const handleSaveQuiz = async () => {
        try {
          // Ganti ini dengan data sesuai dengan kebutuhan API
          const formData = {
            // ...isi formData sesuai kebutuhan API
            title,
            description,
          };
    
          const response = await addQuiz(formData);
    
          console.log("API Response:", response);
    
          if (response.code === 200 && response.data) {
            setQuizData(response.data);
            // Tambahkan logika lain jika diperlukan setelah berhasil menyimpan kuis
          } else {
            console.error("Error saving quiz:", response.message);
          }
        } catch (error) {
          console.error("Error saving quiz:", error.message);
        }
      };

      const handleEditTitle = () => {
        setEditingTitle(true);
      };
    
      const handleEditDescription = () => {
        setEditingDescription(true);
      };

      const handleToggleQuestionForm = () => {
        setShowQuestionForm(!showQuestionForm);
      };

    return(
        <div className="border border-[#092C4C] px-[15px] py-[30px] mt-6 rounded-xl">
      <div className="border border-[#F2994A] font-poppins p-4 rounded-xl text-[#092C4C] text-justify">
        <div className="flex justify-between">
          {editingTitle ? (
            <input
              type="text"
              className="text-2xl font-semibold"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setEditingTitle(false)}
              autoFocus
            />
          ) : (
            <>
              <h1 className="text-2xl font-semibold">{title}</h1>
              <img
                src={EditIcon}
                alt="EditIcon"
                onClick={handleEditTitle}
                className="cursor-pointer"
              />
            </>
          )}
        </div>
        <div className="flex justify-between mt-4">
          {editingDescription ? (
            <textarea
              className="text-sm font-semibold"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => setEditingDescription(false)}
              autoFocus
            />
          ) : (
            <>
              <p className="text-sm font-semibold">Deskripsi Formulir</p>
              <img
                src={EditIcon}
                alt="EditIcon"
                onClick={handleEditDescription}
                className="cursor-pointer"
              />
            </>
          )}
        </div>
        <p className="text-base mt-2">{description}</p>
      </div>

    {showQuestionForm && (
        <QuestionCard 
        quizData={quizData} 
        setQuizData={setQuizData} 
        />
    )}

           <div className="flex justify-between mt-8">
            <Link to="#">
                    <div 
                    className="flex gap-2 items-center text-[#092C4C] font-semibold font-poppins"
                    onClick={handleToggleQuestionForm}
                    >
                        <h1 className="text-xl">Tambah Pertanyaan</h1>
                        <img src={AddIcon} alt="PlusIcon" />
                    </div>
            </Link>
                <Button
                className="w-36"
                onClick={handleSaveQuiz}
                >
                    Simpan
                </Button>
           </div>
        </div>
    )
}

export default AddQuiz