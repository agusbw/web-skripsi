import { ComplaintSteps } from "@/config/site-config";

export default function ComplaintStepsSection() {
  return (
    <section className="text-gray-600 body-font ">
      <h2 className="text-3xl font-bold text-center text-gray-900">
        Langkah-langkah mengirim pengaduan.
      </h2>
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex flex-wrap w-full">
          <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
            {ComplaintSteps.map((step, index) => {
              if (index === ComplaintSteps.length - 1)
                return (
                  <div className="flex relative" key={index}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary inline-flex items-center justify-center text-white relative z-10">
                      {step.icon}
                    </div>
                    <div className="flex-grow pl-4">
                      <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                        {step.title}
                      </h2>
                      <p className="leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                );
              return (
                <div className="flex relative pb-12" key={index}>
                  <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary inline-flex items-center justify-center text-white relative z-10">
                    {step.icon}
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                      {step.title}
                    </h2>
                    <p className="leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <img
            className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
            src="https://dummyimage.com/1200x500"
            alt="step"
          />
        </div>
      </div>
    </section>
  );
}
