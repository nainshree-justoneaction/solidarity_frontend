"use client";

import { NGOProvider } from "@/context/NgoContext";
import Sidebar from "@/components/ngo/sidebar";
import { DonationsProvider } from "@/context/DonationContext";
import { NGOInternshipsProvider } from "@/context/NGOInternshipsContext";
import { NGOApplicantsProvider } from "@/context/NGOApplicantsContext";

export default function NgoLayout({ children }: { children: React.ReactNode }) {
  return (
    <NGOProvider>
      <DonationsProvider>
        <NGOInternshipsProvider>
          <NGOApplicantsProvider>
            <div className="min-h-screen flex bg-black text-white">
              {/* Sidebar */}
              <Sidebar />

              {/* Main content */}
              <main className="flex-1 p-8">
                {children}
              </main>
            </div>
          </NGOApplicantsProvider>
        </NGOInternshipsProvider>
      </DonationsProvider>
    </NGOProvider>
  );
}
