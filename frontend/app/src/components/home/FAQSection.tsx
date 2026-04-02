import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: "Do I have to pay to use EduHub?",
    answer: "No, all study resources including PDF notes, previous year solved questions, and video lectures are 100% free for all students.",
  },
  {
    question: "How is the AI Study Assistant different from ChatGPT?",
    answer: "While standard AI models search the open web and may hallucinate or provide generic answers, our Gemini-powered Study Assistant is exclusively trained on your course syllabus and official EduHub study materials. It gives you precise, context-aware answers directly relevant to your curriculum.",
  },
  {
    question: "How frequently are the notes updated?",
    answer: "Notes and past papers are reviewed and updated every semester by subject coordinators and faculty members to ensure they align exactly with the latest curriculum.",
  },
  {
    question: "Can I download the PDFs to read offline?",
    answer: "Yes, once you create a free account and open a subject, you can download all the PDF materials directly to your device for offline reading.",
  },
  {
    question: "How do I report an error in the notes?",
    answer: "If you find any discrepancies, please use the “Report Issue” button located at the bottom of the document viewer, or contact us through the Support page. Our team will verify and correct it promptly.",
  }
];

export function FAQSection() {
  return (
    <section className="py-20 section bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-label inline-block mb-2 text-muted-foreground font-semibold text-sm tracking-wider uppercase">
            Support
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about the platform and resources.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full bg-white rounded-2xl border border-border p-4 shadow-sm">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-border/60">
                <AccordionTrigger className="text-left text-base font-semibold text-primary hover:no-underline hover:text-primary/80 py-4 font-display tracking-tight">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
