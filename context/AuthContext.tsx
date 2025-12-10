"use client";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface AuthContextType {
  fullName: string;
  email: string;
  role: string;
  userId: number;
  setUser: (user: Partial<AuthContextType>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUserState] = useState<AuthContextType>({
    fullName: "",
    email: "",
    role: "",
    userId: 0,
    setUser: () => {},
  });

  useEffect(() => {
    const stored = sessionStorage.getItem("auth");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUserState({
        ...parsed,
        setUser: (partialUser: Partial<AuthContextType>) => {
          const updated = { ...parsed, ...partialUser };
          sessionStorage.setItem("auth", JSON.stringify(updated));
          setUserState(updated);
        },
      });
    } else {
      setUserState((prev) => ({ ...prev, setUser: prev.setUser }));
    }
  }, []);

  if (!user.fullName) return null; // prevent initial flash

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};


export const modulesData = [
  {
    id: "social-training",
    title: "Social Training",
    sdgColor: "#e5243b",
    icon: "🏆",
    chapters: [
      { id: 1, title: "Chapter 1: Intro" },
      { id: 2, title: "Chapter 2: Community Work" },
      { id: 3, title: "Chapter 3: Case Study" },
      { id: 4, title: "Chapter 4: Final Quiz" },
    ],
  },
  {
    id: "health-awareness",
    title: "Health Awareness",
    sdgColor: "#4c9f38",
    icon: "❤️",
    chapters: [
      { id: 1, title: "Chapter 1: Basics" },
      { id: 2, title: "Chapter 2: Nutrition" },
      { id: 3, title: "Chapter 3: Exercise" },
    ],
  },
  {
    id: "quality-education",
    title: "Quality Education",
    sdgColor: "#c5192d",
    icon: "📚",
    chapters: [
      { id: 1, title: "Chapter 1: Overview" },
      { id: 2, title: "Chapter 2: Techniques" },
      { id: 3, title: "Chapter 3: Quiz" },
    ],
  },
  {
    id: "gender-equality",
    title: "Gender Equality",
    sdgColor: "#dd3e39",
    icon: "➕",
    chapters: [
      { id: 1, title: "Chapter 1: Awareness" },
      { id: 2, title: "Chapter 2: Rights" },
      { id: 3, title: "Chapter 3: Case Study" },
    ],
  },
];
