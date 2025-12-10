"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { useAuth } from "@/context/AuthContext";

interface Certificate {
  id: string;
  title: string;
  date: string;
  sdgColor: string;
}

export default function CertificatesPage() {
  const { fullName } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const completedData = JSON.parse(sessionStorage.getItem("completedModulesData") || "{}");

    const certs: Certificate[] = Object.entries(completedData)
      .filter(([_, mod]: any) => mod.certified)
      .map(([id, mod]: any) => ({
        id,
        title: mod.title,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        sdgColor: mod.sdgColor,
      }));

    setCertificates(certs);
  }, []);

  const downloadCertificate = (cert, fullName) => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;

    // Background
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, "F");

    // Elegant border
    pdf.setDrawColor(180, 180, 180);
    pdf.setLineWidth(3);
    pdf.rect(20, 20, pageWidth - 40, pageHeight - 40);

    // Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(46);
    pdf.text("CERTIFICATE OF ACHIEVEMENT", pageWidth / 2, 120, { align: "center" });

    // Subtitle line
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "normal");
    pdf.text("This certificate is proudly awarded to", pageWidth / 2, 180, { align: "center" });

    // Student Name
    pdf.setFontSize(38);
    pdf.setFont("helvetica", "bold");
    pdf.text(username, pageWidth / 2, 230, { align: "center" });

    // Module text
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "normal");
    pdf.text("for successfully completing the module:", pageWidth / 2, 280, { align: "center" });

    // Module Name
    pdf.setFontSize(32);
    pdf.setFont("helvetica", "bold");
    pdf.text(cert.title, pageWidth / 2, 330, { align: "center" });

    // Date
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(18);
    pdf.text(`Date of Completion: ${cert.date}`, pageWidth / 2, 390, { align: "center" });

    // Signature line
    pdf.setLineWidth(1);
    pdf.line(pageWidth / 2 - 120, 450, pageWidth / 2 + 120, 450);
    pdf.setFontSize(16);
    pdf.text("Social Impact Academy", pageWidth / 2, 470, { align: "center" });

    pdf.save(`${cert.title}.pdf`);
  };


  if (certificates.length === 0)
    return <p className="text-white">No certificates earned yet.</p>;

  return (
    <section className="space-y-8 px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold text-white">Your Certificates</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-black/30 border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-white">{cert.title}</h2>
              <p className="text-white/60 text-sm">Issued by: Social Impact Academy</p>
              <p className="text-white/40 text-xs">{cert.date}</p>
            </div>

            <button
              onClick={() => downloadCertificate(cert, username)}
              className="mt-6 flex items-center justify-center gap-2 px-4 py-2 bg-[#00ADEF] text-black font-medium rounded-xl hover:bg-[#00c7ff] transition-colors duration-300"
            >
              {isDownloading ? "Generating PDF..." : "Download PDF"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
