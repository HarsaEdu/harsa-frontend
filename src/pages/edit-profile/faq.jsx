import { React, useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from "axios";
import EditProfileLayout from "@/components/layout/EditProfileLayout";

export default function EditProfileFaq() {

  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    // Mengambil data dari backend saat komponen dimuat
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.harsaedu.my.id/web/faqs?offset=0&limit=10"
        );
        const data = response.data.data;
        setFaqData(data);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <EditProfileLayout>
      <p className="font-bold text-2xl">FAQ</p>
      <p className="mt-10 font-bold text-xl">Frequently Ask Questions</p>
      <div className="mt-7 space-y-5">
          <Accordion type="single" collapsible className="w-full mt-7 space-y-5">
            {faqData.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                <AccordionTrigger className="p-3 text-white rounded-t-lg rounded-b-none bg-[#092C4C] font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="p-5 border border-[#092C4C] border-opacity-50 rounded-b-lg">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </EditProfileLayout>
    </div>
  );
}
