"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Database,
  LineChart,
  Shield,
  AlertTriangle,
  RefreshCw,
  Lock,
  BarChart3,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

export default function ModuleNavigation() {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className={`border-r border-gray-800 bg-gray-950 transition-all ${expanded ? "w-64" : "w-16"}`}>
      <div className="flex h-12 items-center justify-between border-b border-gray-800 px-4">
        <span className={`font-medium ${expanded ? "block" : "hidden"}`}>Modules</span>
        <Button variant="ghost" size="icon" onClick={() => setExpanded(!expanded)} className="h-8 w-8">
          {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </Button>
      </div>

      <div className="p-2">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-900 hover:text-white"
        >
          <Home size={20} />
          {expanded && <span>Home</span>}
        </Link>

        <Link href="/data-diagnostic" className="flex items-center gap-3 rounded-md bg-pink-900 px-3 py-2 text-white">
          <Database size={20} />
          {expanded && <span>Data Diagnostic</span>}
        </Link>

        <Link
          href="/modeling-pipeline"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-900 hover:text-white"
        >
          <LineChart size={20} />
          {expanded && <span>Modeling Pipeline</span>}
        </Link>

        <Link
          href="/model-explainability"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-900 hover:text-white"
        >
          <BarChart3 size={20} />
          {expanded && <span>Model Explainability</span>}
        </Link>

        <Link
          href="/attack-vectors"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-900 hover:text-white"
        >
          <Shield size={20} />
          {expanded && <span>Attack Vectors</span>}
        </Link>

        <Link
          href="/metamorphic-testing"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-900 hover:text-white"
        >
          <AlertTriangle size={20} />
          {expanded && <span>Metamorphic Testing</span>}
        </Link>

        <Link
          href="/feedback-loop"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-900 hover:text-white"
        >
          <RefreshCw size={20} />
          {expanded && <span>Feedback Loop</span>}
        </Link>

        <div className="flex cursor-not-allowed items-center gap-3 rounded-md px-3 py-2 text-gray-500">
          <Lock size={20} />
          {expanded && <span>Model Privacy</span>}
        </div>
      </div>
    </div>
  )
}
