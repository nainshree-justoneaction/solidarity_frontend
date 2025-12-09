"use client"

import type React from "react"

import { Sidebar } from "@/components/institute/Sidebar"

export default function InstituteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <Sidebar userType="institute" />
      <div className="flex-1 bg-black min-h-screen">{children}</div>
    </div>
  )
}
