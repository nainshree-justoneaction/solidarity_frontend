"use client"

import { useState } from "react"
import { Topbar } from "@/components/institute/Topbar"
import { Upload, Download } from "lucide-react"
import * as XLSX from "xlsx"

const SDG_COLORS = [
  "#E5243B", "#DDA63A", "#4C9F38", "#C5192D", "#FF3A21",
  "#26BDE2", "#FCC30B", "#A21942", "#FD6925", "#DD1367",
  "#FD9D24", "#BF8B2E", "#3F7E44", "#0A97D9", "#56C02B",
  "#00689D", "#19486A"
]

export default function InstituteStudents() {
  const [students, setStudents] = useState<any[]>([])

  const statusColor = (status: string) => {
    if (status === "Active") return "bg-green-500"
    if (status === "Completed") return "bg-gray-500"
    return "bg-gray-700"
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Excel data ko JSON me convert karte hue proper headers define karo
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: ["Name", "Email", "Department", "Year", "Status", "Faculty"], // JSON keys
        range: 1 // first row skip karna agar headers Excel me already hain
      });

      // Trim spaces and normalize keys
      const cleanData = jsonData.map(row => ({
        Name: String(row.Name || "").trim(),
        Email: String(row.Email || "").trim(),
        Department: String(row.Department || "").trim(),
        Year: String(row.Year || "").trim(),
        Status: String(row.Status || "").trim(),
        Faculty: String(row.Faculty || "").trim()
      }));

      setStudents(cleanData);
      console.log(cleanData);
    };
    reader.readAsArrayBuffer(file);
  };


  const downloadSample = () => {
    const sampleData = [
      { Name: "Alex Johnson", Email: "alex@uni.edu", Department: "CS", Year: "3", Status: "Active", Faculty: "Dr. Smith" }
    ]
    const worksheet = XLSX.utils.json_to_sheet(sampleData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students")
    XLSX.writeFile(workbook, "sample_students.xlsx")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Topbar title="Students" />
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex gap-3 mb-6">
          <label className="flex items-center gap-2 bg-white text-black font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition cursor-pointer">
            <Upload size={18} /> Upload Excel
            <input type="file" accept=".xlsx, .xls" onChange={handleUpload} className="hidden" />
          </label>
          <button
            onClick={downloadSample}
            className="flex items-center gap-2 bg-black border border-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:border-gray-400 transition"
          >
            <Download size={18} /> Download Sample
          </button>
        </div>

        <div className="bg-black border border-gray-800 rounded-2xl overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-900">
                {["Name", "Email", "Department", "Year", "Status", "Faculty"].map((col) => (
                  <th key={col} className="px-6 py-3 text-left font-semibold">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-800 hover:bg-gray-900 transition"
                  style={{ borderLeft: `4px solid ${SDG_COLORS[i % SDG_COLORS.length]}` }}
                >
                  <td className="px-6 py-4 font-medium">{s.Name || s.name}</td>
                  <td className="px-6 py-4 text-gray-300">{s.Email || s.email}</td>
                  <td className="px-6 py-4 text-gray-300">{s.Department || s.dept}</td>
                  <td className="px-6 py-4 text-gray-300">{s.Year || s.year}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${statusColor(s.Status || s.status)}`}>
                      {s.Status || s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{s.Faculty || s.faculty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
