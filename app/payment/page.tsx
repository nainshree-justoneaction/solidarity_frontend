"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import PaymentClient from "./PaymentClient";

export default function FundraisingPaymentPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentClient />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      Processing payment…
    </div>
  );
}
