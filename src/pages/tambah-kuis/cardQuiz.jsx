import React from "react";
import PropTypes from "prop-types"; // Import PropTypes untuk mendefinisikan tipe properti
import { Link } from "react-router-dom";
import EditQuiz from "./editQuiz";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import DeleteIcon from "../../assets/Delete.svg";
import EditIcon from "../../assets/edits.svg";

const MySwal = withReactContent(Swal);

const CardQuiz = ({ data, className }) => {
  // Handle case when data is undefined or empty
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className={`border border-[#F2994A] rounded-[27px] mb-6 mt-6 ${className}`}>
        <div className="bg-[#092C4C] h-[52px] rounded-t-[27px]"></div>
        <div className="px-[20px] py-[25px] mb-5 font-poppins text-[#092C4C] text-sm">
          <p>Data is undefined or empty</p>
        </div>
      </div>
    );
  }

  console.log("CardQuiz Props:", data);

  const handleDelete = () => {
    MySwal.fire({
        title: "Yakin kamu mau  Hapus  data ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
            title: "Sukses Hapus  Data",
            icon: "success",
            showConfirmButton: false,
            showCloseButton: true,
        });
      }
    });
  };

  return (
    <div className={`border border-[#F2994A] rounded-[27px] mb-6 mt-6 ${className}`}>
      <div className="bg-[#092C4C] h-[52px] rounded-t-[27px]"></div>
      <div className="px-[20px] py-[25px] mb-5 font-poppins text-[#092C4C] text-sm">
        <div className="flex justify-between">
          <h1 className="font-bold text-black text-3xl">{data.title || "No Title"}</h1>
          <div className="flex gap-2 cursor-pointer justify-center items-center">
            <Link to={`/kelas/tambah-pertanyaan/${data.id}`}>
              <img src={EditIcon} alt="EditIcon" />
            </Link>
            <img src={DeleteIcon} alt="DeleteIcon" onClick={handleDelete} />
          </div>
        </div>
        <p className="mt-3 mb-2">kelas: {data.course_title || "No Lesson"}</p>
        <p className="mb-2">deskripsi: {data.description || "No Description"}</p>
        <p className="mb-2">Jumlah Soal: {data.number_questions || 0}</p>
      </div>
    </div>
  );
};

// Definisikan tipe properti menggunakan PropTypes
CardQuiz.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    course_title: PropTypes.string,
    description: PropTypes.string,
    number_questions: PropTypes.number,
  }),
  className: PropTypes.string,
};

export default CardQuiz;
