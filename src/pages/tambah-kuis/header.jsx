import Breadcrumb from "@/components/breadcrumb";
import { React, useState } from "react";
import JawabanKuis from "./jawabanKuis";
import Layout from "@/components/layout/Index";
import CreateQuiz from "./createQuiz";
import { Outlet, useLocation, Link } from "react-router-dom";

export default function HeaderQuiz() {
  const location = useLocation();
  const isPertanyaanActive = location.pathname === "/kelas/tambah-pertanyaan";
  const isJawabanActive = location.pathname.includes(
    "/kelas/tambah-pertanyaan/jawaban/",
  );

  return (
    <Layout>
      <div className="container mb-10 font-poppins">
        <Breadcrumb />
        <div className="mt-10 flex justify-center">
          <div className="flex flex-col items-center">
            <h4 className="text-4xl font-bold text-[#092C4C]">Kuis</h4>

            {/* State Render Component */}
            <div className="mt-8 flex space-x-12">
              <Link to="/kelas/tambah-pertanyaan">
                <h4
                  className={`cursor-pointer text-3xl font-bold ${
                    isPertanyaanActive
                      ? "border-b-2 border-b-black pb-2 text-[#092C4C]"
                      : "text-[#A2D2FF]"
                  }`}
                >
                  Pertanyaan
                </h4>
              </Link>
              <Link to="/kelas/tambah-pertanyaan/1">
                <h4
                  className={`cursor-pointer text-3xl font-bold ${
                    !isPertanyaanActive
                      ? "border-b-2 border-b-black pb-2 text-[#092C4C]"
                      : "text-[#A2D2FF]"
                  }`}
                >
                  Jawaban
                </h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </Layout>
  );
}
