"use client"

import type React from "react"
import Link from "next/link"
import { Award, Heart, BookOpen, Plus } from "lucide-react"

interface Module {
  id: string
  title: string
  progress: number
  icon: React.ReactNode
  sdgColor: string
  href: string
}

const modules: Module[] = [
  {
    id: "1",
    title: "Social Training",
    progress: 65,
    icon: <Award size={24} />,
    sdgColor: "#e5243b",
    href: "/student/training/social-training",
  },
  {
    id: "2",
    title: "Health Awareness",
    progress: 45,
    icon: <Heart size={24} />,
    sdgColor: "#4c9f38",
    href: "/student/training/health-awareness",
  },
  {
    id: "3",
    title: "Quality Education",
    progress: 80,
    icon: <BookOpen size={24} />,
    sdgColor: "#c5192d",
    href: "/student/training/quality-education",
  },
  {
    id: "4",
    title: "Gender Equality",
    progress: 55,
    icon: <Plus size={24} />,
    sdgColor: "#dd3e39",
    href: "/student/training/gender-equality",
  },
]

export default function TrainingModules() {
  return (
    <section className="animate-fade-in">
      <h2 className="text-xl font-bold text-white mb-6">Training Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((module, index) => (
          <Link
            key={module.id}
            href={module.href}
            className="bg-black border border-white/10 rounded p-6 hover:border-white/20 hover:scale-105 transition-transform transition-colors animate-slide-up cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* SDG Icon */}
            <div
              className="w-12 h-12 rounded flex items-center justify-center mb-4"
              style={{ backgroundColor: module.sdgColor + "20" }}
            >
              <div style={{ color: module.sdgColor }}>{module.icon}</div>
            </div>

            {/* Title */}
            <h3 className="text-white font-semibold mb-4">{module.title}</h3>

            {/* Progress Bar */}
            <div className="bg-white/5 h-1 rounded-full overflow-hidden">
              <div
                className="h-full bg-white animate-progress"
                style={{
                  width: `${module.progress}%`,
                  animationDelay: `${index * 100}ms`,
                }}
              />
            </div>

            {/* Progress Text */}
            <p className="text-white/60 text-sm mt-3">{module.progress}% Complete</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
