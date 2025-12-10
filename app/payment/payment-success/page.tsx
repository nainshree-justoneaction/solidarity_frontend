"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccess() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const registration = JSON.parse(sessionStorage.getItem("registration") || "{}");
    setRole(registration.role || null);
  }, []);

  const handleGoDashboard = () => {
    if (role) {
      router.push(`/${role}/dashboard`);
    } else {
      router.push("/auth/login"); 
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.iconWrap}>
          <div style={styles.check}></div>
        </div>

        <h1 style={styles.title}>Payment Successful!</h1>
        <p style={styles.subtitle}>
          Your payment has been received. You now have access to all modules, internships, 
          training programs, and resources.
        </p>

        <button style={styles.button} onClick={handleGoDashboard}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fb",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    borderRadius: "14px",
    padding: "32px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  iconWrap: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "#d4f8d4",
    margin: "0 auto 22px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  check: {
    width: "28px",
    height: "14px",
    borderBottom: "4px solid #22c55e",
    borderLeft: "4px solid #22c55e",
    transform: "rotate(-45deg)",
    marginTop: "-2px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#111",
  },
  subtitle: {
    fontSize: "15px",
    color: "#555",
    lineHeight: "22px",
    marginBottom: "28px",
  },
  button: {
    width: "100%",
    padding: "14px 0",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.2s",
  },
};
