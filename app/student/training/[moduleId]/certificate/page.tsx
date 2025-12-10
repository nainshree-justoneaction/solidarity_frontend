"use client";
import { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAuth } from "@/context/AuthContext";
import { modulesData } from "@/context/AuthContext";

interface CertificatePageProps {
  moduleId: string;
}

export default function CertificatePage({ moduleId }: CertificatePageProps) {
  const certRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { fullName } = useAuth();
  const [moduleName, setModuleName] = useState("Training Module");

  useEffect(() => {
    const mod = modulesData.find((m) => m.id === moduleId);
    if (mod) setModuleName(mod.title);
  }, [moduleId]);

  const date = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(fullName + "-" + moduleName)}`;

  const downloadPDF = async () => {
    if (!certRef.current) return;
    setIsDownloading(true);

    const clone = certRef.current.cloneNode(true) as HTMLElement;
    clone.style.position = "fixed";
    clone.style.top = "-9999px";
    clone.style.left = "-9999px";
    clone.style.background = "#ffffff";
    document.body.appendChild(clone);

    clone.querySelectorAll("img").forEach((img) => (img.crossOrigin = "anonymous"));

    const canvas = await html2canvas(clone, { scale: 3, useCORS: true, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("certificate.pdf");

    document.body.removeChild(clone);
    setIsDownloading(false);
  };

  return (
    <div style={{ minHeight: "100vh", padding: "40px", background: "#f4f4f4", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <button
        onClick={downloadPDF}
        disabled={isDownloading}
        style={{ padding: "10px 20px", background: "black", color: "white", borderRadius: "8px", marginBottom: "20px", cursor: "pointer" }}
      >
        {isDownloading ? "Generating PDF..." : "Download Certificate (PDF)"}
      </button>

      <div ref={certRef} style={{ width: "1100px", background: "white", border: "1px solid #ccc", boxShadow: "0 0 20px rgba(0,0,0,0.1)", paddingBottom: "20px" }}>
        <div style={{ display: "flex", width: "100%", height: "20px" }}>
          {Array.from({ length: 17 }).map((_, i) => <div key={i} style={{ flex: 1, backgroundColor: ["#E5243B","#DDA63A","#4C9F38","#C5192D","#FF3A21","#26BDE2","#FCC30B","#A21942","#FD6925","#DD1367","#FD9D24","#BF8B2E","#3F7E44","#0A97D9","#56C02B","#00689D","#19486A"][i] }} />)}
        </div>

        <div style={{ padding: "50px", textAlign: "center", fontFamily: "Arial, sans-serif", color: "#000" }}>
          <h1 style={{ fontSize: "60px", margin: 0, fontWeight: "bold" }}>CERTIFICATE</h1>
          <p style={{ fontSize: "28px", marginTop: "10px" }}>OF ACHIEVEMENT</p>
          <div style={{ width: "150px", height: "4px", backgroundColor: "black", margin: "30px auto" }} />
          <p style={{ fontSize: "24px", marginTop: "40px" }}>This certificate is proudly awarded to</p>
          <h2 style={{ fontSize: "40px", fontWeight: "bold", marginTop: "20px" }}>{fullName}</h2>
          <p style={{ fontSize: "22px", marginTop: "40px" }}>for successfully completing the training module:</p>
          <p style={{ fontSize: "28px", fontWeight: "bold", marginTop: "10px" }}>{moduleName}</p>
          <p style={{ marginTop: "50px", fontSize: "20px" }}>Date of Completion: <b>{date}</b></p>

          <div style={{ display: "flex", justifyContent: "space-around", marginTop: "40px" }}>
            <div style={{ textAlign: "center" }}>
              <img src="/home/nainshree/solidarity-frontend /public/blue-seal.png" alt="Seal" style={{ width: "150px" }} crossOrigin="anonymous" />
              <p style={{ fontSize: "12px", marginTop: "5px" }}>Official Seal</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <img src={qrURL} alt="QR Code" style={{ width: "150px" }} crossOrigin="anonymous" />
              <p style={{ fontSize: "12px", marginTop: "5px" }}>Scan to Verify</p>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", width: "100%", height: "20px" }}>
          {Array.from({ length: 17 }).map((_, i) => <div key={i} style={{ flex: 1, backgroundColor: ["#E5243B","#DDA63A","#4C9F38","#C5192D","#FF3A21","#26BDE2","#FCC30B","#A21942","#FD6925","#DD1367","#FD9D24","#BF8B2E","#3F7E44","#0A97D9","#56C02B","#00689D","#19486A"][i] }} />)}
        </div>
      </div>
    </div>
  );
}
