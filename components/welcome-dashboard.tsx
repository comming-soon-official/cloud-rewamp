import {
    ArrowRight,
    BarChart3,
    Database,
    LineChart,
    Plus,
    RefreshCw,
    Shield
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function WelcomeDashboard() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Welcome to AiEnsured
                    </h1>
                    <p className="mt-1 text-zinc-400">
                        Your AI security and model diagnostics platform
                    </p>
                </div>
                <Button className="bg-pink-600 hover:bg-pink-700">
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="border-zinc-800 bg-zinc-900">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium text-white">
                            Bias and Debias Techniques
                        </CardTitle>
                        <CardDescription>
                            Summaries of bias detection and debias methods
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                {
                                    name: 'Data Distribution Analysis',
                                    date: 'Last checked: 2 hours ago',
                                    type: 'Bias Detection'
                                },
                                {
                                    name: 'Fairness Constraints',
                                    date: 'Last applied: yesterday',
                                    type: 'Debias Method'
                                },
                                {
                                    name: 'Adversarial Debiasing',
                                    date: 'Last updated: 3 days ago',
                                    type: 'Debias Method'
                                }
                            ].map((project, i) => (
                                <div
                                    key={i}
                                    className="flex cursor-pointer items-center justify-between rounded-md border border-zinc-800 bg-zinc-950 p-3 transition-colors hover:border-zinc-700"
                                >
                                    <div>
                                        <div className="font-medium text-white">
                                            {project.name}
                                        </div>
                                        <div className="text-xs text-zinc-400">
                                            {project.date}
                                        </div>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className="bg-zinc-800"
                                    >
                                        {project.type}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="mt-3 w-full justify-between"
                        >
                            <span className="text-white">
                                View all bias techniques
                            </span>
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border-zinc-800 bg-zinc-900">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium text-white">
                            Quick Actions
                        </CardTitle>
                        <CardDescription>
                            Common tasks and shortcuts
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                {
                                    name: 'Data Diagnostic',
                                    icon: <Database className="h-5 w-5" />
                                },
                                {
                                    name: 'Model Pipeline',
                                    icon: <LineChart className="h-5 w-5" />
                                },
                                {
                                    name: 'Explainability',
                                    icon: <BarChart3 className="h-5 w-5" />
                                },
                                {
                                    name: 'Attack Vectors',
                                    icon: <Shield className="h-5 w-5" />
                                }
                            ].map((action, i) => (
                                <div
                                    key={i}
                                    className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 p-4 text-center transition-colors hover:border-zinc-700"
                                >
                                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-pink-600/10">
                                        <div className="text-pink-600">
                                            {action.icon}
                                        </div>
                                    </div>
                                    <div className="text-sm font-medium text-white">
                                        {action.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-zinc-800 bg-zinc-900">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium text-white">
                            System Status
                        </CardTitle>
                        <CardDescription>
                            Current system performance
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="mb-1 flex items-center justify-between">
                                    <span className="text-sm font-medium text-white">
                                        API Status
                                    </span>
                                    <Badge className="bg-green-600">
                                        Operational
                                    </Badge>
                                </div>
                                <div className="h-2 rounded-full bg-zinc-800">
                                    <div className="h-2 w-[98%] rounded-full bg-green-600"></div>
                                </div>
                                <div className="mt-1 text-xs text-zinc-400">
                                    98% uptime in the last 30 days
                                </div>
                            </div>

                            <div>
                                <div className="mb-1 flex items-center justify-between">
                                    <span className="text-sm font-medium text-white">
                                        Model Processing
                                    </span>
                                    <Badge className="bg-yellow-600">
                                        High Load
                                    </Badge>
                                </div>
                                <div className="h-2 rounded-full bg-zinc-800">
                                    <div className="h-2 w-[76%] rounded-full bg-yellow-600"></div>
                                </div>
                                <div className="mt-1 text-xs text-zinc-400">
                                    76% of capacity currently in use
                                </div>
                            </div>

                            <div>
                                <div className="mb-1 flex items-center justify-between">
                                    <span className="text-sm font-medium text-white">
                                        Storage
                                    </span>
                                    <Badge className="bg-blue-600">
                                        Normal
                                    </Badge>
                                </div>
                                <div className="h-2 rounded-full bg-zinc-800">
                                    <div className="h-2 w-[42%] rounded-full bg-blue-600"></div>
                                </div>
                                <div className="mt-1 text-xs text-zinc-400">
                                    42% of storage used (3.2TB/7.5TB)
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-2 w-full"
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                <span className="text-white">
                                    Refresh Status
                                </span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-zinc-800 bg-zinc-900">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-medium text-white">
                                Analytics Overview
                            </CardTitle>
                            <CardDescription>
                                Summary of bias detection and mitigation metrics
                            </CardDescription>
                        </div>
                        <Tabs defaultValue="week" className="w-[240px]">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="day">Day</TabsTrigger>
                                <TabsTrigger value="week">Week</TabsTrigger>
                                <TabsTrigger value="month">Month</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                name: 'Protected Attributes',
                                value: '8',
                                change: '+2',
                                up: true,
                                neutral: true
                            },
                            {
                                name: 'Bias Alerts',
                                value: '5',
                                change: '+3',
                                up: true,
                                bad: true
                            },
                            {
                                name: 'Fairness Score',
                                value: '82.3%',
                                change: '+4.6%',
                                up: true,
                                good: true
                            },
                            {
                                name: 'Attribute Disparities',
                                value: '3',
                                change: '-2',
                                up: false,
                                good: true
                            }
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="rounded-md border border-zinc-800 bg-zinc-950 p-4"
                            >
                                <div className="text-sm font-medium text-zinc-400">
                                    {stat.name}
                                </div>
                                <div className="mt-1 text-3xl font-bold text-white">
                                    {stat.value}
                                </div>
                                <div
                                    className={`mt-1 flex items-center text-sm ${
                                        stat.neutral
                                            ? 'text-blue-400'
                                            : stat.good
                                            ? 'text-green-400'
                                            : 'text-red-400'
                                    }`}
                                >
                                    {stat.change}{' '}
                                    <span className="ml-1 text-xs text-zinc-400">
                                        {stat.up ? 'increase' : 'decrease'} from
                                        last assessment
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 h-[300px] rounded-md border border-zinc-800 bg-zinc-950 p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-medium text-white">
                                Bias Mitigation Trends
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-pink-600"></div>
                                    <span className="text-sm text-zinc-400">
                                        Fairness Score
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                                    <span className="text-sm text-zinc-400">
                                        Bias Alerts
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-purple-600"></div>
                                    <span className="text-sm text-zinc-400">
                                        Attribute Disparities
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[240px] rounded bg-zinc-900">
                            {/* This would be a chart component in a real implementation */}
                            <div className="flex h-full items-center justify-center">
                                <div className="text-center text-zinc-400">
                                    <p className="text-white">
                                        Bias mitigation trend visualization
                                    </p>
                                    <p className="text-sm">
                                        (Chart would be rendered here)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
