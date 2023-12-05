import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import EditProfileLayout from "@/components/layout/EditProfileLayout";

export default function EditProfileFaq() {
  return (
    <div>
      <EditProfileLayout>
      <p className="font-bold text-2xl">FAQ</p>
      <p className="mt-10 font-bold text-xl">Frequently Ask Questions</p>
      <div className="mt-7 space-y-5">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="p-3 text-white rounded-t-lg rounded-b-none bg-[#092C4C] font-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, molestiae!</AccordionTrigger>
            <AccordionContent className="p-5 border border-[#092C4C] border-opacity-50 rounded-b-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum dicta qui libero asperiores cupiditate corporis eligendi voluptas quisquam aspernatur repudiandae?
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="p-3 text-white rounded-t-lg rounded-b-none bg-[#092C4C] font-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, molestiae!</AccordionTrigger>
            <AccordionContent className="p-5 border border-[#092C4C] border-opacity-50 rounded-b-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum dicta qui libero asperiores cupiditate corporis eligendi voluptas quisquam aspernatur repudiandae?
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="p-3 text-white rounded-t-lg rounded-b-none bg-[#092C4C] font-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, molestiae!</AccordionTrigger>
            <AccordionContent className="p-5 border border-[#092C4C] border-opacity-50 rounded-b-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum dicta qui libero asperiores cupiditate corporis eligendi voluptas quisquam aspernatur repudiandae?
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="p-3 text-white rounded-t-lg rounded-b-none bg-[#092C4C] font-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, molestiae!</AccordionTrigger>
            <AccordionContent className="p-5 border border-[#092C4C] border-opacity-50 rounded-b-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum dicta qui libero asperiores cupiditate corporis eligendi voluptas quisquam aspernatur repudiandae?
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="p-3 text-white rounded-t-lg rounded-b-none bg-[#092C4C] font-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, molestiae!</AccordionTrigger>
            <AccordionContent className="p-5 border border-[#092C4C] border-opacity-50 rounded-b-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum dicta qui libero asperiores cupiditate corporis eligendi voluptas quisquam aspernatur repudiandae?
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      </EditProfileLayout>
    </div>
  );
}
