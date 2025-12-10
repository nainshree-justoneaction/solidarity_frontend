"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { registrationSteps, roleLabels } from "@/lib/registrationConfig";

export default function DynamicForm({ role, step }) {
  const router = useRouter();
  const stepKey = `step${step}`;
  const fields = registrationSteps[role]?.[stepKey] || [];

  const storageKey = `regi-${role}`;
  const [formData, setFormData] = useState({});

  // Load saved data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    setFormData(saved);
  }, []);

  const handleChange = (name, value) => {
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const handleNext = () => {
    const nextStep = Number(step) + 1;
    const maxSteps = Object.keys(registrationSteps[role]).length;

    if (nextStep <= maxSteps) {
      router.push(`/registration/${role}/step${nextStep}`);
    } else {
      // FINAL SUBMISSION
      console.log("Final Data:", formData);
      router.push(`/registration/${role}/complete`);
    }
  };

  const handleBack = () => {
    const prev = Number(step) - 1;
    if (prev >= 1) router.push(`/regi/${role}/step${prev}`);
  };

  return (
    <div className="max-w-xl mx-auto p-5 space-y-5 bg-white/10 rounded-xl border border-white/20">
      <h1 className="text-2xl font-bold">
        {roleLabels[role]} – Step {step}
      </h1>

      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1">
          <label className="font-medium">{field.label}</label>

          {field.type === "text" ||
            field.type === "email" ||
            field.type === "number" ? (
            <input
              type={field.type}
              className="bg-black/20 border border-white/20 p-2 rounded"
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          ) : null}

          {field.type === "textarea" && (
            <textarea
              className="bg-black/20 border border-white/20 p-2 rounded"
              rows={3}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          )}

          {field.type === "radio" && (
            <div className="flex gap-4">
              {field.options.map((opt) => (
                <label key={opt} className="flex gap-1 items-center">
                  <input
                    type="radio"
                    name={field.name}
                    value={opt}
                    checked={formData[field.name] === opt}
                    onChange={() => handleChange(field.name, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}

          {field.type === "multi-select" && (
            <select
              multiple
              className="bg-black/20 border border-white/20 p-2 rounded"
              value={formData[field.name] || []}
              onChange={(e) =>
                handleChange(
                  field.name,
                  Array.from(e.target.selectedOptions).map((o) => o.value)
                )
              }
            >
              {field.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}

      <div className="flex justify-between mt-5">
        {step > 1 ? (
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-500 rounded"
          >
            Back
          </button>
        ) : (
          <span />
        )}

        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 rounded"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
