"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface VersionComparisonModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  moduleType: string
}

export default function VersionComparisonModal({ open, onOpenChange, moduleType }: VersionComparisonModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl border-zinc-800 bg-black p-0 text-white">
        <div className="border-b border-zinc-800 p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Version Comparison</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Compare metrics between different versions of your {moduleType} module
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className="bg-pink-600 text-white">Version 1 (Current)</Badge>
              <span className="text-zinc-400">vs</span>
              <Badge className="bg-blue-600 text-white">Version 2 (Enhanced)</Badge>
            </div>
            <Button variant="outline" size="sm" className="border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700">
              Export Comparison
            </Button>
          </div>

          <Tabs defaultValue="metrics" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="metrics" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">
                Performance Metrics
              </TabsTrigger>
              <TabsTrigger value="charts" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">
                Charts
              </TabsTrigger>
              <TabsTrigger value="config" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">
                Configuration
              </TabsTrigger>
            </TabsList>

            <TabsContent value="metrics" className="mt-4 rounded-md border border-zinc-800 bg-zinc-900 p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="pb-3 text-left font-medium text-zinc-400">METRIC</th>
                    <th className="pb-3 text-left font-medium text-zinc-400">VERSION 1</th>
                    <th className="pb-3 text-left font-medium text-zinc-400">VERSION 2</th>
                    <th className="pb-3 text-left font-medium text-zinc-400">CHANGE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 text-white">Accuracy</td>
                    <td className="py-3 text-white">0.85</td>
                    <td className="py-3 text-white">0.91</td>
                    <td className="py-3 text-green-500">+7.06%</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 text-white">Loss</td>
                    <td className="py-3 text-white">0.515</td>
                    <td className="py-3 text-white">0.32</td>
                    <td className="py-3 text-green-500">-37.86%</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 text-white">F1 Score</td>
                    <td className="py-3 text-white">0.83</td>
                    <td className="py-3 text-white">0.89</td>
                    <td className="py-3 text-green-500">+7.23%</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 text-white">Precision</td>
                    <td className="py-3 text-white">0.87</td>
                    <td className="py-3 text-white">0.92</td>
                    <td className="py-3 text-green-500">+5.75%</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-white">Recall</td>
                    <td className="py-3 text-white">0.82</td>
                    <td className="py-3 text-white">0.88</td>
                    <td className="py-3 text-green-500">+7.32%</td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>

            <TabsContent value="charts" className="mt-4 rounded-md border border-zinc-800 bg-zinc-900 p-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-md border border-zinc-800 bg-zinc-950 p-4">
                  <h3 className="mb-3 font-medium text-white">Loss Comparison</h3>
                  <div className="h-64 rounded-md bg-zinc-900 p-4">
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center text-zinc-400">
                        <p>Loss chart visualization</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-md border border-zinc-800 bg-zinc-950 p-4">
                  <h3 className="mb-3 font-medium text-white">Accuracy Comparison</h3>
                  <div className="h-64 rounded-md bg-zinc-900 p-4">
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center text-zinc-400">
                        <p>Accuracy chart visualization</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="config" className="mt-4 rounded-md border border-zinc-800 bg-zinc-900 p-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-md border border-zinc-800 bg-zinc-950 p-4">
                  <h3 className="mb-3 font-medium text-white">Version 1 Configuration</h3>
                  <div className="rounded-md bg-zinc-900 p-4 font-mono text-sm">
                    <p>learning_rate: 0.001</p>
                    <p>batch_size: 32</p>
                    <p>epochs: 10</p>
                    <p>optimizer: Adam</p>
                    <p>dropout_rate: 0.2</p>
                    <p>data_augmentation: minimal</p>
                    <p>early_stopping: patience=3</p>
                  </div>
                </div>
                <div className="rounded-md border border-zinc-800 bg-zinc-950 p-4">
                  <h3 className="mb-3 font-medium text-white">Version 2 Configuration</h3>
                  <div className="rounded-md bg-zinc-900 p-4 font-mono text-sm">
                    <p>learning_rate: 0.0005</p>
                    <p>batch_size: 64</p>
                    <p>epochs: 15</p>
                    <p>optimizer: AdamW</p>
                    <p>dropout_rate: 0.3</p>
                    <p>data_augmentation: extensive</p>
                    <p>early_stopping: patience=5</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
