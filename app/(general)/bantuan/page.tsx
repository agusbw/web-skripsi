import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HelpPage() {
  return (
    <div>
      <div
        className={
          "bg-secondary text-secondary-foreground lg:px-24 lg:py-28 py-16 text-center"
        }
      >
        <h1 className={"text-3xl mb-4 font-bold"}>Bantuan Pengguna</h1>
        <p>
          Kami telah mengumpulkan hal-hal yang sering ditanyakan oleh para
          pengguna yang lainnya.
        </p>
      </div>
      <div
        className={"border mx-4 lg:mx-48 lg:mt-10 px-5 mt-12 mb-12 lg:mb-28"}
      >
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>SiPem itu aplikasi apa?</AccordionTrigger>
            <AccordionContent>
              SiPem adalah platform digital yang membantu anda dalam mengelola
              dan memonitoring keuangan anda. SiPem juga dapat membantu anda
              dalam
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Apa yang melatar belakangi lahirnya SiPem?
            </AccordionTrigger>
            <AccordionContent>
              SiPem adalah platform digital yang membantu anda dalam mengelola
              dan memonitoring keuangan anda. SiPem juga dapat membantu anda
              dalam
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Bagaimana caranya melapor keluhan?
            </AccordionTrigger>
            <AccordionContent>
              SiPem adalah platform digital yang membantu anda dalam mengelola
              dan memonitoring keuangan anda. SiPem juga dapat membantu anda
              dalam
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Ada bug atau error, harus lapor kemana?
            </AccordionTrigger>
            <AccordionContent>
              SiPem adalah platform digital yang membantu anda dalam mengelola
              dan memonitoring keuangan anda. SiPem juga dapat membantu anda
              dalam
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              Apa status pengembangan dari platform ini?
            </AccordionTrigger>
            <AccordionContent>
              SiPem adalah platform digital yang membantu anda dalam mengelola
              dan memonitoring keuangan anda. SiPem juga dapat membantu anda
              dalam
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
