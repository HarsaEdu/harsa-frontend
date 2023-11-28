/* eslint-disable react/prop-types */
import { Button } from "../../components/ui/button";
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

const DropdownMenu = () => {
  return (
    <div className="h-screen border border-slate-300 px-2 font-poppins">
      <div className="flex items-center justify-between rounded-md">
        <h1 className="text-2xl font-bold">Persiapan Kelas</h1>
        <div className="justify flex items-center">
          <a href="/">
            <img src={DeleteIcon} alt="delete-icon" width={38} height={38} />
          </a>
          <Button className="m-2 rounded-[4px] bg-[#A2D2FF] font-semibold text-[#092C4C] hover:bg-[#81b1df]">
            <Link href="/">Manage Modul</Link>
          </Button>
        </div>
      </div>
      <Accordion
        type="single"
        collapsible
        className="my-5 w-full rounded-md border border-[#A2D2FF] px-2"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Pengenalan Tentang Frontend developer
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <img src={VideoIcon} alt="video-module" />
                  Video - Instalasi Software yang library
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <img src={MateriIcon} alt="video-module" />
                  Materi - Instalasi Software yang library
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <img src={TugasIcon} alt="video-module" />
                  Tugas - Instalasi Software yang library
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It{"'"}s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  <img src={KuisIcon} alt="video-module" />
                  Kuis - Instalasi Software yang library
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It{"'"}s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DropdownMenu;
