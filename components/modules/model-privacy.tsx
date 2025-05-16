"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Lock } from "lucide-react"
import Link from "next/link"

export default function ModelPrivacy() {
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
          <span className="text-white">Model Privacy</span>
        </div>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Model Privacy</h1>
            <p className="mt-1 text-zinc-400">Protect your models from data leakage and privacy attacks</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" className="border-zinc-700 bg-zinc-800 text-zinc-400" disabled>
              <Lock className="mr-2 h-4 w-4" />
              Premium Feature
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="border-zinc-700 text-zinc-400">
            Differential Privacy
          </Badge>
          <Badge variant="outline" className="border-zinc-700 text-zinc-400">
            Membership Inference
          </Badge>
          <Badge variant="outline" className="border-zinc-700 text-zinc-400">
            Model Inversion
          </Badge>
        </div>
      </div>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-6 rounded-full bg-zinc-800 p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-700">
              <Lock className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-bold">Model Privacy Module</h2>
          <p className="mb-6 max-w-md text-zinc-400">
            This premium module is not included in your current license. Upgrade to access advanced privacy protection
            features for your AI models.
          </p>
          <Button className="bg-zinc-700 hover:bg-zinc-600">Upgrade License</Button>
        </CardContent>
      </Card>
    </div>
  )
}
