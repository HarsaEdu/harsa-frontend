/* eslint-disable react/prop-types */
import ReactPlayer from "react-player";
import VideoIcon from "@/assets/icons/videoModule.svg";
import MateriIcon from "@/assets/icons/materiModule.svg";
import TugasIcon from "@/assets/icons/tugasModule.svg";
import KuisIcon from "@/assets/icons/kuisModule.svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import { type } from "os";

const CardModule = ({
  judulMateri,
  videoMateri,
  slideMateri,
  subtitleMateri,
  tugasMateri,
  kuisMateri,
}) => {
  const typeMateri = localStorage.getItem("type");

  return (
    <div className="px-2 font-poppins">
      <Accordion
        type="single"
        collapsible
        className="my-5 w-full rounded-md border border-[#A2D2FF] px-2"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="justify-between">
            {judulMateri}
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="single" collapsible className="my-1 w-full">
              {typeMateri === "slide" ? (
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <img src={VideoIcon} alt="video-module" />
                      Video - {subtitleMateri}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ReactPlayer url={videoMateri} />
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <img src={MateriIcon} alt="video-module" />
                      Materi - {subtitleMateri}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <iframe
                      src={slideMateri}
                      width="1280"
                      height="749"
                      allowfullscreen="true"
                      mozallowfullscreen="true"
                      webkitallowfullscreen="true"
                    ></iframe>
                  </AccordionContent>
                </AccordionItem>
              )}
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <img src={TugasIcon} alt="video-module" />
                    Tugas - {subtitleMateri}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <h1>{tugasMateri}</h1>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <img src={KuisIcon} alt="video-module" />
                    Kuis - {subtitleMateri}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <h1>{kuisMateri}</h1>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CardModule;
