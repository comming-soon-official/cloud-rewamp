import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function ModelingPipelineDashboard() {
  return (
    <div>
      {/* Module Header with Navigation */}
      <div className="mb-6 flex items-center justify-between rounded-lg bg-pink-950 p-4">
        <div>
          <h2 className="text-2xl font-bold text-white">MODELING PIPELINE</h2>
          <div className="mt-1 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-1 text-sm text-pink-300 hover:text-pink-200">
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </Link>
            <span className="text-gray-400">|</span>
            <Badge variant="outline" className="bg-pink-900 text-pink-200">
              Version Comparison Available
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue="v1">
            <SelectTrigger className="w-[180px] border-pink-700 bg-pink-900 text-white">
              <SelectValue placeholder="Select Version" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="v1">Version 1 (Current)</SelectItem>
              <SelectItem value="v2">Version 2 (Enhanced)</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="border-pink-700 bg-pink-900 text-white hover:bg-pink-800">
            <RefreshCw size={14} className="mr-2" />
            Refresh Data
          </Button>

          <Button variant="outline" size="sm" className="border-pink-700 bg-pink-900 text-white hover:bg-pink-800">
            <Download size={14} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Modeling Pipeline Content */}
      <div className="grid grid-cols-12 gap-4">
        {/* Model Summary */}
        <div className="col-span-12">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="border-b border-gray-800 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-medium">Model Summary</CardTitle>
                  <CardDescription>meta_info/model_summary.txt</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Compare Versions
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="rounded border border-gray-800 bg-gray-950 p-3 font-mono text-sm">
                <p>Model: DeepFakeDetector v1.0</p>
                <p>Architecture: CNN with attention mechanism</p>
                <p>Input shape: (128, 128, 3)</p>
                <p>Output: Binary classification (real/fake)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Training Metrics */}
        <div className="col-span-6">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="border-b border-gray-800 pb-3">
              <CardTitle className="text-lg font-medium">Model Loss</CardTitle>
              <CardDescription>Training and validation loss over epochs</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-64 rounded bg-gray-800 p-4">
                {/* This would be a chart component in a real implementation */}
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-400">Loss chart visualization</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-6">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="border-b border-gray-800 pb-3">
              <CardTitle className="text-lg font-medium">Model Accuracy</CardTitle>
              <CardDescription>Training and validation accuracy over epochs</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-64 rounded bg-gray-800 p-4">
                {/* This would be a chart component in a real implementation */}
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-400">Accuracy chart visualization</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Table */}
        <div className="col-span-12">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="border-b border-gray-800 pb-3">
              <CardTitle className="text-lg font-medium">Performance Metrics</CardTitle>
              <CardDescription>Final model performance on training and validation sets</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="pb-2 text-left font-medium text-gray-400">DATASET</th>
                      <th className="pb-2 text-left font-medium text-gray-400">LOSS</th>
                      <th className="pb-2 text-left font-medium text-gray-400">ACCURACY</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-3">train_results</td>
                      <td className="py-3">0.515</td>
                      <td className="py-3">0.85</td>
                    </tr>
                    <tr>
                      <td className="py-3">val_results</td>
                      <td className="py-3">0.686</td>
                      <td className="py-3">0.593</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
