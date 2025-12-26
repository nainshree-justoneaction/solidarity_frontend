"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import {
  Shield,
  Heart,
  CloudRain,
  HelpCircle,
  MapPin,
  Clock,
  Loader2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/* ---------------- TYPES ---------------- */

interface SOSModalProps {
  isOpen: boolean
  onClose: () => void
  isLoggedIn?: boolean
}

type EmergencyType = "safety" | "medical" | "disaster" | "other"

type LocationData = {
  lat: number
  lng: number
  accuracy: number
  city?: string
  state?: string
  country?: string
} | null

/* ---------------- CONSTANTS ---------------- */

const emergencyTypes: {
  id: EmergencyType
  label: string
  icon: React.ReactNode
}[] = [
    { id: "safety", label: "Personal Safety", icon: <Shield className="h-5 w-5" /> },
    { id: "medical", label: "Medical Emergency", icon: <Heart className="h-5 w-5" /> },
    { id: "disaster", label: "Disaster / Relief", icon: <CloudRain className="h-5 w-5" /> },
    { id: "other", label: "Other", icon: <HelpCircle className="h-5 w-5" /> },
  ]

/* ---------------- HELPERS ---------------- */

// Reverse geocoding using OpenStreetMap (NO backend)
async function reverseGeocode(lat: number, lng: number) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    )
    const data = await res.json()

    return {
      city:
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        "",
      state: data.address?.state || "",
      country: data.address?.country || "",
    }
  } catch {
    return {}
  }
}

function getCurrentLocation(): Promise<LocationData> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve(null)

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        const accuracy = pos.coords.accuracy

        const place = await reverseGeocode(lat, lng)

        resolve({
          lat,
          lng,
          accuracy,
          ...place,
        })
      },
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 10000 }
    )
  })
}

/* ---------------- COMPONENT ---------------- */

export function SOSModal({
  isOpen,
  onClose,
  isLoggedIn = false,
}: SOSModalProps) {
  const [selectedType, setSelectedType] = useState<EmergencyType | null>(null)
  const [locationText, setLocationText] = useState("Detecting location…")
  const [rawLocation, setRawLocation] = useState<LocationData>(null)

  const [currentTime, setCurrentTime] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [sosSent, setSOSSent] = useState(false)
  const [cancelCountdown, setCancelCountdown] = useState<number | null>(null)

  const [phoneNumber, setPhoneNumber] = useState("")
  const [showPhoneInput, setShowPhoneInput] = useState(false)

  /* -------- CLOCK -------- */
  useEffect(() => {
    const update = () =>
      setCurrentTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      )
    update()
    const i = setInterval(update, 1000)
    return () => clearInterval(i)
  }, [])

  /* -------- LOCATION -------- */
  useEffect(() => {
    if (!isOpen) return

    setLocationText("Detecting location…")
    setRawLocation(null)

    getCurrentLocation().then((loc) => {
      if (!loc) {
        setLocationText("Location unavailable")
        return
      }

      setRawLocation(loc)

      const cityLine = [loc.city, loc.state, loc.country]
        .filter(Boolean)
        .join(", ")

      setLocationText(
        `${cityLine || "Unknown location"} • Lat ${loc.lat.toFixed(
          4
        )}, Lng ${loc.lng.toFixed(4)} (±${Math.round(loc.accuracy)}m)`
      )
    })
  }, [isOpen])

  /* -------- COUNTDOWN -------- */
  useEffect(() => {
    if (cancelCountdown === null) return

    if (cancelCountdown > 0) {
      const t = setTimeout(
        () => setCancelCountdown((c) => (c ? c - 1 : c)),
        1000
      )
      return () => clearTimeout(t)
    }

    if (cancelCountdown === 0) {
      setIsSending(true)

      setTimeout(() => {
        const sosEvent = {
          id: `sos-${Date.now()}`,
          type: selectedType,
          createdAt: new Date().toISOString(),
          location: rawLocation,
          locationText,
          userType: isLoggedIn ? "logged_in" : "guest",
          phone: phoneNumber || null,
          status: "pending",
        }

        const existing = JSON.parse(
          localStorage.getItem("SOS_EVENTS") || "[]"
        )

        localStorage.setItem(
          "SOS_EVENTS",
          JSON.stringify([sosEvent, ...existing])
        )

        setIsSending(false)
        setSOSSent(true)
        if (!isLoggedIn) setShowPhoneInput(true)
      }, 1200)
    }
  }, [
    cancelCountdown,
    selectedType,
    rawLocation,
    locationText,
    phoneNumber,
    isLoggedIn,
  ])

  /* -------- ACTIONS -------- */
  const handleSendSOS = useCallback(() => {
    if (!selectedType) return
    setCancelCountdown(3)
  }, [selectedType])

  const handleCancel = useCallback(() => {
    setCancelCountdown(null)
  }, [])

  const handleClose = useCallback(() => {
    setSelectedType(null)
    setSOSSent(false)
    setCancelCountdown(null)
    setShowPhoneInput(false)
    setPhoneNumber("")
    onClose()
  }, [onClose])

  /* ---------------- UI ---------------- */

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 gap-0 border-2 border-red-600 bg-background shadow-2xl">
        <DialogHeader className="px-6 py-4 bg-red-600 text-white">
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            EMERGENCY SOS
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {!sosSent ? (
            <>
              <div className="space-y-3">
                <Label>Select emergency type</Label>
                <div className="grid grid-cols-2 gap-3">
                  {emergencyTypes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedType(t.id)}
                      className={`rounded-lg border-2 p-4 flex flex-col items-center gap-2 transition-all ${selectedType === t.id
                        ? "border-red-600 bg-red-600 text-white scale-105"
                        : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                        }`}
                    >
                      {t.icon}
                      <span className="text-xs font-medium">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-red-300/40 bg-red-500/5 backdrop-blur-sm p-4 space-y-2 text-sm">
                <div className="flex gap-2 items-center">
                  <MapPin className="h-4 w-4" />
                  {locationText}
                </div>
                <div className="flex gap-2 items-center">
                  <Clock className="h-4 w-4" />
                  {currentTime}
                </div>
              </div>

              {cancelCountdown !== null ? (
                <div className="space-y-3 text-center">
                  <div className="flex justify-center gap-2">
                    <Loader2 className="animate-spin" />
                    Sending in {cancelCountdown}s
                  </div>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full py-6 text-base font-bold bg-red-600 hover:bg-red-700 text-white tracking-wide"
                  disabled={!selectedType || isSending}
                  onClick={handleSendSOS}
                >
                  SEND SOS NOW
                </Button>
              )}
            </>
          ) : (
            <>
              <div className="text-center space-y-3">
                <div className="mx-auto h-16 w-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-2xl">
                  ✓
                </div>
                <h3 className="text-lg font-semibold text-red-600">
                  SOS Successfully Recorded
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your SOS has been logged and responders are being alerted.
                </p>
              </div>

              {!isLoggedIn && showPhoneInput && (
                <div className="space-y-3">
                  <Label>Optional phone number</Label>
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                  />
                  <Button variant="outline" onClick={handleClose}>
                    {phoneNumber ? "Submit & Close" : "Skip"}
                  </Button>
                </div>
              )}

              {isLoggedIn && (
                <Button variant="outline" onClick={handleClose}>
                  Close
                </Button>
              )}
            </>
          )}
        </div>

        <div className="border-t px-6 py-3 text-xs text-center text-muted-foreground">
          This platform assists in alerting responders and does not replace
          official emergency services.
        </div>
      </DialogContent>
    </Dialog>
  )
}
