"use client";

import { NgoProvider } from "@/context/NgoContext";
import Sidebar from "@/components/ngo/sidebar";
import { DonationsProvider } from "@/context/DonationContext";

export default function NgoLayout({ children }: { children: React.ReactNode }) {
  return (
    <NgoProvider>
      <DonationsProvider>

        <div className="min-h-screen flex bg-black text-white">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content */}
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </DonationsProvider>
    </NgoProvider>
  );
}
