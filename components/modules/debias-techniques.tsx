'use client'

import {
    ChevronRight,
    Download,
    FileText,
    Home,
    Info,
    LineChart
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import VersionComparisonModal from '@/components/version-comparison-modal'

export default function DebiasTechniques() {
    const [comparisonOpen, setComparisonOpen] = useState(false)
    const [selectedVersion, setSelectedVersion] = useState('v1')
    const [selectedMethod, setSelectedMethod] = useState('GridSearch_24')

    // Data from API response
    const debiasData = {
        one_liner:
            'Debiasing refers to the process of mitigating or reducing bias in machine learning models, particularly in terms of fairness and equity, to ensure fair treatment of different groups or individuals in the prediction outcomes.',
        img_path: [
            'https://s3.ap-south-1.amazonaws.com/ai.datasets/bias_demo/structured/Results_Vehicle_insurance/debias/debias_exponentiated_plot.jpg',
            'https://s3.ap-south-1.amazonaws.com/ai.datasets/bias_demo/structured/Results_Vehicle_insurance/debias/After_Grid.jpg'
        ],
        download:
            'https://s3.ap-south-1.amazonaws.com/ai.datasets/bias_demo/structured/Results_Vehicle_insurance/debias/metrics_description.docx',
        scores: {
            data: [
                {
                    Metrics: 'Overall selection rate',
                    'Before Debias': 0.48,
                    'After ThresholdOptimizer': 0.47,
                    'After Exponentiated': 0.48,
                    'After GridSearch_24': 0.99875
                },
                {
                    Metrics: 'Demographic parity difference',
                    'Before Debias': 0.9795918367,
                    'After ThresholdOptimizer': 0.9591836735,
                    'After Exponentiated': 0.9795918367,
                    'After GridSearch_24': 0.0025510204
                },
                {
                    Metrics: 'Demographic parity ratio',
                    'Before Debias': 0,
                    'After ThresholdOptimizer': 0,
                    'After Exponentiated': 0,
                    'After GridSearch_24': 0.9974489796
                },
                {
                    Metrics: 'Overall balanced error rate',
                    'Before Debias': 0.0945871306,
                    'After ThresholdOptimizer': 0.1052823178,
                    'After Exponentiated': 0.0945871306,
                    'After GridSearch_24': 0.5013368984
                },
                {
                    Metrics: 'Balanced error rate difference',
                    'Before Debias': 0.0013061651,
                    'After ThresholdOptimizer': 0.0101880878,
                    'After Exponentiated': 0.0013061651,
                    'After GridSearch_24': 0.0014367816
                },
                {
                    Metrics: 'False positive rate difference',
                    'Before Debias': 0.9772727273,
                    'After ThresholdOptimizer': 0.9772727273,
                    'After Exponentiated': 0.9772727273,
                    'After GridSearch_24': 0
                },
                {
                    Metrics: 'False negative rate difference',
                    'Before Debias': 0.9798850575,
                    'After ThresholdOptimizer': 0.9568965517,
                    'After Exponentiated': 0.9798850575,
                    'After GridSearch_24': 0.0028735632
                },
                {
                    Metrics: 'Equalized odds difference',
                    'Before Debias': 0.9798850575,
                    'After ThresholdOptimizer': 0.9772727273,
                    'After Exponentiated': 0.9798850575,
                    'After GridSearch_24': 0.0028735632
                },
                {
                    Metrics: 'Equalized odds ratio',
                    'Before Debias': 0,
                    'After ThresholdOptimizer': 0,
                    'After Exponentiated': 0,
                    'After GridSearch_24': 0.9971264368
                },
                {
                    Metrics: 'AUC Difference ',
                    'Before Debias': 0.9236147724,
                    'After ThresholdOptimizer': 0.8947176822,
                    'After Exponentiated': 0.9054128694,
                    'After GridSearch_24': 0.3553858803
                }
            ],
            download:
                'https://s3.ap-south-1.amazonaws.com/ai.datasets/bias_demo/structured/Results_Vehicle_insurance/debias/bias_scores.csv'
        }
    }

    // Debias methods
    const debiasMethods = [
        {
            id: 'ThresholdOptimizer',
            name: 'Threshold Optimizer',
            description:
                'Adjusts classification thresholds to achieve fairness constraints'
        },
        {
            id: 'Exponentiated',
            name: 'Exponentiated Gradient',
            description:
                'Uses exponential gradient techniques to reweight data points'
        },
        {
            id: 'GridSearch_24',
            name: 'Grid Search',
            description:
                'Systematic search through parameter space for optimal fairness-accuracy trade-off'
        }
    ]

    // Calculate metric improvement for selected method
    interface MetricDataPoint {
        Metrics: string
        'Before Debias': number
        'After ThresholdOptimizer': number
        'After Exponentiated': number
        'After GridSearch_24': number
        [key: string]: string | number // For dynamic access with `After ${selectedMethod}`
    }

    const getImprovement = (metric: MetricDataPoint): string => {
        const beforeValue: number = metric['Before Debias']
        const afterValue: number = metric[`After ${selectedMethod}`] as number

        // For metrics where lower is better (most fairness metrics)
        if (
            metric.Metrics.includes('difference') ||
            metric.Metrics.includes('error rate')
        ) {
            if (beforeValue > afterValue) {
                return (
                    ((beforeValue - afterValue) / beforeValue) *
                    100
                ).toFixed(1)
            } else {
                return (
                    ((afterValue - beforeValue) / beforeValue) *
                    100
                ).toFixed(1)
            }
        }
        // For metrics where higher is better (ratios, closer to 1 is better)
        else {
            if (afterValue > beforeValue) {
                return (
                    ((afterValue - beforeValue) /
                        (beforeValue === 0 ? 0.01 : beforeValue)) *
                    100
                ).toFixed(1)
            } else {
                return (
                    ((beforeValue - afterValue) /
                        (beforeValue === 0 ? 0.01 : beforeValue)) *
                    100
                ).toFixed(1)
            }
        }
    }

    const formatNumber = (num: any) => {
        return Number(num).toFixed(4)
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Module Header */}
            <div className="flex flex-col gap-4 rounded-md border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Link
                        href="#"
                        className="flex items-center gap-1 hover:text-white"
                        onClick={(e) => e.preventDefault()}
                    >
                        <Home className="h-3.5 w-3.5" />
                        <span>Home</span>
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="text-white">Debias Techniques</span>
                </div>

                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            Debiasing Techniques & Analysis
                        </h1>
                        <p className="mt-1 text-zinc-400 max-w-2xl">
                            {debiasData.one_liner}
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700"
                        onClick={() =>
                            window.open(
                                `/api/download?file=${debiasData.download}`,
                                '_blank'
                            )
                        }
                    >
                        <FileText className="h-4 w-4" />
                        <span>Metrics Documentation</span>
                    </Button>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                    <Badge
                        variant="outline"
                        className="border-zinc-700 bg-zinc-800"
                    >
                        Fairness Metrics
                    </Badge>
                    <Badge
                        variant="outline"
                        className="border-zinc-700 bg-zinc-800"
                    >
                        Bias Mitigation
                    </Badge>
                    <Badge
                        variant="outline"
                        className="border-green-700 bg-green-900/30 text-green-300"
                    >
                        <Info className="mr-1 h-3 w-3" />
                        GridSearch Shows Best Results
                    </Badge>
                </div>
            </div>

            {/* Module Content */}
            <Tabs defaultValue="visualization" className="w-full">
                <TabsList className="mb-6 w-full justify-start bg-transparent p-0">
                    <TabsTrigger
                        value="visualization"
                        className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
                    >
                        Visualizations
                    </TabsTrigger>
                    <TabsTrigger
                        value="metrics"
                        className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
                    >
                        Metrics
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="visualization" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {debiasData.img_path.map((img, index) => (
                            <Card
                                key={index}
                                className="border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950"
                            >
                                <CardHeader className="border-b border-zinc-800">
                                    <CardTitle className="text-white">
                                        {index === 0
                                            ? 'Exponentiated Gradient Plot'
                                            : 'After Grid Search Optimization'}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="relative w-full aspect-square">
                                        <Image
                                            src={`${img}`}
                                            alt={
                                                index === 0
                                                    ? 'Exponentiated gradient plot'
                                                    : 'After grid search optimization'
                                            }
                                            fill
                                            // className="object-contain"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="metrics" className="mt-0">
                    <Card className="border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950">
                        <CardHeader className="border-b border-zinc-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-white">
                                        Debiasing Metrics Comparison
                                    </CardTitle>
                                    <CardDescription>
                                        Comparing metrics before and after
                                        applying different debiasing methods
                                    </CardDescription>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-2 border-zinc-700 hover:bg-zinc-800"
                                    onClick={() =>
                                        window.open(
                                            `${debiasData.scores.download}`,
                                            '_blank'
                                        )
                                    }
                                >
                                    <Download className="h-4 w-4" />
                                    <span>Download CSV</span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-zinc-800/50 hover:bg-zinc-800/50">
                                            <TableHead className="text-zinc-400 font-medium w-[250px]">
                                                Metric
                                            </TableHead>
                                            <TableHead className="text-zinc-400 font-medium">
                                                Before Debiasing
                                            </TableHead>
                                            <TableHead className="text-zinc-400 font-medium">
                                                After ThresholdOptimizer
                                            </TableHead>
                                            <TableHead className="text-zinc-400 font-medium">
                                                After Exponentiated
                                            </TableHead>
                                            <TableHead className="text-zinc-400 font-medium">
                                                After GridSearch_24
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {debiasData.scores.data.map(
                                            (metric, index) => (
                                                <TableRow
                                                    key={index}
                                                    className="hover:bg-zinc-800/20 border-zinc-800"
                                                >
                                                    <TableCell className="font-medium text-white">
                                                        {metric.Metrics}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formatNumber(
                                                            metric[
                                                                'Before Debias'
                                                            ]
                                                        )}
                                                    </TableCell>
                                                    <TableCell
                                                        className={
                                                            metric[
                                                                'After ThresholdOptimizer'
                                                            ] <
                                                                metric[
                                                                    'Before Debias'
                                                                ] &&
                                                            metric.Metrics.includes(
                                                                'difference'
                                                            )
                                                                ? 'text-green-400'
                                                                : ''
                                                        }
                                                    >
                                                        {formatNumber(
                                                            metric[
                                                                'After ThresholdOptimizer'
                                                            ]
                                                        )}
                                                    </TableCell>
                                                    <TableCell
                                                        className={
                                                            metric[
                                                                'After Exponentiated'
                                                            ] <
                                                                metric[
                                                                    'Before Debias'
                                                                ] &&
                                                            metric.Metrics.includes(
                                                                'difference'
                                                            )
                                                                ? 'text-green-400'
                                                                : ''
                                                        }
                                                    >
                                                        {formatNumber(
                                                            metric[
                                                                'After Exponentiated'
                                                            ]
                                                        )}
                                                    </TableCell>
                                                    <TableCell
                                                        className={
                                                            (metric[
                                                                'After GridSearch_24'
                                                            ] <
                                                                metric[
                                                                    'Before Debias'
                                                                ] &&
                                                                metric.Metrics.includes(
                                                                    'difference'
                                                                )) ||
                                                            (metric[
                                                                'After GridSearch_24'
                                                            ] >
                                                                metric[
                                                                    'Before Debias'
                                                                ] &&
                                                                metric.Metrics.includes(
                                                                    'ratio'
                                                                ))
                                                                ? 'text-green-400 font-medium'
                                                                : ''
                                                        }
                                                    >
                                                        {formatNumber(
                                                            metric[
                                                                'After GridSearch_24'
                                                            ]
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 border-t border-zinc-800">
                            <div className="flex items-center text-sm text-zinc-400">
                                <LineChart className="h-4 w-4 mr-2" />
                                <span>
                                    Lower values are better for difference
                                    metrics. Higher values (closer to 1) are
                                    better for ratio metrics.
                                </span>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>

            <VersionComparisonModal
                open={comparisonOpen}
                onOpenChange={setComparisonOpen}
                moduleType="Debias Techniques"
            />
        </div>
    )
}
