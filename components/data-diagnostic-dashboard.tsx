import { ArrowLeft, Download, RefreshCw } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

export default function DataDiagnosticDashboard() {
    return (
        <div>
            {/* Module Header with Navigation */}
            <div className="mb-6 flex items-center justify-between rounded-lg bg-pink-950 p-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">
                        DATA DIAGNOSTIC
                    </h2>
                    <div className="mt-1 flex items-center gap-2">
                        <Link
                            href="/"
                            className="flex items-center gap-1 text-sm text-pink-300 hover:text-pink-200"
                        >
                            <ArrowLeft size={14} />
                            <span>Back to Home</span>
                        </Link>
                        <span className="text-gray-400">|</span>
                        <Badge
                            variant="outline"
                            className="bg-pink-900 text-pink-200"
                        >
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
                            <SelectItem value="v1">
                                Version 1 (Current)
                            </SelectItem>
                            <SelectItem value="v2">
                                Version 2 (Draft)
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <Button
                        variant="outline"
                        size="sm"
                        className="border-pink-700 bg-pink-900 text-white hover:bg-pink-800"
                    >
                        <RefreshCw size={14} className="mr-2" />
                        Refresh Data
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        className="border-pink-700 bg-pink-900 text-white hover:bg-pink-800"
                    >
                        <Download size={14} className="mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Data Diagnostic Content */}
            <div className="grid grid-cols-12 gap-4">
                {/* Left Column */}
                <div className="col-span-8 space-y-4">
                    <Card className="border-gray-800 bg-gray-900">
                        <CardHeader className="border-b border-gray-800 pb-3">
                            <CardTitle className="text-lg font-medium">
                                Dataset Distribution
                            </CardTitle>
                            <CardDescription>
                                Number of images in each class
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="h-64 rounded bg-gray-800 p-4">
                                {/* This would be a chart component in a real implementation */}
                                <div className="flex h-full items-center justify-center">
                                    <div className="text-center">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="h-48 w-48 bg-teal-200"></div>
                                            <div className="h-48 w-48 bg-teal-200"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-800 bg-gray-900">
                        <CardHeader className="border-b border-gray-800 pb-3">
                            <CardTitle className="text-lg font-medium">
                                Data Quality Metrics
                            </CardTitle>
                            <CardDescription>
                                Duplicates and outliers by class
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-800">
                                            <th className="pb-2 text-left font-medium text-gray-400">
                                                CLASSNAME
                                            </th>
                                            <th className="pb-2 text-left font-medium text-gray-400">
                                                DUPLICATE
                                            </th>
                                            <th className="pb-2 text-left font-medium text-gray-400">
                                                DUPLICATE %
                                            </th>
                                            <th className="pb-2 text-left font-medium text-gray-400">
                                                OUTLIER
                                            </th>
                                            <th className="pb-2 text-left font-medium text-gray-400">
                                                OUTLIER %
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-800">
                                            <td className="py-3">forge</td>
                                            <td className="py-3">0/60</td>
                                            <td className="py-3">0.0%</td>
                                            <td className="py-3">16/60</td>
                                            <td className="py-3">26.667%</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3">real</td>
                                            <td className="py-3">0/60</td>
                                            <td className="py-3">0.0%</td>
                                            <td className="py-3">17/60</td>
                                            <td className="py-3">28.333%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="col-span-4 space-y-4">
                    <Card className="border-gray-800 bg-gray-900">
                        <CardHeader className="border-b border-gray-800 pb-3">
                            <CardTitle className="text-lg font-medium">
                                Dataset Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Image Dimension:
                                    </span>
                                    <span>128 x 128</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Test Size:
                                    </span>
                                    <span>0.3</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Total Images:
                                    </span>
                                    <span>120</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Classes:
                                    </span>
                                    <span>2 (forge, real)</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-800 bg-gray-900">
                        <CardHeader className="border-b border-gray-800 pb-3">
                            <CardTitle className="text-lg font-medium">
                                Data Points Distribution
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="flex justify-center">
                                {/* This would be a pie chart component in a real implementation */}
                                <div className="relative h-48 w-48">
                                    <div className="absolute inset-0 rounded-full border-8 border-pink-500"></div>
                                    <div className="absolute bottom-0 left-0 right-1/3 top-0 rounded-l-full border-8 border-blue-500"></div>
                                    <div className="absolute inset-[25%] rounded-full bg-black"></div>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-pink-500"></div>
                                    <span>Data Points</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                    <span>Validation Points</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
