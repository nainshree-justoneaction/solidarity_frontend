"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function NgoDashboard() {
  const metrics = [
    { label: "Total Volunteers", value: "128", color: "bg-sdg3" },
    { label: "Ongoing Projects", value: "12", color: "bg-sdg4" },
    { label: "Beneficiaries Reached", value: "8,420", color: "bg-sdg1" },
    { label: "Funds Raised", value: "₹12.4L", color: "bg-sdg17" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      {/* Header */}
      <header className="flex justify-between items-center bg-white rounded-2xl p-4 shadow-sm mb-8">
        <h1 className="text-2xl font-semibold">NGO Dashboard</h1>
        <div className="flex items-center gap-3">
          <span className="text-gray-600">Nainshree NGO</span>
          <div className="w-10 h-10 rounded-full bg-gray-200" />
        </div>
      </header>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-md border"
          >
            <div className={`h-2 w-full rounded-full mb-4 ${m.color}`} />
            <h2 className="text-3xl font-bold">{m.value}</h2>
            <p className="text-gray-600 text-sm">{m.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left - Ongoing Initiatives */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Ongoing Initiatives</h2>

          <div className="space-y-4">
            {[
              { name: "Clean Water Drive", sdg: "bg-sdg6" },
              { name: "Girl Child Education", sdg: "bg-sdg4" },
              { name: "Zero Hunger Program", sdg: "bg-sdg2" },
            ].map((p, i) => (
              <div
                key={i}
                className="p-4 border rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${p.sdg}`} />
                  <span className="font-medium">{p.name}</span>
                </div>
                <button className="text-blue-600 font-medium">View</button>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Activity Feed */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

          <div className="space-y-6">
            {[
              { text: "New volunteer registered", sdg: "bg-sdg3" },
              { text: "Donation received ₹5,000", sdg: "bg-sdg17" },
              { text: "Health camp completed", sdg: "bg-sdg3" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`mt-1 w-3 h-3 rounded-full ${item.sdg}`} />
                <p className="text-gray-700 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
