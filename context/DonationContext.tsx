"use client"

import { createContext, useState, ReactNode } from "react"

/* ================= TYPES ================= */

interface Donation {
  id: number
  donor: string
  amount: number
  date: string
  status: string
}

interface DonationRequest {
  id: number
  title: string
  target: number
  collected: number
  percentage: number
  donors: Donation[]
}

interface MaterialRequest {
  id: string
  category: string
  quantity: string
  city: string
  status: "Open" | "Assigned" | "Collected"
}

interface LedgerEntry {
  id: number
  description: string
  amount: number
  category: string
}

interface Donor {
  id: number
  name: string
  totalDonation: number
  donations: number
}

interface DonationsContextType {
  incomingDonations: Donation[]
  donations: DonationRequest[]
  materialRequests: MaterialRequest[]
  ledger: LedgerEntry[]
  donors: Donor[]
  addDonation: (donation: Donation, donationRequestId?: number) => void
  addDonationRequest: (request: { title: string; target: number }) => number
  addMaterialRequest: (request: Omit<MaterialRequest, "id" | "status">) => void
}

/* ================= CONTEXT ================= */

export const DonationsContext = createContext<DonationsContextType>({
  incomingDonations: [],
  donations: [],
  materialRequests: [],
  ledger: [],
  donors: [],
  addDonation: () => {},
  addDonationRequest: () => 0,
  addMaterialRequest: () => {},
})

/* ================= PROVIDER ================= */

export const DonationsProvider = ({ children }: { children: ReactNode }) => {

  /* -------- Money Donations -------- */

  const [incomingDonations, setIncomingDonations] = useState<Donation[]>([
    {
      id: 1,
      donor: "John Smith",
      amount: 5000,
      date: "2025-01-10",
      status: "Received",
    },
  ])

  const [donations, setDonations] = useState<DonationRequest[]>([
    {
      id: 101,
      title: "Educational Materials",
      target: 10000,
      collected: 5000,
      percentage: 50,
      donors: [],
    },
  ])

  /* -------- Material Donations -------- */

  const [materialRequests, setMaterialRequests] = useState<MaterialRequest[]>([
    {
      id: "mat-1",
      category: "Books",
      quantity: "50 books",
      city: "Indore",
      status: "Open",
    },
    {
      id: "mat-2",
      category: "Clothes",
      quantity: "30 items",
      city: "Bhopal",
      status: "Assigned",
    },
  ])

  /* -------- Ledger + Donors -------- */

  const [ledger, setLedger] = useState<LedgerEntry[]>([
    { id: 1, description: "Initial Donation", amount: 5000, category: "Income" },
  ])

  const [donors, setDonors] = useState<Donor[]>([
    { id: 1, name: "John Smith", totalDonation: 5000, donations: 1 },
  ])

  /* ================= ACTIONS ================= */

  const addDonationRequest = ({ title, target }: { title: string; target: number }) => {
    const newRequest: DonationRequest = {
      id: Date.now(),
      title,
      target,
      collected: 0,
      percentage: 0,
      donors: [],
    }
    setDonations(prev => [newRequest, ...prev])
    return newRequest.id
  }

  const addDonation = (donation: Donation, donationRequestId?: number) => {
    const safeDonation = { ...donation, amount: Number(donation.amount) || 0 }

    setIncomingDonations(prev => [safeDonation, ...prev])

    if (donationRequestId) {
      setDonations(prev =>
        prev.map(req =>
          req.id === donationRequestId
            ? {
                ...req,
                collected: req.collected + safeDonation.amount,
                percentage: Math.min(
                  100,
                  Math.round(
                    ((req.collected + safeDonation.amount) / req.target) * 100
                  )
                ),
                donors: [...req.donors, safeDonation],
              }
            : req
        )
      )
    }

    setLedger(prev => [
      {
        id: Date.now(),
        description: `Donation from ${safeDonation.donor}`,
        amount: safeDonation.amount,
        category: "Income",
      },
      ...prev,
    ])

    setDonors(prev => {
      const existing = prev.find(d => d.name === safeDonation.donor)
      if (existing) {
        return prev.map(d =>
          d.name === safeDonation.donor
            ? {
                ...d,
                totalDonation: d.totalDonation + safeDonation.amount,
                donations: d.donations + 1,
              }
            : d
        )
      }
      return [
        ...prev,
        {
          id: Date.now(),
          name: safeDonation.donor,
          totalDonation: safeDonation.amount,
          donations: 1,
        },
      ]
    })
  }

  const addMaterialRequest = ({
    category,
    quantity,
    city,
  }: Omit<MaterialRequest, "id" | "status">) => {
    setMaterialRequests(prev => [
      {
        id: `mat-${Date.now()}`,
        category,
        quantity,
        city,
        status: "Open",
      },
      ...prev,
    ])
  }

  /* ================= PROVIDER ================= */

  return (
    <DonationsContext.Provider
      value={{
        incomingDonations,
        donations,
        materialRequests,
        ledger,
        donors,
        addDonation,
        addDonationRequest,
        addMaterialRequest,
      }}
    >
      {children}
    </DonationsContext.Provider>
  )
}
