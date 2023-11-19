import React from "react";
import { Button } from "../ui/button";
import heroImage from "@/assets/hero-img.png";

export default function Hero() {
  return (
    <div
      className="flex flex-row items-center justify-between px-20 py-24"
      id="beranda"
    >
      <div className="w-3/4 text-center md:text-start">
        <p className="text-5xl font-bold leading-tight text-[#092C4C]">
          Transformasi Pembelajaran <br /> Melalui Platform LMS Unggulan
        </p>
        <div className="mb-6 mt-12 flex w-full xl:px-16 xl:text-xl">
          <div>
            <div className="mb-3 mr-20 list-item font-semibold text-[#092C4C] xl:xl:w-56">
              Dipercaya oleh lebih dari +200 institusi
            </div>
            <div className="mb-3 mr-20 list-item font-semibold text-[#092C4C] xl:w-56">
              Kemudahan dalam akses pembelajaran
            </div>
          </div>
          <div>
            <div className="mb-3 mr-20 list-item font-semibold text-[#092C4C] xl:w-60">
              LMS pertama yang mengimplementasikan AI
            </div>
            <div className="mb-3 mr-20 list-item font-semibold text-[#092C4C] xl:w-56">
              Kemudahan dalam akses pembelajaran
            </div>
          </div>
        </div>
        <a href="#emailAction">
          <Button className="w-72 bg-[#092C4C] py-6 text-lg font-semibold text-white">
            Unduh Sekarang
          </Button>
        </a>
      </div>
      <div className="hidden w-1/2 md:flex md:justify-center">
        <img src={heroImage} alt="" className="object-contain" />
      </div>
    </div>
  );
}
