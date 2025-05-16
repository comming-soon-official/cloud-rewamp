"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home } from "lucide-react"
import Link from "next/link"

export default function FeedbackLoop() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Module Header */}
      <div className="flex flex-col gap-4 rounded-md border border-zinc-800 bg-zinc-900 p-6">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Link href="#" className="flex items-center gap-1 hover:text-white" onClick={(e) => e.preventDefault()}>
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-white">Feedback Loop</span>
        </div>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Feedback Loop</h1>
            <p className="mt-1 text-zinc-400">Continuously improve your model with user feedback</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button className="bg-pink-600 hover:bg-pink-700">Access Module</Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="border-zinc-700 bg-zinc-800">
            User Feedback
          </Badge>
          <Badge variant="outline" className="border-zinc-700 bg-zinc-800">
            Model Improvement
          </Badge>
          <Badge variant="outline" className="border-zinc-700 bg-zinc-800">
            Continuous Learning
          </Badge>
        </div>
      </div>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-6 rounded-full bg-zinc-800 p-6">
            <div className="h-16 w-16 rounded-full bg-pink-600 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-full w-full text-white"
              >
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                <path d="M16 16h5v5"></path>
              </svg>
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-bold">Feedback Loop Module</h2>
          <p className="mb-6 max-w-md text-zinc-400">
            Implement a continuous improvement cycle by collecting and analyzing user feedback to enhance your model's
            performance.
          </p>
          <Button className="bg-pink-600 hover:bg-pink-700">Access Module</Button>
        </CardContent>
      </Card>
    </div>
  )
}
