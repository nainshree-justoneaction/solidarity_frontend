// lib/api.ts

// ------------------------
// In-memory store
// ------------------------
let USERS: any[] = [];
let PROFILES: Record<string, any[]> = {
  student: [],
  faculty: [],
  admin: [],
};

// ------------------------
// Initialize sessionStorage if empty
// ------------------------
const initData = () => {
  if (typeof window === "undefined") return;

  // Ensure USERS exists
  if (!sessionStorage.getItem("USERS")) {
    sessionStorage.setItem("USERS", JSON.stringify([]));
  }

  // Ensure PROFILES exists
  if (!sessionStorage.getItem("PROFILES")) {
    sessionStorage.setItem(
      "PROFILES",
      JSON.stringify({ student: [], faculty: [], admin: [] })
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
        JSON.stringify({ student: [], faculty: [], admin: [] })
    );
  } catch {
    PROFILES = { student: [], faculty: [], admin: [] };
  }
};

// ------------------------
// Persist to sessionStorage
// ------------------------
const persistData = () => {
  if (typeof window === "undefined") return;

  sessionStorage.setItem("USERS", JSON.stringify(USERS));
  sessionStorage.setItem("PROFILES", JSON.stringify(PROFILES));
};

// ------------------------
// SIGNUP
// ------------------------
export async function signup(payload: any) {
  initData();

  if (!payload.role) throw new Error("Role is required");

  // normalize role
  const role = payload.role.toLowerCase();
  if (!["student", "faculty", "admin"].includes(role)) {
    throw new Error("Invalid role");
  }

  // check duplicate email
  if (USERS.find(u => u.email.toLowerCase() === payload.email.toLowerCase())) {
    throw new Error("User already exists");
  }

  const newUser = { id: Date.now(), ...payload, role };
  USERS.push(newUser);

  if (!PROFILES[role]) PROFILES[role] = [];
  PROFILES[role].push({ userId: newUser.id, ...payload, role });

  persistData();
  return newUser;
}

// ------------------------
// LOGIN
// ------------------------
export async function loginRequest(email: string, password: string) {
  initData();

  const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) throw new Error("User not found");
  if (user.password !== password) throw new Error("Invalid password");

  // Save auth info with role
  if (typeof window !== "undefined") {
    sessionStorage.setItem(
      "auth",
      JSON.stringify({
        fullName: user.fullName,
        email: user.email,
        role: user.role || "student", // fallback
        userId: user.id,
      })
    );
  }

  return { user, token: "mock-token" };
}

// ------------------------
// GET PROFILE BY ROLE
// ------------------------
export async function getProfileByRole(userId: number, role?: string) {
  initData();

  let userRole = role?.toLowerCase();

  if (!userRole) {
    // fallback: find role from PROFILES
    userRole = Object.keys(PROFILES).find(r =>
      PROFILES[r].some(p => p.userId === userId)
    );
    if (!userRole) throw new Error("Role not found for this user");
  }

  const profile = PROFILES[userRole]?.find(p => p.userId === userId);
  if (!profile) throw new Error(`${userRole} profile not found`);

  return profile;
}

// ------------------------
// UPDATE PROFILE
// ------------------------
export async function updateProfileByRole(userId: number, data: any) {
  initData();

  let role = data.role?.toLowerCase();

  if (!role) {
    role = Object.keys(PROFILES).find(r =>
      PROFILES[r].some(p => p.userId === userId)
    );
    if (!role) throw new Error("Role not found for this user");
  }

  if (!PROFILES[role]) PROFILES[role] = [];

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
// GET CURRENT AUTH
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
export const logout = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("auth");
  }
};
