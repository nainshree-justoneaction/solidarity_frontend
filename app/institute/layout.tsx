import type React from "react"

export const metadata = {
  title: "Institute Dashboard - Solidarity",
  description: "Institute management dashboard for Solidarity platform",
}

export default function InstituteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
