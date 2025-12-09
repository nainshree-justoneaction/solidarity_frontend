// lib/api.ts
// PURE FRONTEND MOCK BACKEND (NO SERVER REQUIRED)

let USERS: any[] = [];      // in-memory
let STUDENTS: any[] = [];   // in-memory

// Helper to persist data to sessionStorage (browser only)
const persistData = () => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("USERS", JSON.stringify(USERS));
    sessionStorage.setItem("STUDENTS", JSON.stringify(STUDENTS));
  }
};

// Load data from sessionStorage (browser only)
const loadData = () => {
  if (typeof window !== "undefined") {
    USERS = JSON.parse(sessionStorage.getItem("USERS") || "[]");
    STUDENTS = JSON.parse(sessionStorage.getItem("STUDENTS") || "[]");
  }
};

// ------------------------------------------
// SIGNUP
// ------------------------------------------

export async function signup(payload: any) {
  loadData(); // make sure we have latest data

  const exists = USERS.find(u => u.email.toLowerCase() === payload.email.toLowerCase());
  if (exists) throw new Error("User already exists");

  const newUser = { id: Date.now(), ...payload };
  USERS.push(newUser);

  if (payload.role === "student") {
    STUDENTS.push({
      id: newUser.id,
      userId: newUser.id,
      email: payload.email,
      fullName: payload.fullName,
      mobileNumber: payload.mobileNumber,
      age: null,
      gender: null,
      institute: null,
      address: null,
      pincode: null,
      city: null,
      interests: [],
    });
  }

  persistData();
  return newUser;
}

// ------------------------------------------
// LOGIN
// ------------------------------------------

export async function loginRequest(email: string, password: string) {
  loadData();

  const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) throw new Error("User not found");
  if (user.password !== password) throw new Error("Invalid password");

  return { user, token: "mock-token" };
}

// ------------------------------------------
// GET STUDENT BY USER ID
// ------------------------------------------

export async function getStudentByUserId(userId: number) {
  loadData();
  return STUDENTS.find(s => s.userId === userId);
}

// ------------------------------------------
// UPDATE STUDENT PROFILE (STEP FLOW)
// ------------------------------------------

export async function updateStudentProfile(userId: number, data: any) {
  loadData();

  const student = STUDENTS.find(s => s.userId === userId);
  if (!student) throw new Error("Student not found");

  Object.assign(student, data);
  persistData();

  return student;
}
