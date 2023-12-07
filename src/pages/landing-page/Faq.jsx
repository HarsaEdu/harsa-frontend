import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Faq() {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
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
    <div className="bg-[#092C4C] text-white font-poppins">
      <div className="mx-10 flex flex-col items-center justify-center py-5 pb-10">
        <h2 className="mx-auto scroll-m-20 pb-5 text-2xl font-semibold">FAQ</h2>
        <Accordion type="single" collapsible className="w-full mt-7 space-y-5">
          {faqData.map((faq) => (
            <AccordionItem key={faq.id} value={`item-${faq.id}`}>
              <AccordionTrigger className="text-xl font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default Faq;
