"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, Home, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function AttackVectors() {
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
          <span className="text-white">Attack Vectors</span>
        </div>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Attack Vectors</h1>
            <p className="mt-1 text-zinc-400">Test your model's resilience against various attack methods</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select defaultValue="v1">
              <SelectTrigger className="w-[180px] border-zinc-700 bg-zinc-800">
                <SelectValue placeholder="Select Version" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="v1">Version 1 (Current)</SelectItem>
                <SelectItem value="v2">Version 2 (Enhanced)</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="border-zinc-700 bg-zinc-800">
              Compare Versions
            </Button>

            <Button variant="outline" className="border-zinc-700 bg-zinc-800">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>

            <Button variant="outline" className="border-zinc-700 bg-zinc-800">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="border-zinc-700 bg-zinc-800">
            Adversarial Attacks
          </Badge>
          <Badge variant="outline" className="border-zinc-700 bg-zinc-800">
            Model Poisoning
          </Badge>
          <Badge variant="outline" className="border-zinc-700 bg-zinc-800">
            Evasion Techniques
          </Badge>
          <Badge variant="outline" className="border-zinc-700 bg-zinc-800">
            Security Testing
          </Badge>
        </div>
      </div>

      {/* Module Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6 w-full justify-start bg-transparent p-0">
          <TabsTrigger
            value="overview"
            className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="adversarial"
            className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
          >
            Adversarial Attacks
          </TabsTrigger>
          <TabsTrigger
            value="poisoning"
            className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
          >
            Poisoning
          </TabsTrigger>
          <TabsTrigger
            value="evasion"
            className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
          >
            Evasion
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
          >
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="col-span-2 border-zinc-800 bg-zinc-900">
              <CardHeader className="border-b border-zinc-800 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-medium text-white">Attack Vulnerability Summary</CardTitle>
                    <CardDescription>Overall model vulnerability to different attack types</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 border-zinc-700 bg-zinc-800">
                    <FileText className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[300px] rounded-md bg-zinc-800 p-4">
                  {/* This would be a chart component in a real implementation */}
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center text-zinc-400">
                      <p className="text-white">Vulnerability radar chart visualization</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900">
              <CardHeader className="border-b border-zinc-800 pb-3">
                <CardTitle className="text-lg font-medium text-white">Security Score</CardTitle>
                <CardDescription>Overall model security rating</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="relative h-48 w-48">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-yellow-500">73</div>
                        <div className="mt-2 text-sm text-zinc-400">out of 100</div>
                      </div>
                    </div>
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#374151"
                        strokeWidth="10"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#EAB308"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray="283"
                        strokeDashoffset="76"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="bg-yellow-600">Moderate Risk</Badge>
                    <p className="mt-2 text-sm text-zinc-400">
                      Your model has moderate vulnerability to certain attack vectors.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Adversarial Examples", score: "65/100", status: "Medium Risk", color: "yellow" },
              { name: "Data Poisoning", score: "82/100", status: "Low Risk", color: "green" },
              { name: "Model Inversion", score: "58/100", status: "Medium Risk", color: "yellow" },
              { name: "Membership Inference", score: "43/100", status: "High Risk", color: "red" },
            ].map((attack, i) => (
              <Card key={i} className="border-zinc-800 bg-zinc-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-white">{attack.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-white">{attack.score}</div>
                    <Badge className={`bg-${attack.color}-600`}>{attack.status}</Badge>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-zinc-800">
                    <div
                      className={`h-2 rounded-full bg-${attack.color}-600`}
                      style={{ width: `${Number.parseInt(attack.score)}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 border-zinc-800 bg-zinc-900">
            <CardHeader className="border-b border-zinc-800 pb-3">
              <CardTitle className="text-lg font-medium text-white">Recent Attack Simulations</CardTitle>
              <CardDescription>Results from recent security testing</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="pb-2 text-left font-medium text-zinc-400">ATTACK TYPE</th>
                      <th className="pb-2 text-left font-medium text-zinc-400">DATE</th>
                      <th className="pb-2 text-left font-medium text-zinc-400">SUCCESS RATE</th>
                      <th className="pb-2 text-left font-medium text-zinc-400">SEVERITY</th>
                      <th className="pb-2 text-left font-medium text-zinc-400">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 text-white">FGSM Attack</td>
                      <td className="py-3 text-white">May 4, 2025</td>
                      <td className="py-3 text-white">32%</td>
                      <td className="py-3 text-white">Medium</td>
                      <td className="py-3">
                        <Badge className="bg-yellow-600">Needs Attention</Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 text-white">PGD Attack</td>
                      <td className="py-3 text-white">May 3, 2025</td>
                      <td className="py-3 text-white">18%</td>
                      <td className="py-3 text-white">Low</td>
                      <td className="py-3">
                        <Badge className="bg-green-600">Mitigated</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-white">Membership Inference</td>
                      <td className="py-3 text-white">May 2, 2025</td>
                      <td className="py-3 text-white">67%</td>
                      <td className="py-3 text-white">High</td>
                      <td className="py-3">
                        <Badge className="bg-red-600">Critical</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tab contents would be implemented similarly */}
      </Tabs>
    </div>
  )
}
