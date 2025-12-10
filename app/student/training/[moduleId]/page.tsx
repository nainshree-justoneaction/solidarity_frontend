"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { CheckCircle } from "lucide-react"

interface Chapter {
  id: number
  title: string
  completed: boolean
}

interface Module {
  id: string
  title: string
  description: string
  chapters: Chapter[]
}

const mockModules: Module[] = [
  {
    id: "social-training",
    title: "Social Training",
    description: "Learn the fundamentals of social work.",
    chapters: Array.from({ length: 4 }, (_, i) => ({
      id: i + 1,
      title: `Chapter ${i + 1}`,
      completed: false,
    })),
  },
]

export default function ModuleOverviewPage() {
  const router = useRouter()
  const params = useParams()
  const [module, setModule] = useState<Module | null>(null)
  const [allComplete, setAllComplete] = useState(false)
  const access = localStorage.getItem("solidarity_paid") === "true"

  useEffect(() => {
    const access = localStorage.getItem("solidarity_paid")
    if (access !== "true") {
      router.replace("/student/payment")
    }
  }, [])

  useEffect(() => {
    const mod = mockModules.find((m) => m.id === params.moduleId)
    if (mod) {
      const savedProgress = JSON.parse(localStorage.getItem(`module-${mod.id}`) || "{}")
      mod.chapters = mod.chapters.map((ch) => ({
        ...ch,
        completed: savedProgress[ch.id] || false,
      }))
      setModule(mod)
      setAllComplete(mod.chapters.every((ch) => ch.completed))
    }
  }, [params.moduleId])

  const goToChapter = (chapterId: number) => {
    router.push(`/dashboard/training/${params.moduleId}/${chapterId}`)
  }

  const openCertificate = () => {
    // redirect to certificate page or open PDF
    router.push(`/dashboard/training/${params.moduleId}/certificate`)
  }

  if (!module) return <p className="text-white">Module not found</p>

  const completedCount = module.chapters.filter((ch) => ch.completed).length

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{module.title}</h1>
      <p className="text-white/60">{module.description}</p>

      <div className="space-y-3 mt-6">
        {module.chapters.map((chapter) => (
          <div
            key={chapter.id}
            className={`flex items-center justify-between p-4 rounded-xl border border-white/10 cursor-pointer hover:bg-white/5 transition ${chapter.completed ? "bg-white/10" : ""
              }`}
            onClick={() => goToChapter(chapter.id)}
          >
            <span className="text-white">{chapter.title}</span>
            {chapter.completed && <CheckCircle className="text-[#00ADEF]" />}
          </div>
        ))}
      </div>

      <p className="text-white/60 mt-6">
        Completed {completedCount}/{module.chapters.length} chapters.
      </p>

      {allComplete && (
        <button
          onClick={() => {
            if (access) {
              router.push(`/dashboard/training/${params.moduleId}/certificate`)
            } else {
              router.push(`/dashboard/payment`)   // global payment page
            }
          }}
          className="mt-4 px-6 py-3 rounded-xl bg-[#00ADEF] text-black font-semibold hover:bg-[#00c7ff] transition"
        >
          🎓 Get Your Certificate
        </button>
      )}
    </div>
  )
}
