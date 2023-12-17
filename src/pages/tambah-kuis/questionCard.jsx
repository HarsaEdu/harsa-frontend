import { React, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import CeklisIcon from "../../assets/ceklis.svg";
import CrossIcon from "../../assets/cross.svg";
import DeleteIcon from "../../assets/trash.svg";
import CopyIcon from "../../assets/copy-light.svg";

const QuestionCard = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { text: "Opsi 1", selected: false },
    { text: "Opsi 2", selected: false },
  ]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAddOptionInput, setShowAddOptionInput] = useState(false);
  const [newOption, setNewOption] = useState("");

  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      // Menambahkan opsi baru ke dalam array options
      setOptions((prevOptions) => [
        ...prevOptions,
        { text: newOption, selected: false },
      ]);
      setNewOption("");
    }
    setShowAddOptionInput(false);
  };

  const handleSelectOption = (index) => {
  if (selectedOption === index) {
    // Jika opsi yang sudah terpilih diklik lagi, set opsi yang dipilih ke null
    setSelectedOption(null);
  } else {
    // Set opsi yang dipilih ke opsi yang baru diklik
    setSelectedOption(index);
  }

  // Set status selected untuk opsi yang dipilih
  const updatedOptions = options.map((option, i) => ({
    ...option,
    selected: i === index,
  }));
  setOptions(updatedOptions);
};

  
const handleDeleteQuestion = () => {
  if (selectedOption !== null && selectedOption < options.length) {
    // Menghapus opsi yang dipilih jika ada yang dipilih
    let updatedOptions = [...options];
    updatedOptions.splice(selectedOption, 1);
    setOptions(updatedOptions);
    setSelectedOption(null);
  }
};

  return (
    <div className="border border-[#F2994A] font-poppins p-4 rounded-xl text-[#092C4C] text-justify mt-5">
      <div>
        <Input 
        type="text"
        placeholder="Pertanyaan"
        id="pertanyaan"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      {options.map((option, index) => (
        <div key={index} className="flex justify-between">
          <div className="flex items-center gap-2">
            <Input
              type="radio"
              className="w-[20px]"
              id={`option-${index}`}
              checked={selectedOption === index}
              onChange={() => handleSelectOption(index)}
            />
            <p>{option.text}</p>
          </div>
          <div className="flex items-center gap-2">
          {option.selected && 
            <img src={CeklisIcon} 
            alt="" 
          />}
            <img
              src={CrossIcon}
              alt=""
              onClick={handleDeleteQuestion}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      ))}
      {showAddOptionInput && (
        <div className="flex items-center gap-2">
          <Input
            type="radio"
            className="w-[20px] cursor-pointer"
            name="radio-2"
            id="tambahOpsi"
          />
          <Input
            type="text"
            placeholder="Tambah Opsi"
            className="border-none"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
          />
          <Button
          className="w-40 mt-4 mb-2"
          onClick={handleAddOption}
          >
             Tambah Opsi
          </Button>
        </div>
      )}
      {!showAddOptionInput && (
        <div className="flex justify-start items-center text-[#092C4C]">
          <Input
            type="radio"
            className="w-[20px] cursor-pointer"
            name="radio-2"
            id="tambahOpsi"
            onClick={() => setShowAddOptionInput(true)}
          />
          <p className="ml-2 text-base cursor-pointer" onClick={() => setShowAddOptionInput(true)}>
            Tambah Opsi
          </p>
        </div>
      )}
      <div className="flex justify-end items-center gap-3 mr-10 cursor-pointer">
        <img src={CopyIcon} alt="CopyIcon" />
        <img src={DeleteIcon} alt="DeleteIcon" />
      </div>
    </div>
  );
};

export default QuestionCard;
