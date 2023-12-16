/* eslint-disable react/prop-types */
import ReactPlayer from "react-player";
import VideoIcon from "@/assets/icons/videoModule.svg";
import MateriIcon from "@/assets/icons/materiModule.svg";
import TugasIcon from "@/assets/icons/tugasModule.svg";
import KuisIcon from "@/assets/icons/kuisModule.svg";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getModuleById } from "@/utils/apis/modules/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CardModule = () => {
  const params = useParams();
  const [Modules, setModules] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getModuleById(+params.id);
      setModules(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div>
      {Modules && Modules ? (
        <div className="mx-2 my-3 h-full border border-slate-300 px-2 font-poppins">
          <Accordion
            type="single"
            collapsible
            className="my-5 w-full rounded-md border border-[#A2D2FF] px-2"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="justify-between">
                {Modules.title}
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="my-1 w-full">
                  {Modules.sub_modules?.map((subModule) => (
                    <div key={subModule.id}>
                      {subModule.type === "video" ? (
                        <AccordionItem value="item-1">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <img src={VideoIcon} alt="video-module" />
                              {subModule.title}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ReactPlayer url={subModule.content_url} />
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <AccordionItem value="item-2">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <img src={MateriIcon} alt="video-module" />
                              {subModule.title}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ReactPlayer url={subModule.content_url} />
                          </AccordionContent>
                        </AccordionItem>
                      )}
                    </div>
                  ))}
                  {Modules.submissions?.map((submission) => (
                    <div key={submission.id}>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <img src={TugasIcon} alt="video-module" />
                            {submission.title}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <h1>{submission.content}</h1>
                        </AccordionContent>
                      </AccordionItem>
                    </div>
                  ))}
                  {Modules.quizzes?.map((quizze) => (
                    <div key={quizze.id}>
                      <AccordionItem value="item-4">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <img src={KuisIcon} alt="video-module" />
                            {quizze.title}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <h1>{quizze.description}</h1>
                          <h1>{quizze.duration}</h1>
                        </AccordionContent>
                      </AccordionItem>
                    </div>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ) : (
        <div className="mb-8 text-center">Belum Ada Modul</div>
      )}
    </div>
  );
};

export default CardModule;
