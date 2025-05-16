"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home } from "lucide-react"
import Link from "next/link"

export default function PerformanceTesting() {
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
          <span className="text-white">Performance Testing</span>
        </div>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Performance Testing</h1>
            <p className="mt-1 text-zinc-400">Evaluate your model's speed, efficiency, and resource usage</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button className="bg-pink-600 hover:bg-pink-700">Access Module</Button>
            <Badge variant="outline" className="border-zinc-700 bg-zinc-800">
              BETA
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="border-zinc-700 bg-zinc-800">
            Latency Testing
          </Badge>
          <Badge variant="outline" className="border-zinc-700 bg-zinc-800">
            Resource Usage
          </Badge>
          <Badge variant="outline" className="border-zinc-700 bg-zinc-800">
            Throughput Analysis
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
                <path d="m13 2-2 2h-2v2l-2 2v3a7 7 0 0 0 14 0V8l-2-2V4h-2l-2-2Z"></path>
                <path d="M13 16v3a2 2 0 0 1-2 2H9"></path>
              </svg>
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-bold">Performance Testing Module (Beta)</h2>
          <p className="mb-6 max-w-md text-zinc-400">
            This module is in beta. Evaluate your model's performance characteristics including latency, throughput, and
            resource utilization.
          </p>
          <Button className="bg-pink-600 hover:bg-pink-700">Access Beta Module</Button>
        </CardContent>
      </Card>
    </div>
  )
}
