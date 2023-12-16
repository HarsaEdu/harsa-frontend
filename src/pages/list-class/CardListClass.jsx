import React from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

import Star from "../../assets/Star.svg";
import Delete from "../../assets/Delete.svg";
import Edit from "../../assets/Edit.svg";

const CardListClass = (props) => {
  const { judul, category, instructor, description, img, idCourse, onDelete } =
    props;

  return (
    <div className="mx-auto mb-4 w-11/12">
      <div className="">
        <img
          className=" h-48 w-full rounded-t-xl border border-black object-cover object-top"
          src={img}
          alt=""
        />
      </div>
      <div className="rounded-b-[30px] border border-[#092C4C] p-[19px]">
        <div className="flex cursor-pointer justify-between">
          <h2 className="font-poppins text-[32px] font-semibold">{judul}</h2>
          <div className="flex items-center justify-center gap-1">
            <Button onClick={onDelete}>
              <img src={Delete} alt="" className="w-[32px]" />
            </Button>
            <Link to={`/kelas/manage-kelas/${idCourse}`}>
              <Button className="h-[32px] w-[170px] items-center justify-center rounded-lg bg-[#092C4C] px-[7px] py-[10px]">
                <p className="font-poppins text-[16px] font-semibold text-white">
                  Manage Kelas
                </p>
                <img src={Edit} alt="" className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <p className="mt-2 font-poppins  text-[14px] font-normal">
            <span className="font-semibold">Kategori</span> : {category}
          </p>
          <p className="font-poppins text-[14px] font-normal">
            <span className="font-semibold">Instructor</span> : {instructor}
          </p>
          <p className="mt-2 text-justify font-poppins text-[14px] font-normal">
            {description}
          </p>
          <div className="mt-2 flex">
            <img src={Star} alt="" className="w-[34px]" />
            <img src={Star} alt="" className="w-[34px]" />
            <img src={Star} alt="" className="w-[34px]" />
            <img src={Star} alt="" className="w-[34px]" />
            <img src={Star} alt="" className="w-[34px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardListClass;
