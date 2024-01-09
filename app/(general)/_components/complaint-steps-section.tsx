import { ComplaintSteps } from "@/config/site-config";
import Image from "next/image";

export default function ComplaintStepsSection() {
  return (
    <section
      className="py-12 body-font"
      id="step"
    >
      <h2 className="text-3xl font-medium text-center">
        Langkah-langkah mengajukan surat
      </h2>
      <div className="container flex flex-wrap px-5 mx-auto mt-10">
        <div className="flex flex-wrap w-full">
          <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
            {ComplaintSteps.map((step, index) => {
              if (index === ComplaintSteps.length - 1)
                return (
                  <div
                    className="relative flex"
                    key={index}
                  >
                    <div className="relative z-10 inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-full bg-primary">
                      {step.icon}
                    </div>
                    <div className="flex-grow pl-4">
                      <h2 className="mb-1 text-sm font-medium tracking-wider text-gray-900 title-font">
                        {step.title}
                      </h2>
                      <p className="leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                );
              return (
                <div
                  className="relative flex pb-12"
                  key={index}
                >
                  <div className="absolute inset-0 flex items-center justify-center w-10 h-full">
                    <div className="w-1 h-full bg-gray-200 pointer-events-none"></div>
                  </div>
                  <div className="relative z-10 inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-full bg-primary">
                    {step.icon}
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="mb-1 text-sm font-medium tracking-wider text-gray-900 title-font">
                      {step.title}
                    </h2>
                    <p className="leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <Image
            className="hidden lg:block object-center mt-12 rounded-lg lg:w-3/5 md:w-1/2 md:mt-0 scale-90"
            src="/tata-cara.svg"
            alt="step"
            width={200}
            height={200}
          />
        </div>
      </div>
    </section>
  );
}
