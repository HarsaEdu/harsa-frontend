import Breadcrumb from "@/components/breadcrumb";
import { React, useState } from "react";
import JawabanKuis from "./jawabanKuis";
import Layout from "@/components/layout/Index";
import CreateQuiz from "./createQuiz";

export default function HeaderQuiz() {
  const [isActivePertanyaan, setActivePertanyaan] = useState(true);

  const handlePertanyaanClick = () => {
    setActivePertanyaan(true);
  };

  const handleJawabanClick = () => {
    setActivePertanyaan(false);
  };

  return (
    <Layout>
      <div className="container mb-10 font-poppins">
        <Breadcrumb />
        <div className="mt-10 flex justify-center">
          <div className="flex flex-col items-center">
            <h4 className="text-4xl font-bold text-[#092C4C]">Kuis</h4>

            {/* State Render Component */}
            <div className="mt-8 flex space-x-12">
              <h4
                className={`cursor-pointer text-3xl font-bold ${
                  isActivePertanyaan
                    ? "border-b-2 border-b-black pb-2 text-[#092C4C]"
                    : "text-[#A2D2FF]"
                }`}
                onClick={handlePertanyaanClick}
              >
                Pertanyaan
              </h4>
              <h4
                className={`cursor-pointer text-3xl font-bold ${
                  !isActivePertanyaan
                    ? "border-b-2 border-b-black pb-2 text-[#092C4C]"
                    : "text-[#A2D2FF]"
                }`}
                onClick={handleJawabanClick}
              >
                Jawaban
              </h4>
            </div>
          </div>
        </div>
        <div>{isActivePertanyaan ? <CreateQuiz /> : null}</div>
        <div>{isActivePertanyaan ? null : <JawabanKuis />}</div>
      </div>
    </Layout>
  );
}
