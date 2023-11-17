import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Faq() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="mx-auto scroll-m-20 pb-2 text-2xl font-semibold">FAQ</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>BAGAIMANA CARA MENDOWNLOAD HARSA?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            auctor ante quis risus posuere, ut vulputate sem tincidunt. Sed
            varius augue in justo lacinia, in dictum leo rhoncus. Integer
            lacinia nisi a libero.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>BAGAIMANA CARA MENDOWNLOAD HARSA?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>BAGAIMANA CARA MENDOWNLOAD HARSA?</AccordionTrigger>
          <AccordionContent>
            Yes. It{"'"}s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>BAGAIMANA CARA MENDOWNLOAD HARSA?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            auctor ante quis risus posuere, ut vulputate sem tincidunt. Sed
            varius augue in justo lacinia, in dictum leo rhoncus. Integer
            lacinia nisi a libero.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Faq;
