"use client";

import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CertificatePage() {
  const certRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const userName = "Nainshree Verma";
  const moduleName = "Social Training";
  const date = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const sdgColors = [
    "#E5243B", "#DDA63A", "#4C9F38", "#C5192D", "#FF3A21",
    "#26BDE2", "#FCC30B", "#A21942", "#FD6925", "#DD1367",
    "#FD9D24", "#BF8B2E", "#3F7E44", "#0A97D9", "#56C02B",
    "#00689D", "#19486A"
  ];

  const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(userName + "-" + moduleName)}`;

  const downloadPDF = async () => {
    if (!certRef.current) return;
    setIsDownloading(true);

    const element = certRef.current;

    // Clone the element offscreen
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.position = "fixed";
    clone.style.top = "-9999px";
    clone.style.left = "-9999px";
    clone.style.background = "#ffffff";
    document.body.appendChild(clone);

    // Make all images crossOrigin
    clone.querySelectorAll("img").forEach((img) => (img.crossOrigin = "anonymous"));

    // Capture with html2canvas
    const canvas = await html2canvas(clone, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

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
        style={{
          padding: "10px 20px",
          background: "black",
          color: "white",
          borderRadius: "8px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        {isDownloading ? "Generating PDF..." : "Download Certificate (PDF)"}
      </button>

      <div
        ref={certRef}
        style={{
          width: "1100px",
          background: "white",
          border: "1px solid #ccc",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          paddingBottom: "20px",
        }}
      >
        {/* Top SDG Bar */}
        <div style={{ display: "flex", width: "100%", height: "20px" }}>
          {sdgColors.map((c, i) => (
            <div key={i} style={{ flex: 1, backgroundColor: c }} />
          ))}
        </div>

        {/* Certificate Content */}
        <div style={{ padding: "50px", textAlign: "center", fontFamily: "Arial, sans-serif", color: "#000" }}>
          <h1 style={{ fontSize: "60px", margin: 0, fontWeight: "bold" }}>CERTIFICATE</h1>
          <p style={{ fontSize: "28px", marginTop: "10px" }}>OF ACHIEVEMENT</p>

          <div style={{ width: "150px", height: "4px", backgroundColor: "black", margin: "30px auto" }} />

          <p style={{ fontSize: "24px", marginTop: "40px" }}>This certificate is proudly awarded to</p>
          <h2 style={{ fontSize: "40px", fontWeight: "bold", marginTop: "20px" }}>{userName}</h2>

          <p style={{ fontSize: "22px", marginTop: "40px" }}>for successfully completing the training module:</p>
          <p style={{ fontSize: "28px", fontWeight: "bold", marginTop: "10px" }}>{moduleName}</p>

          <p style={{ marginTop: "50px", fontSize: "20px" }}>Date of Completion: <b>{date}</b></p>

          {/* Seal + QR */}
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: "40px" }}>
            <div style={{ textAlign: "center" }}>
              <img src="https://i.ibb.co/7rp6WPf/blue-seal.png" alt="Seal" style={{ width: "150px" }} crossOrigin="anonymous" />
              <p style={{ fontSize: "12px", marginTop: "5px" }}>Official Seal</p>
            </div>

            <div style={{ textAlign: "center" }}>
              <img src={qrURL} alt="QR Code" style={{ width: "150px" }} crossOrigin="anonymous" />
              <p style={{ fontSize: "12px", marginTop: "5px" }}>Scan to Verify</p>
            </div>
          </div>
        </div>

        {/* Bottom SDG Bar */}
        <div style={{ display: "flex", width: "100%", height: "20px" }}>
          {sdgColors.map((c, i) => (
            <div key={i} style={{ flex: 1, backgroundColor: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}
