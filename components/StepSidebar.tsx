"use client";

type StepSidebarProps = {
  activeStep: number; // 1, 2, 3, or 4
};

export default function StepSidebar({ activeStep }: StepSidebarProps) {
  const steps = [
    "Personal Details",
    "Address Details",
    "Interest Selection",
  ];

  return (
    <div className="flex flex-col gap-10 w-64 pt-10">

      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = activeStep === stepNumber;

        return (
          <div key={index} className="flex flex-col">
            {/* Left Blue Line Indicator */}
            <div
              className={`h-8 w-[2px] transition-all ${
                isActive ? "bg-[#00ADEF]" : "bg-white/10"
              }`}
            ></div>

            {/* Text */}
            <span
              className={`mt-3 text-sm tracking-wide ${
                isActive ? "text-white" : "text-white/40"
              }`}
            >
              Step {stepNumber} — {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
