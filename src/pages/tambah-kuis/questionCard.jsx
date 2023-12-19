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
        <div
          key={question.id}
          className="flex items-center justify-between font-poppins text-base text-[#092C4C]"
        >
          <div className="flex items-center justify-between gap-2">
            <Input
              type="radio"
              className="w-[20px] cursor-pointer"
              name={groupName}
              checked={selectedQuestionIndex === question.id}
              onChange={() => handleRadioChange(question.id)}
            />
            <p>{question.question}</p>
          </div>
          <div className="ml-3 flex cursor-pointer items-center gap-3">
            {selectedQuestionIndex === question.id && (
              <img src={CeklisIcon} alt="" className="w-4" />
            )}
            <img
              src={CrossIcon}
              alt=""
              className="w-4"
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
