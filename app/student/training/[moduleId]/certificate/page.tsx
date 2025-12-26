"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAuth, modulesData } from "@/context/AuthContext";

export default function CertificatePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;

  const certRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const { fullName } = useAuth();
  const [moduleName, setModuleName] = useState("");
  const [certificateId, setCertificateId] = useState("");

  /* ---------------- SECURITY GATE ---------------- */
  useEffect(() => {
    const fundraising = JSON.parse(
      localStorage.getItem("fundraising_completed") || "{}"
    );

    if (!fundraising[moduleId]) {
      router.replace(`/fundraisers/pay?module=${moduleId}`);
      return;
    }
  }, [moduleId, router]);

  /* ---------------- LOAD MODULE ---------------- */
  useEffect(() => {
    const mod = modulesData.find((m) => m.id === moduleId);
    setModuleName(mod?.title || "Training Programme");

    // generate deterministic certificate id
    const cid = `JOA-${moduleId.toUpperCase()}-${Date.now()}`;
    setCertificateId(cid);
  }, [moduleId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/student/training/${moduleId}`);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [moduleId, router]);
  const completionDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const qrPayload = JSON.stringify({
    name: fullName,
    module: moduleName,
    certificateId,
    issuedBy: "Just One Action",
    date: completionDate,
  });

  const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
    qrPayload
  )}`;

  /* ---------------- PDF GENERATION ---------------- */
  const downloadPDF = async () => {
    if (!certRef.current) return;
    setIsDownloading(true);

    const clone = certRef.current.cloneNode(true) as HTMLElement;
    clone.style.position = "fixed";
    clone.style.top = "-9999px";
    clone.style.left = "-9999px";
    clone.style.background = "#ffffff";
    document.body.appendChild(clone);

    clone.querySelectorAll("img").forEach(
      (img) => ((img as HTMLImageElement).crossOrigin = "anonymous")
    );

    const canvas = await html2canvas(clone, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`JOA-Certificate-${certificateId}.pdf`);

    document.body.removeChild(clone);
    setIsDownloading(false);
  };

  /* ---------------- UI ---------------- */
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#f4f4f4",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* ACTION BAR */}
      <button
        onClick={downloadPDF}
        disabled={isDownloading}
        style={{
          padding: "12px 28px",
          background: "#0f172a",
          color: "#fff",
          borderRadius: "10px",
          marginBottom: "24px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {isDownloading ? "Generating Certificate..." : "Download Certificate (PDF)"}
      </button>

      {/* CERTIFICATE */}
      <div
        ref={certRef}
        style={{
          width: "1100px",
          background: "#ffffff",
          border: "1px solid #ddd",
          boxShadow: "0 0 25px rgba(0,0,0,0.12)",
        }}
      >
        {/* SDG STRIP */}
        <div style={{ display: "flex", height: "18px" }}>
          {[
            "#E5243B", "#DDA63A", "#4C9F38", "#C5192D", "#FF3A21", "#26BDE2",
            "#FCC30B", "#A21942", "#FD6925", "#DD1367", "#FD9D24", "#BF8B2E",
            "#3F7E44", "#0A97D9", "#56C02B", "#00689D", "#19486A"
          ].map((c, i) => (
            <div key={i} style={{ flex: 1, backgroundColor: c }} />
          ))}
        </div>

        {/* BODY */}
        <div
          style={{
            padding: "60px",
            textAlign: "center",
            fontFamily: "Georgia, serif",
            color: "#000",
          }}
        >
          <h1 style={{ fontSize: "56px", margin: 0, fontWeight: 700 }}>
            Certificate of Completion
          </h1>

          <p style={{ fontSize: "20px", marginTop: "18px", color: "#333" }}>
            This is to certify that
          </p>

          <h2 style={{ fontSize: "38px", margin: "20px 0", fontWeight: 700 }}>
            {fullName}
          </h2>

          <p style={{ fontSize: "20px", maxWidth: "700px", margin: "0 auto" }}>
            has successfully completed the training programme
          </p>

          <p style={{ fontSize: "26px", fontWeight: 700, marginTop: "12px" }}>
            {moduleName}
          </p>

          <p style={{ fontSize: "18px", marginTop: "28px" }}>
            including learning modules and the
            <b> Fundraising & Resource Mobilization</b> chapter.
          </p>

          <p style={{ marginTop: "36px", fontSize: "16px" }}>
            Date of Completion: <b>{completionDate}</b>
          </p>

          <p style={{ fontSize: "14px", marginTop: "8px", color: "#555" }}>
            Certificate ID: <b>{certificateId}</b>
          </p>

          {/* FOOTER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <img
                src="/blue-seal.png"
                alt="Official Seal"
                style={{ width: "130px" }}
                crossOrigin="anonymous"
              />
              <p style={{ fontSize: "12px", marginTop: "6px" }}>
                Authorized Seal
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <img
                src={qrURL}
                alt="Verification QR"
                style={{ width: "140px" }}
                crossOrigin="anonymous"
              />
              <p style={{ fontSize: "12px", marginTop: "6px" }}>
                Scan to Verify
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div style={{ display: "flex", height: "18px" }}>
          {[
            "#E5243B", "#DDA63A", "#4C9F38", "#C5192D", "#FF3A21", "#26BDE2",
            "#FCC30B", "#A21942", "#FD6925", "#DD1367", "#FD9D24", "#BF8B2E",
            "#3F7E44", "#0A97D9", "#56C02B", "#00689D", "#19486A"
          ].map((c, i) => (
            <div key={i} style={{ flex: 1, backgroundColor: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}
