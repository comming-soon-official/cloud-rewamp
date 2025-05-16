'use client'

import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js'
import { Download, FileText, Home, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VersionComparisonModal from '@/components/version-comparison-modal'

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
)

export default function DataDiagnostic() {
    const [comparisonOpen, setComparisonOpen] = useState(false)
    const [selectedVersion, setSelectedVersion] = useState('v1')

    // Chart data for dataset distribution
    const classDistributionData = {
        labels: ['Forge', 'Real'],
        datasets: [
            {
                label: 'Number of Images',
                data: [60, 60],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)'
                ],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }
        ]
    }

    // Chart data for resolution distribution
    const resolutionDistributionData = {
        labels: ['64x64', '128x128', '256x256', '512x512'],
        datasets: [
            {
                label: 'Images by Resolution',
                data: [25, 60, 25, 10],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(255, 205, 86, 0.8)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 205, 86, 1)'
                ],
                borderWidth: 1
            }
        ]
    }

    // Chart data for data points distribution
    const dataPointsDistributionData = {
        labels: ['Training Data', 'Validation Data'],
        datasets: [
            {
                data: [70, 30],
                backgroundColor: [
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(37, 99, 235, 0.8)'
                ],
                borderColor: ['rgba(236, 72, 153, 1)', 'rgba(37, 99, 235, 1)'],
                borderWidth: 1
            }
        ]
    }

    // Chart options
    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: 'rgba(255, 255, 255, 0.8)',
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(23, 23, 23, 0.9)',
                titleColor: 'rgba(255, 255, 255, 1)',
                bodyColor: 'rgba(255, 255, 255, 1)',
                borderColor: 'rgba(75, 85, 99, 1)',
                borderWidth: 1,
                padding: 10,
                displayColors: true
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(75, 85, 99, 0.2)'
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.8)'
                }
            },
            y: {
                grid: {
                    color: 'rgba(75, 85, 99, 0.2)'
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.8)'
                }
            }
        }
    }

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: 'rgba(255, 255, 255, 0.8)',
                    font: {
                        size: 12
                    },
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(23, 23, 23, 0.9)',
                titleColor: 'rgba(255, 255, 255, 1)',
                bodyColor: 'rgba(255, 255, 255, 1)',
                borderColor: 'rgba(75, 85, 99, 1)',
                borderWidth: 1,
                padding: 10,
                displayColors: true
            }
        }
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Module Header */}
            <div className="flex flex-col gap-4 rounded-md border border-zinc-800 bg-zinc-900 p-6">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Link
                        href="#"
                        className="flex items-center gap-1 hover:text-white"
                        onClick={(e) => e.preventDefault()}
                    >
                        <Home className="h-3.5 w-3.5" />
                        <span>Home</span>
                    </Link>
                    <span>/</span>
                    <span className="text-white">Data Diagnostic</span>
                </div>

                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Data Diagnostic</h1>
                        <p className="mt-1 text-zinc-400">
                            Analyze and diagnose your dataset for quality issues
                            and distribution patterns
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Select
                            value={selectedVersion}
                            onValueChange={setSelectedVersion}
                        >
                            <SelectTrigger className="w-[180px] border-zinc-700 bg-zinc-800">
                                <SelectValue placeholder="Select Version" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="v1">
                                    Version 1 (Current)
                                </SelectItem>
                                <SelectItem value="v2">
                                    Version 2 (Enhanced)
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Button
                            variant="outline"
                            className="border-zinc-700 bg-zinc-800"
                            onClick={() => setComparisonOpen(true)}
                        >
                            Compare Versions
                        </Button>

                        <Button
                            variant="outline"
                            className="border-zinc-700 bg-zinc-800"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Refresh Data
                        </Button>

                        <Button
                            variant="outline"
                            className="border-zinc-700 bg-zinc-800"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Export Report
                        </Button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Badge
                        variant="outline"
                        className="border-zinc-700 bg-zinc-800"
                    >
                        Image Dataset
                    </Badge>
                    <Badge
                        variant="outline"
                        className="border-zinc-700 bg-zinc-800"
                    >
                        Classification
                    </Badge>
                    <Badge
                        variant="outline"
                        className="border-zinc-700 bg-zinc-800"
                    >
                        Binary Labels
                    </Badge>
                    <Badge
                        variant="outline"
                        className="border-zinc-700 bg-zinc-800"
                    >
                        128x128 Resolution
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
                        value="distribution"
                        className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
                    >
                        Distribution
                    </TabsTrigger>
                    <TabsTrigger
                        value="quality"
                        className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
                    >
                        Quality Metrics
                    </TabsTrigger>
                    <TabsTrigger
                        value="outliers"
                        className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
                    >
                        Outliers
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
                                        <CardTitle className="text-lg font-medium text-white">
                                            Dataset Distribution
                                        </CardTitle>
                                        <CardDescription>
                                            Number of images in each class
                                        </CardDescription>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 border-zinc-700 bg-zinc-800"
                                    >
                                        <FileText className="mr-2 h-4 w-4" />
                                        View Details
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="h-[300px] rounded-md bg-zinc-800 p-4">
                                        <div className="flex h-full items-center justify-center">
                                            <Bar
                                                data={classDistributionData}
                                                options={barOptions}
                                                className="w-full h-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="h-[300px] rounded-md bg-zinc-800 p-4">
                                        <div className="flex h-full items-center justify-center">
                                            <Bar
                                                data={
                                                    resolutionDistributionData
                                                }
                                                options={barOptions}
                                                className="w-full h-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex flex-col gap-6">
                            <Card className="border-zinc-800 bg-zinc-900">
                                <CardHeader className="border-b border-zinc-800 pb-3">
                                    <CardTitle className="text-lg font-medium text-white">
                                        Dataset Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">
                                                Image Dimension:
                                            </span>
                                            <span className="text-white">
                                                128 x 128
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">
                                                Test Size:
                                            </span>
                                            <span className="text-white">
                                                0.3
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">
                                                Total Images:
                                            </span>
                                            <span className="text-white">
                                                120
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">
                                                Classes:
                                            </span>
                                            <span className="text-white">
                                                2 (forge, real)
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-zinc-800 bg-zinc-900">
                                <CardHeader className="border-b border-zinc-800 pb-3">
                                    <CardTitle className="text-lg font-medium text-white">
                                        Data Points Distribution
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <div className="flex justify-center h-48">
                                        <Doughnut
                                            data={dataPointsDistributionData}
                                            options={pieOptions}
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full bg-pink-600"></div>
                                            <span className="text-white">
                                                Training Data (70%)
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                                            <span className="text-white">
                                                Validation Data (30%)
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <Card className="mt-6 border-zinc-800 bg-zinc-900">
                        <CardHeader className="border-b border-zinc-800 pb-3">
                            <CardTitle className="text-lg font-medium text-white">
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
                                        <tr className="border-b border-zinc-800">
                                            <th className="pb-2 text-left font-medium text-zinc-400">
                                                CLASSNAME
                                            </th>
                                            <th className="pb-2 text-left font-medium text-zinc-400">
                                                DUPLICATE
                                            </th>
                                            <th className="pb-2 text-left font-medium text-zinc-400">
                                                DUPLICATE %
                                            </th>
                                            <th className="pb-2 text-left font-medium text-zinc-400">
                                                OUTLIER
                                            </th>
                                            <th className="pb-2 text-left font-medium text-zinc-400">
                                                OUTLIER %
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-zinc-800">
                                            <td className="py-3 text-white">
                                                forge
                                            </td>
                                            <td className="py-3 text-white">
                                                0/60
                                            </td>
                                            <td className="py-3 text-white">
                                                0.0%
                                            </td>
                                            <td className="py-3 text-white">
                                                16/60
                                            </td>
                                            <td className="py-3 text-white">
                                                26.667%
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 text-white">
                                                real
                                            </td>
                                            <td className="py-3 text-white">
                                                0/60
                                            </td>
                                            <td className="py-3 text-white">
                                                0.0%
                                            </td>
                                            <td className="py-3 text-white">
                                                17/60
                                            </td>
                                            <td className="py-3 text-white">
                                                28.333%
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="distribution" className="mt-0">
                    <Card className="border-zinc-800 bg-zinc-900">
                        <CardHeader>
                            <CardTitle className="text-white">
                                Class Distribution Analysis
                            </CardTitle>
                            <CardDescription>
                                Detailed analysis of data distribution across
                                classes
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px] rounded-md bg-zinc-800 p-4">
                                <Bar
                                    data={classDistributionData}
                                    options={{
                                        ...barOptions,
                                        indexAxis: 'y' as const,
                                        plugins: {
                                            ...barOptions.plugins,
                                            title: {
                                                display: true,
                                                text: 'Distribution by Class',
                                                color: 'rgba(255, 255, 255, 0.8)',
                                                font: {
                                                    size: 16
                                                },
                                                padding: {
                                                    top: 10,
                                                    bottom: 20
                                                }
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Other tab contents would be implemented similarly */}
            </Tabs>

            <VersionComparisonModal
                open={comparisonOpen}
                onOpenChange={setComparisonOpen}
                moduleType="Data Diagnostic"
            />
        </div>
    )
}
