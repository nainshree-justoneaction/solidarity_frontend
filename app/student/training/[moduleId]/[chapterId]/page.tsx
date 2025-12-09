"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function ChapterPage() {
  const params = useParams()
  const router = useRouter()
  const [videoFinished, setVideoFinished] = useState(false)

  // Mock video content
  const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4" // replace with real video

  // Load saved progress
  useEffect(() => {
    const key = `module-${params.moduleId}`
    const savedProgress = JSON.parse(localStorage.getItem(key) || "{}")
    if (savedProgress[params.chapterId]) {
      setVideoFinished(true)
    }
  }, [params.moduleId, params.chapterId])

  const handleVideoComplete = () => {
    const key = `module-${params.moduleId}`
    const savedProgress = JSON.parse(localStorage.getItem(key) || "{}")
    savedProgress[params.chapterId] = true
    localStorage.setItem(key, JSON.stringify(savedProgress))
    setVideoFinished(true)

    // Redirect back to module page after short delay
    setTimeout(() => {
      router.push(`/dashboard/training/${params.moduleId}`)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-4">Chapter {params.chapterId}</h1>

      <div className="bg-white/5 rounded-2xl p-6">
        <video
          src={videoUrl}
          controls
          className="w-full rounded-lg"
          onEnded={handleVideoComplete}
        />

        {!videoFinished && (
          <p className="text-white/60 mt-2">
            Watch the video fully to mark chapter as complete.
          </p>
        )}

        {videoFinished && (
          <p className="text-green-400 mt-2 font-semibold">
            ✅ Chapter completed! Redirecting...
          </p>
        )}
      </div>
    </div>
  )
}
