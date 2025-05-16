"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home } from "lucide-react"
import Link from "next/link"

export default function MetamorphicTesting() {
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
          <span className="text-white">Metamorphic Testing</span>
        </div>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Metamorphic Testing</h1>
            <p className="mt-1 text-zinc-400">Test your model's consistency across related inputs</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button className="bg-pink-600 hover:bg-pink-700">Access Module</Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="border-zinc-700 bg-zinc-800">
            Input Transformations
          </Badge>
          <Badge variant="outline" className="border-zinc-700 bg-zinc-800">
            Consistency Checks
          </Badge>
          <Badge variant="outline" className="border-zinc-700 bg-zinc-800">
            Robustness Testing
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
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-bold">Metamorphic Testing Module</h2>
          <p className="mb-6 max-w-md text-zinc-400">
            Verify your model's behavior consistency across related inputs with systematic metamorphic testing.
          </p>
          <Button className="bg-pink-600 hover:bg-pink-700">Access Module</Button>
        </CardContent>
      </Card>
    </div>
  )
}
