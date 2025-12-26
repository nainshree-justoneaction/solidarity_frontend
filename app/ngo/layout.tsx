"use client";

import { NGOProvider } from "@/context/NgoContext";
import { DonationsProvider } from "@/context/DonationContext";
import { NGOInternshipsProvider } from "@/context/NGOInternshipsContext";
import { NGOApplicantsProvider } from "@/context/NGOApplicantsContext";

import Sidebar from "@/components/ngo/sidebar";
import NGOHeader from "@/components/ngo/header";

export default function NgoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NGOProvider>
      <DonationsProvider>
        <NGOInternshipsProvider>
          <NGOApplicantsProvider>

            {/* FULL SCREEN LOCK */}
            <div className="h-screen flex overflow-hidden bg-black text-white">

              {/* SIDEBAR (NEVER SCROLLS) */}
              <aside className="w-64 shrink-0 border-r border-white/10">
                <Sidebar />
              </aside>

              {/* RIGHT SIDE */}
              <div className="flex-1 flex flex-col overflow-hidden">

                {/* HEADER (STICKY) */}
                <NGOHeader
                  title="NGO Dashboard"
                  subtitle="Manage operations & impact"
                />

                {/* ONLY THIS SCROLLS */}
                <main className="flex-1 overflow-y-auto p-8">
                  {children}
                </main>

              </div>
            </div>

          </NGOApplicantsProvider>
        </NGOInternshipsProvider>
      </DonationsProvider>
    </NGOProvider>
  );
}
