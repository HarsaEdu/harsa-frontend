import React from "react";
import DeleteIcon from "../../assets/Delete.svg";
import EditIcon from "../../assets/edits.svg";

const CardTugas = ({
  title,
  lesson,
  description,
  className,
  editOnClick,
  deleteOnClick,
}) => {
  return (
    <div className={`mb-6 rounded-[27px] border border-[#F2994A] ${className}`}>
      <div className="h-[52px] rounded-t-[27px] bg-[#092C4C]"></div>
      <div className="mb-5 px-[20px] py-[25px] font-poppins text-sm text-[#092C4C]">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-black">{title}</h1>
          <div className="flex cursor-pointer gap-2">
            <img src={EditIcon} alt="EditIcon" onClick={editOnClick} />
            <img src={DeleteIcon} alt="DeleteIcon" onClick={deleteOnClick} />
          </div>
        </div>
        <p className="mb-2 mt-3 text-left">Kelas : {lesson}</p>
        <p className="mb-2 text-left">Deskripsi : {description}</p>
      </div>
    </div>
  );
};

export default CardTugas;
