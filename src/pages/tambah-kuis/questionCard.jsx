import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import CeklisIcon from "../../assets/ceklis.svg";
import CrossIcon from "../../assets/cross.svg";

const QuestionCard = ({ questions, groupName, onDeleteClick }) => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const handleRadioChange = (id) => {
    setSelectedQuestionIndex(id);
  };

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id} className="flex justify-between items-center text-[#092C4C] text-base font-poppins">
          <div className="flex justify-between items-center gap-2">
            <Input
              type="radio"
              className="w-[20px] cursor-pointer"
              name={groupName} 
              checked={selectedQuestionIndex === question.id}
              onChange={() => handleRadioChange(question.id)}
            />
            <p>{question.description}</p>
          </div>
          <div className="flex items-center gap-3 ml-3 cursor-pointer">
            {selectedQuestionIndex === question.id && (
              <img src={CeklisIcon} alt="" className="w-4" />
            )}
            <img 
            src={CrossIcon} 
            alt="" className="w-4" 
            name={groupName}
            onClick={() => onDeleteClick(question.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionCard;
