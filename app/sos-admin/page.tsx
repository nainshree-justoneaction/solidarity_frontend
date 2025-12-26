import Link from "next/link"
import { ShieldAlert, ArrowLeft } from "lucide-react"
import { AdminSOSDashboard } from "@/components/sos/admin-sos-dashboard"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="
        sticky top-0 z-40
        border-b border-red-800/40
        bg-red-950/90
        backdrop-blur
      ">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-red-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Exit Control Center</span>
            </Link>

            <div className="h-6 w-px bg-red-800/50" />

            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-red-600 flex items-center justify-center">
                <ShieldAlert className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-none">
                  SOS Control Center
                </p>
                <p className="text-xs text-red-200">
                  Emergency Response Dashboard
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-red-200">
              Administrator Access
            </span>
            <div className="h-8 w-8 rounded-full bg-red-700 flex items-center justify-center">
              <span className="text-xs font-bold text-white">A</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-red-600">
            Live SOS Monitoring
          </h1>
          <p className="text-muted-foreground mt-1">
            Review, assign, and resolve emergency alerts as they arrive
          </p>
        </div>

        {/* DASHBOARD */}
        <AdminSOSDashboard />
      </main>
    </div>
  )
}
