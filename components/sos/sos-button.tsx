"use client"

import { useState, useEffect } from "react"
import { ShieldAlert } from "lucide-react"
import { SOSModal } from "./sos-modal"

/**
 * Frontend-only auth check
 * Replace later with real auth context
 */
function useIsLoggedIn() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    // simple demo logic: token or user in localStorage
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("AUTH_TOKEN") ||
        localStorage.getItem("USER")
        : null

    setLoggedIn(Boolean(token))
  }, [])

  return loggedIn
}

export function SOSButton() {
  const [isOpen, setIsOpen] = useState(false)
  const isLoggedIn = useIsLoggedIn()

  return (
    <>
      {/* FLOATING SOS BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Emergency SOS"
        aria-haspopup="dialog"
        className="
  fixed bottom-6 right-6 z-50
  flex h-16 w-16 md:h-[72px] md:w-[72px]
  items-center justify-center
  rounded-full
  bg-red-600 text-white
  shadow-[0_0_0_0_rgba(220,38,38,0.7)]
  animate-[pulse-red_2s_infinite]
  transition-transform
  hover:scale-110 active:scale-95
  focus:outline-none focus:ring-4 focus:ring-red-500/50
"

      >
        <ShieldAlert className="h-6 w-6 md:h-7 md:w-7" />
      </button>

      {/* SOS MODAL */}
      <SOSModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isLoggedIn={isLoggedIn}
      />
    </>
  )
}
