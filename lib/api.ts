// lib/api.ts

// ------------------------
// Allowed roles
// ------------------------
const ALLOWED_ROLES = ["student", "faculty", "institute", "ngo", "admin"];

// ------------------------
// In-memory store
// ------------------------
let USERS: any[] = [];
let PROFILES: Record<string, any[]> = {
  student: [],
  faculty: [],
  institute: [],
  ngo: [],
  admin: [],
};

// ------------------------
// Initialize session data
// ------------------------
const initData = () => {
  if (typeof window === "undefined") return;

  if (!sessionStorage.getItem("USERS")) {
    sessionStorage.setItem("USERS", JSON.stringify([]));
  }

  if (!sessionStorage.getItem("PROFILES")) {
    sessionStorage.setItem(
      "PROFILES",
      JSON.stringify({
        student: [],
        faculty: [],
        institute: [],
        ngo: [],
        admin: [],
      })
    );
  }

  loadData();
};

// ------------------------
// Load from sessionStorage
// ------------------------
const loadData = () => {
  if (typeof window === "undefined") return;

  try {
    USERS = JSON.parse(sessionStorage.getItem("USERS") || "[]");
  } catch {
    USERS = [];
  }

  try {
    PROFILES = JSON.parse(
      sessionStorage.getItem("PROFILES") ||
        JSON.stringify({
          student: [],
          faculty: [],
          institute: [],
          ngo: [],
          admin: [],
        })
    );
  } catch {
    PROFILES = {
      student: [],
      faculty: [],
      institute: [],
      ngo: [],
      admin: [],
    };
  }
};

// ------------------------
// Persist back to sessionStorage
// ------------------------
const persistData = () => {
  if (typeof window === "undefined") return;

  sessionStorage.setItem("USERS", JSON.stringify(USERS));
  sessionStorage.setItem("PROFILES", JSON.stringify(PROFILES));
};

// ------------------------
// SIGNUP
// ------------------------



// ------------------------
// LOGIN
// ------------------------


// ------------------------
// GET PROFILE
// ------------------------
export async function getProfileByRole(userId: number, role?: string) {
  initData();

  let r = role?.toLowerCase();

  if (!r) {
    r = ALLOWED_ROLES.find(roleName =>
      PROFILES[roleName].some(p => p.userId === userId)
    );
  }

  if (!r) throw new Error("Role not found for this user");

  const profile = PROFILES[r].find(p => p.userId === userId);
  if (!profile) throw new Error(`${r} profile not found`);

  return profile;
}

// ------------------------
// UPDATE PROFILE
// ------------------------
export async function updateProfileByRole(userId: number, data: any) {
  initData();

  let role = data.role?.toLowerCase();

  if (!role) {
    role = ALLOWED_ROLES.find(r =>
      PROFILES[r].some(p => p.userId === userId)
    );
  }

  if (!role) throw new Error("Role not found for this user");

  let profile = PROFILES[role].find(p => p.userId === userId);

  if (!profile) {
    profile = { userId, ...data, role };
    PROFILES[role].push(profile);
  } else {
    Object.assign(profile, data);
  }

  persistData();
  return profile;
}

// ------------------------
// AUTH GETTER & LOGOUT
// ------------------------


// lib/api.ts
import axios from "axios";

// ------------------------
// Axios instance
// ------------------------
const api = axios.create({
  baseURL: "http://localhost:5000", // change for prod
  withCredentials: true, // allow cookies (JWT / session)
  headers: {
    "Content-Type": "application/json",
  },
});

// ------------------------
// SIGNUP
// ------------------------
export async function signup(payload: {
  fullName: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
}) {
  try {
    const { data } = await api.post("/auth/register", payload);
    return data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || "Signup failed"
    );
  }
}

// ------------------------
// LOGIN
// ------------------------
export async function loginRequest(email: string, password: string) {
  try {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    // UI-only auth state
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "auth",
        JSON.stringify({
          userId: data.user.id,
          email: data.user.email,
          role: data.user.role,
          fullName: data.user.fullName,
        })
      );
    }

    return data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || "Invalid credentials"
    );
  }
}

// ------------------------
// GET CURRENT USER PROFILE
// ------------------------
export async function getProfile() {
  try {
    const { data } = await api.get("/profile/me");
    return data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || "Unauthorized"
    );
  }
}

// ------------------------
// UPDATE PROFILE
// ------------------------
export async function updateProfile(payload: any) {
  try {
    const { data } = await api.patch("/profile/me", payload);
    return data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || "Update failed"
    );
  }
}

// ------------------------
// AUTH GETTER
// ------------------------
export const getAuth = () => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(sessionStorage.getItem("auth") || "null");
  } catch {
    return null;
  }
};

// ------------------------
// LOGOUT
// ------------------------
export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } finally {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("auth");
    }
  }
};
