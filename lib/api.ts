// lib/api.ts
// Fully working multi-role mock backend

let USERS: any[] = [];
let PROFILES: Record<string, any[]> = {
  student: [],
  faculty: [],
  admin: [],
};

const persistData = () => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("USERS", JSON.stringify(USERS));
    sessionStorage.setItem("PROFILES", JSON.stringify(PROFILES));
  }
};

const loadData = () => {
  if (typeof window !== "undefined") {
    USERS = JSON.parse(sessionStorage.getItem("USERS") || "[]");
    PROFILES = JSON.parse(sessionStorage.getItem("PROFILES") || '{"student":[],"faculty":[],"admin":[]}');
  }
};

export async function signup(payload: any) {
  loadData();

  if (USERS.find(u => u.email.toLowerCase() === payload.email.toLowerCase())) {
    throw new Error("User already exists");
  }

  const newUser = { id: Date.now(), ...payload };
  USERS.push(newUser);

  if (!PROFILES[payload.role]) PROFILES[payload.role] = [];
  PROFILES[payload.role].push({ userId: newUser.id, ...payload });

  persistData();
  return newUser;
}

export async function loginRequest(email: string, password: string) {
  loadData();
  const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) throw new Error("User not found");
  if (user.password !== password) throw new Error("Invalid password");

  return { user, token: "mock-token" };
}

export async function getProfileByRole(role: string, userId: number) {
  loadData();
  const profile = PROFILES[role]?.find(p => p.userId === userId);
  if (!profile) throw new Error(`${role} profile not found`);
  return profile;
}

export async function updateProfileByRole(userId: number, data: any) {
  loadData();
  const role = data.role;
  if (!PROFILES[role]) PROFILES[role] = [];
  let profile = PROFILES[role].find(p => p.userId === userId);

  if (!profile) {
    profile = { userId, ...data };
    PROFILES[role].push(profile);
  } else {
    Object.assign(profile, data);
  }

  persistData();
  return profile;
}
