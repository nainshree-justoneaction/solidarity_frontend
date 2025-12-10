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
export async function signup(payload: any) {
  initData();

  if (!payload.role) throw new Error("Role is required");

  const role = payload.role.toLowerCase();

  if (!ALLOWED_ROLES.includes(role)) {
    throw new Error("Invalid role");
  }

  // Prevent duplicate email
  if (USERS.some(u => u.email.toLowerCase() === payload.email.toLowerCase())) {
    throw new Error("User already exists");
  }

  const newUser = {
    id: Date.now(),
    ...payload,
    role,
  };

  USERS.push(newUser);

  PROFILES[role].push({
    userId: newUser.id,
    ...payload,
    role,
  });

  persistData();
  return newUser;
}

// ------------------------
// LOGIN
// ------------------------
export async function loginRequest(email: string, password: string) {
  initData();

  const user = USERS.find(
    u => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) throw new Error("User not found");
  if (user.password !== password) throw new Error("Invalid password");

  if (typeof window !== "undefined") {
    sessionStorage.setItem(
      "auth",
      JSON.stringify({
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        userId: user.id,
      })
    );
  }

  return { user, token: "mock-token" };
}

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
export const getAuth = () => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(sessionStorage.getItem("auth") || "null");
  } catch {
    return null;
  }
};

export const logout = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("auth");
  }
};
