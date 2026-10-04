import { Reveal } from "@/components/shared/motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { FAQS } from "../constants";
import { SectionHeading } from "./SectionHeading";

export const Faq = () => (
  <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24 bg-muted/30 py-24 sm:py-32">
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <SectionHeading id="faq-heading" eyebrow="FAQ" title="Questions, answered" />
      <Reveal className="mt-12">
        <Accordion type="single" collapsible className="rounded-2xl border bg-card px-5">
          {FAQS.map((faq, index) => (
            <AccordionItem key={faq.q} value={`faq-${index}`}>
              <AccordionTrigger className="py-5 text-left text-base font-medium">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </div>
  </section>
);
