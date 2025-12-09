"use client";
import { createContext, useState, ReactNode } from "react";

interface Donation {
  id: number;
  donor: string;
  amount: number;
  date: string;
  status: string;
}

interface DonationRequest {
  id: number;
  title: string;
  target: number;
  collected: number;
  percentage: number;
  donors: Donation[];
}

interface LedgerEntry {
  id: number;
  description: string;
  amount: number;
  category: string; 
}

interface Donor {
  id: number;
  name: string;
  totalDonation: number;
  donations: number;
}

interface DonationsContextType {
  incomingDonations: Donation[];
  donations: DonationRequest[];
  ledger: LedgerEntry[];
  donors: Donor[];
  addDonation: (donation: Donation, donationRequestId?: number) => void;
  addDonationRequest: (request: { title: string; target: number }) => number;
}

export const DonationsContext = createContext<DonationsContextType>({
  incomingDonations: [],
  donations: [],
  ledger: [],
  donors: [],
  addDonation: () => {},
  addDonationRequest: () => 0,
});

export const DonationsProvider = ({ children }: { children: ReactNode }) => {

  // -----------------------------
  // SEED DATA — important
  // -----------------------------
  const [incomingDonations, setIncomingDonations] = useState<Donation[]>([
    {
      id: 1,
      donor: "John Smith",
      amount: 5000,
      date: "2025-01-10",
      status: "Received"
    }
  ]);

  const [donations, setDonations] = useState<DonationRequest[]>([
    {
      id: 101,
      title: "Educational Materials",
      target: 10000,
      collected: 5000,
      percentage: 50,
      donors: []
    },
    {
      id: 102,
      title: "Medical Supplies",
      target: 15000,
      collected: 8000,
      percentage: 53,
      donors: []
    }
  ]);

  const [ledger, setLedger] = useState<LedgerEntry[]>([
    { id: 1, description: "Initial Donation", amount: 5000, category: "Income" }
  ]);

  const [donors, setDonors] = useState<Donor[]>([
    { id: 1, name: "John Smith", totalDonation: 5000, donations: 1 }
  ]);

  // -----------------------------
  // CREATE NEW DONATION REQUEST
  // -----------------------------
  const addDonationRequest = ({ title, target }: { title: string; target: number }) => {
    const newRequest: DonationRequest = {
      id: Date.now(),
      title,
      target,
      collected: 0,
      percentage: 0,
      donors: [],
    };

    setDonations(prev => [newRequest, ...prev]);
    return newRequest.id;
  };

  // -----------------------------
  // ADD DONATION TO REQUEST
  // -----------------------------
  const addDonation = (donation: Donation, donationRequestId?: number) => {
    const safeDonation = {
      ...donation,
      amount: Number(donation.amount) || 0
    };

    setIncomingDonations(prev => [safeDonation, ...prev]);

    if (donationRequestId) {
      setDonations(prev =>
        prev.map(request =>
          request.id === donationRequestId
            ? {
                ...request,
                collected: request.collected + safeDonation.amount,
                percentage: Math.min(
                  100,
                  Math.round(((request.collected + safeDonation.amount) / request.target) * 100)
                ),
                donors: [...request.donors, safeDonation]
              }
            : request
        )
      );
    }

    setLedger(prev => [
      {
        id: Date.now(),
        description: `Donation from ${safeDonation.donor}`,
        amount: safeDonation.amount,
        category: "Income",
      },
      ...prev,
    ]);

    setDonors(prev => {
      const existing = prev.find(d => d.name === safeDonation.donor);
      if (existing) {
        return prev.map(d =>
          d.name === safeDonation.donor
            ? {
                ...d,
                totalDonation: d.totalDonation + safeDonation.amount,
                donations: d.donations + 1
              }
            : d
        );
      }
      return [
        ...prev,
        {
          id: Date.now(),
          name: safeDonation.donor,
          totalDonation: safeDonation.amount,
          donations: 1
        }
      ];
    });
  };

  return (
    <DonationsContext.Provider
      value={{
        incomingDonations,
        donations,
        ledger,
        donors,
        addDonation,
        addDonationRequest,
      }}
    >
      {children}
    </DonationsContext.Provider>
  );
};
