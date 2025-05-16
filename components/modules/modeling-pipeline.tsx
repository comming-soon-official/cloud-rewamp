'use client'

import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip as ChartTooltip
} from 'chart.js'
import { Download, FileText, Home, Info, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

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
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VersionComparisonModal from '@/components/version-comparison-modal'

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    ChartTooltip,
    Legend,
    Filler
)

// Mock API response data
const apiResponse = {
    train_results: {
        loss: '0.163',
        accuracy: '0.943',
        precision: '0.95',
        recall: '0.94',
        f1_score: '0.945'
    },
    val_results: {
        loss: '0.355',
        accuracy: '0.88',
        precision: '0.89',
        recall: '0.87',
        f1_score: '0.88'
    },
    loss_plot_path: 'meta_info/loss_plot.png',
    accuracy_plot_path: 'meta_info/accuracy_plot.png',
    model_summary_path: 'meta_info/model_summary.txt',
    loss_data: [
        { epoch: 1, train: 0.685, val: 0.652 },
        { epoch: 2, train: 0.423, val: 0.518 },
        { epoch: 3, train: 0.312, val: 0.445 },
        { epoch: 4, train: 0.256, val: 0.421 },
        { epoch: 5, train: 0.214, val: 0.389 },
        { epoch: 6, train: 0.186, val: 0.375 },
        { epoch: 7, train: 0.174, val: 0.368 },
        { epoch: 8, train: 0.163, val: 0.355 }
    ],
    accuracy_data: [
        { epoch: 1, train: 0.534, val: 0.521 },
        { epoch: 2, train: 0.682, val: 0.654 },
        { epoch: 3, train: 0.783, val: 0.723 },
        { epoch: 4, train: 0.845, val: 0.768 },
        { epoch: 5, train: 0.878, val: 0.812 },
        { epoch: 6, train: 0.912, val: 0.845 },
        { epoch: 7, train: 0.932, val: 0.865 },
        { epoch: 8, train: 0.943, val: 0.88 }
    ]
}

// Helper function to format data for Chart.js
interface DataPoint {
    epoch: number
    train: number
    val: number
}

interface ChartDataset {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
    tension: number
    pointBackgroundColor: string
    pointBorderColor: string
    pointRadius: number
    pointHoverRadius: number
    fill?: boolean
}

interface ChartData {
    labels: string[]
    datasets: ChartDataset[]
}

function formatChartData(
    data: DataPoint[],
    type: 'loss' | 'accuracy'
): ChartData {
    const labels = data.map((item) => `Epoch ${item.epoch}`)

    let datasets: ChartDataset[] = []

    if (type === 'loss') {
        datasets = [
            {
                label: 'Training Loss',
                data: data.map((item) => item.train),
                borderColor: '#ef4444', // red
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.3,
                pointBackgroundColor: '#ef4444',
                pointBorderColor: '#ffffff',
                pointRadius: 4,
                pointHoverRadius: 6
            },
            {
                label: 'Validation Loss',
                data: data.map((item) => item.val),
                borderColor: '#10b981', // green
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.3,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#ffffff',
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ]
    } else if (type === 'accuracy') {
        datasets = [
            {
                label: 'Training Accuracy',
                data: data.map((item) => item.train),
                borderColor: '#3b82f6', // blue
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                tension: 0.3,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#ffffff',
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true
            },
            {
                label: 'Validation Accuracy',
                data: data.map((item) => item.val),
                borderColor: '#eab308', // yellow
                backgroundColor: 'rgba(234, 179, 8, 0.2)',
                tension: 0.3,
                pointBackgroundColor: '#eab308',
                pointBorderColor: '#ffffff',
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true
            }
        ]
    }

    return { labels, datasets }
}

// Common chart options
interface ChartOptions {
    responsive: boolean
    maintainAspectRatio: boolean
    plugins: {
        legend: {
            position: 'bottom'
            labels: {
                color: string
                usePointStyle: boolean
                pointStyle: 'circle'
                padding: number
                font: {
                    size: number
                }
            }
        }
        tooltip: {
            backgroundColor: string
            titleColor: string
            bodyColor: string
            borderColor: string
            borderWidth: number
            padding: number
            displayColors: boolean
            usePointStyle: boolean
            mode: 'index'
            intersect: boolean
            boxPadding: number
            titleFont: {
                size: number
                weight: string
            }
            bodyFont: {
                size: number
            }
            callbacks: {
                title: (tooltipItems: Array<{ label: string }>) => string
            }
        }
    }
    scales: {
        x: {
            type: string
            grid: {
                color: string
            }
            ticks: {
                color: string
            }
            title: {
                display: boolean
                text: string
                color: string
                padding: {
                    top: number
                    bottom: number
                }
                font: {
                    size: number
                    weight: string
                }
            }
        }
        y: {
            type: string
            grid: {
                color: string
            }
            ticks: {
                color: string
            }
        }
    }
}

const commonOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                color: '#ffffff',
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 20,
                font: {
                    size: 12
                }
            }
        },
        tooltip: {
            backgroundColor: '#18181b',
            titleColor: '#ffffff',
            bodyColor: '#d4d4d8',
            borderColor: '#3f3f46',
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            usePointStyle: true,
            mode: 'index',
            intersect: false,
            boxPadding: 4,
            titleFont: {
                size: 14,
                weight: 'bold'
            },
            bodyFont: {
                size: 12
            },
            callbacks: {
                title: function (tooltipItems) {
                    return tooltipItems[0].label
                }
            }
        }
    },
    scales: {
        x: {
            type: 'category',
            grid: {
                color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
                color: '#a1a1aa'
            },
            title: {
                display: true,
                text: 'Epochs',
                color: '#d4d4d8',
                padding: { top: 10, bottom: 0 },
                font: {
                    size: 12,
                    weight: 'normal' as const
                }
            }
        },
        y: {
            type: 'linear',
            grid: {
                color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
                color: '#a1a1aa'
            }
        }
    }
}

export default function ModelingPipeline() {
    const [comparisonOpen, setComparisonOpen] = useState(false)
    const [selectedVersion, setSelectedVersion] = useState('v1')
    const [modelData, setModelData] = useState(apiResponse)
    const [loading, setLoading] = useState(true)

    // Simulate loading of data
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

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
                        <span className="text-white">Home</span>
                    </Link>
                    <span>/</span>
                    <span className="text-white">Modeling Pipeline</span>
                </div>

                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Modeling Pipeline
                        </h1>
                        <p className="mt-1 text-zinc-400">
                            Train, evaluate, and optimize your AI models
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
                        CNN Architecture
                    </Badge>
                    <Badge
                        variant="outline"
                        className="border-zinc-700 bg-zinc-800"
                    >
                        Binary Classification
                    </Badge>
                    <Badge
                        variant="outline"
                        className="border-zinc-700 bg-zinc-800"
                    >
                        Transfer Learning
                    </Badge>
                    <Badge
                        variant="outline"
                        className="border-zinc-700 bg-zinc-800"
                    >
                        Attention Mechanism
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
                        value="architecture"
                        className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
                    >
                        Architecture
                    </TabsTrigger>
                    <TabsTrigger
                        value="training"
                        className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
                    >
                        Training
                    </TabsTrigger>
                    <TabsTrigger
                        value="evaluation"
                        className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
                    >
                        Evaluation
                    </TabsTrigger>
                    <TabsTrigger
                        value="reports"
                        className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
                    >
                        Reports
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-0">
                    <Card className="border-zinc-800 bg-zinc-900">
                        <CardHeader className="border-b border-zinc-800 pb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg font-medium text-white">
                                        Model Summary
                                    </CardTitle>
                                    <CardDescription>
                                        {modelData.model_summary_path}
                                    </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 border-zinc-700 bg-zinc-800"
                                    >
                                        <FileText className="mr-2 h-4 w-4" />
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="rounded-md border border-zinc-800 bg-zinc-950 p-4 font-mono text-sm text-white">
                                {loading ? (
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-3/4 bg-zinc-800" />
                                        <Skeleton className="h-4 w-4/5 bg-zinc-800" />
                                        <Skeleton className="h-4 w-2/3 bg-zinc-800" />
                                        <Skeleton className="h-4 w-3/4 bg-zinc-800" />
                                        <Skeleton className="h-4 w-1/2 bg-zinc-800" />
                                        <Skeleton className="h-4 w-3/5 bg-zinc-800" />
                                        <Skeleton className="h-4 w-2/5 bg-zinc-800" />
                                    </div>
                                ) : (
                                    <>
                                        <p>Model: DeepFakeDetector v1.0</p>
                                        <p>
                                            Architecture: CNN with attention
                                            mechanism
                                        </p>
                                        <p>Input shape: (128, 128, 3)</p>
                                        <p>
                                            Output: Binary classification
                                            (real/fake)
                                        </p>
                                        <p>Parameters: 4,217,986</p>
                                        <p>Optimizer: Adam (lr=0.001)</p>
                                        <p>
                                            Loss function: Binary crossentropy
                                        </p>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Card className="border-zinc-800 bg-zinc-900">
                            <CardHeader className="border-b border-zinc-800 pb-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg font-medium text-white">
                                            Model Loss
                                        </CardTitle>
                                        <CardDescription>
                                            Training and validation loss over
                                            epochs
                                        </CardDescription>
                                    </div>
                                    <span className="inline-flex items-center rounded-full bg-pink-600/10 px-2.5 py-0.5 text-xs font-medium text-pink-600">
                                        Loss: {modelData.val_results.loss}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="relative h-[300px] overflow-hidden rounded-md bg-zinc-800 p-2">
                                    {loading ? (
                                        <Skeleton className="h-full w-full bg-zinc-700" />
                                    ) : (
                                        <div className="h-full w-full">
                                            <Line
                                                data={formatChartData(
                                                    modelData.loss_data,
                                                    'loss'
                                                )}
                                                options={{
                                                    ...commonOptions,
                                                    scales: {
                                                        ...commonOptions.scales,
                                                        y: {
                                                            ...commonOptions
                                                                .scales.y,
                                                            title: {
                                                                display: true,
                                                                text: 'Loss',
                                                                color: '#d4d4d8',
                                                                padding: {
                                                                    top: 0,
                                                                    bottom: 10
                                                                },
                                                                font: {
                                                                    size: 12,
                                                                    weight: 'normal'
                                                                }
                                                            }
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 flex justify-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-red-600"></div>
                                        <span className="text-sm">
                                            Training Loss:{' '}
                                            {modelData.train_results.loss}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-green-600"></div>
                                        <span className="text-sm">
                                            Validation Loss:{' '}
                                            {modelData.val_results.loss}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-zinc-800 bg-zinc-900">
                            <CardHeader className="border-b border-zinc-800 pb-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg font-medium text-white">
                                            Model Accuracy
                                        </CardTitle>
                                        <CardDescription>
                                            Training and validation accuracy
                                            over epochs
                                        </CardDescription>
                                    </div>
                                    <span className="inline-flex items-center rounded-full bg-emerald-600/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
                                        Accuracy:{' '}
                                        {modelData.val_results.accuracy}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="relative h-[300px] overflow-hidden rounded-md bg-zinc-800 p-2">
                                    {loading ? (
                                        <Skeleton className="h-full w-full bg-zinc-700" />
                                    ) : (
                                        <div className="h-full w-full">
                                            <Line
                                                data={formatChartData(
                                                    modelData.accuracy_data,
                                                    'accuracy'
                                                )}
                                                options={{
                                                    ...commonOptions,
                                                    scales: {
                                                        ...commonOptions.scales,
                                                        y: {
                                                            ...commonOptions
                                                                .scales.y,
                                                            min: 0.4,
                                                            max: 1,
                                                            title: {
                                                                display: true,
                                                                text: 'Accuracy',
                                                                color: '#d4d4d8',
                                                                padding: {
                                                                    top: 0,
                                                                    bottom: 10
                                                                },
                                                                font: {
                                                                    size: 12,
                                                                    weight: 'normal'
                                                                }
                                                            }
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 flex justify-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                                        <span className="text-sm">
                                            Training Accuracy:{' '}
                                            {modelData.train_results.accuracy}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-yellow-600"></div>
                                        <span className="text-sm">
                                            Validation Accuracy:{' '}
                                            {modelData.val_results.accuracy}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-6 border-zinc-800 bg-zinc-900">
                        <CardHeader className="border-b border-zinc-800 pb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg font-medium text-white">
                                        Performance Metrics
                                    </CardTitle>
                                    <CardDescription>
                                        Final model performance on training and
                                        validation sets
                                    </CardDescription>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-zinc-400 hover:text-white"
                                >
                                    <Info className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="overflow-x-auto">
                                {loading ? (
                                    <div className="space-y-2">
                                        <Skeleton className="h-8 w-full bg-zinc-800" />
                                        <Skeleton className="h-8 w-full bg-zinc-800" />
                                        <Skeleton className="h-8 w-full bg-zinc-800" />
                                    </div>
                                ) : (
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-zinc-800">
                                                <th className="pb-2 text-left font-medium text-zinc-400">
                                                    DATASET
                                                </th>
                                                <th className="pb-2 text-left font-medium text-zinc-400">
                                                    LOSS
                                                </th>
                                                <th className="pb-2 text-left font-medium text-zinc-400">
                                                    ACCURACY
                                                </th>
                                                <th className="pb-2 text-left font-medium text-zinc-400">
                                                    PRECISION
                                                </th>
                                                <th className="pb-2 text-left font-medium text-zinc-400">
                                                    RECALL
                                                </th>
                                                <th className="pb-2 text-left font-medium text-zinc-400">
                                                    F1 SCORE
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-zinc-800">
                                                <td className="py-3 text-white">
                                                    Training
                                                </td>
                                                <td className="py-3 text-white">
                                                    <span className="flex items-center">
                                                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-red-600"></span>
                                                        {
                                                            modelData
                                                                .train_results
                                                                .loss
                                                        }
                                                    </span>
                                                </td>
                                                <td className="py-3 text-white">
                                                    <span className="flex items-center">
                                                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                                                        {
                                                            modelData
                                                                .train_results
                                                                .accuracy
                                                        }
                                                    </span>
                                                </td>
                                                <td className="py-3 text-white">
                                                    {
                                                        modelData.train_results
                                                            .precision
                                                    }
                                                </td>
                                                <td className="py-3 text-white">
                                                    {
                                                        modelData.train_results
                                                            .recall
                                                    }
                                                </td>
                                                <td className="py-3 text-white">
                                                    {
                                                        modelData.train_results
                                                            .f1_score
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 text-white">
                                                    Validation
                                                </td>
                                                <td className="py-3 text-white">
                                                    <span className="flex items-center">
                                                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                                        {
                                                            modelData
                                                                .val_results
                                                                .loss
                                                        }
                                                    </span>
                                                </td>
                                                <td className="py-3 text-white">
                                                    <span className="flex items-center">
                                                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-yellow-600"></span>
                                                        {
                                                            modelData
                                                                .val_results
                                                                .accuracy
                                                        }
                                                    </span>
                                                </td>
                                                <td className="py-3 text-white">
                                                    {
                                                        modelData.val_results
                                                            .precision
                                                    }
                                                </td>
                                                <td className="py-3 text-white">
                                                    {
                                                        modelData.val_results
                                                            .recall
                                                    }
                                                </td>
                                                <td className="py-3 text-white">
                                                    {
                                                        modelData.val_results
                                                            .f1_score
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )}
                            </div>

                            {!loading && (
                                <div className="mt-4 rounded-md border border-zinc-800 bg-zinc-950 p-3">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-full bg-pink-600/10 p-2">
                                            <Info className="h-4 w-4 text-pink-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-white">
                                                Performance Analysis
                                            </h4>
                                            <p className="mt-1 text-xs text-zinc-400">
                                                The model shows excellent
                                                training performance with{' '}
                                                {
                                                    modelData.train_results
                                                        .accuracy
                                                }{' '}
                                                accuracy, but there's a slight
                                                gap with validation accuracy at{' '}
                                                {modelData.val_results.accuracy}
                                                , indicating some potential
                                                overfitting. Consider
                                                implementing additional
                                                regularization techniques.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Other tab contents would be implemented similarly */}
            </Tabs>

            <VersionComparisonModal
                open={comparisonOpen}
                onOpenChange={setComparisonOpen}
                moduleType="Modeling Pipeline"
            />
        </div>
    )
}
