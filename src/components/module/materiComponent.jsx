/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import ReactPlayer from "react-player";
import DeleteIcon from "@/assets/icons/delete.svg";
import VideoIcon from "@/assets/icons/videoModule.svg";
import MateriIcon from "@/assets/icons/materiModule.svg";
import TugasIcon from "@/assets/icons/tugasModule.svg";
import KuisIcon from "@/assets/icons/kuisModule.svg";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CardModule = ({
  courseId,
  sectionId,
  tipeMateri,
  judulMateri,
  videoMateri,
  teksMateri,
  subtitleMateri,
  tugasMateri,
  kuisMateri,
}) => {
  return (
    <div className="mx-2 my-3 h-full border border-slate-300 px-2 font-poppins">
      <div className="flex items-center justify-between rounded-md">
        <h1 className="text-2xl font-bold">{tipeMateri}</h1>
        <div className="justify flex items-center">
          <a href="/">
            <img src={DeleteIcon} alt="delete-icon" width={38} height={38} />
          </a>
          <Button className="m-2 rounded-[4px] bg-[#A2D2FF] font-semibold text-[#092C4C] hover:bg-[#81b1df]">
            <Link to={`/kelas/manage-kelas/manage-modul/${courseId}/section/${sectionId}`} >Manage Modul</Link>
          </Button>
        </div>
      </div>
      <Accordion
        type="single"
        collapsible
        className="my-5 w-full rounded-md border border-[#A2D2FF] px-2"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className='justify-between'>{judulMateri}</AccordionTrigger>
          <AccordionContent>
            <Accordion type="single" collapsible className="my-1 w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex gap-2 items-center">
                    <img src={VideoIcon} alt="video-module" />
                    Video - {subtitleMateri}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ReactPlayer url={videoMateri} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <div className="flex gap-2 items-center">
                    <img src={MateriIcon} alt="video-module" />
                    Materi - {subtitleMateri}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <h1>{teksMateri}</h1>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <div className="flex gap-2 items-center">
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
                  <div className="flex gap-2 items-center">
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
