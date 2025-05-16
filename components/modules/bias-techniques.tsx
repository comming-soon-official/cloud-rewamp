'use client'

import { AlertTriangle, ChevronRight, Home, Info } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Tooltip as UITooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'
import VersionComparisonModal from '@/components/version-comparison-modal'

export default function BiasTechniques() {
    const [comparisonOpen, setComparisonOpen] = useState(false)
    const [selectedVersion, setSelectedVersion] = useState('v1')

    // Data from API response
    const biasData = {
        'Bias Techniques': {
            one_liner:
                "Bias indentification helps to determine the relative significance of the inputs to a black-box predictive model in order to assess the model's fairness.It leverages model compression and four input ranking algorithms to quantify a model's relative predictive dependence on its inputs.",
            img_path: [
                'https://s3.ap-south-1.amazonaws.com/ai.datasets/bias_demo/structured/Results_Vehicle_insurance/bias/bias_measure_plot.jpg',
                'https://s3.ap-south-1.amazonaws.com/ai.datasets/bias_demo/structured/Results_Vehicle_insurance/bias/before debias.jpg'
            ]
        },
        'Bias Attributes': {
            'Max Bias feature': 'Gender',
            'Min Bias feature': 'Vehicle_Damage'
        }
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
                    <span className="text-white">Bias Techniques</span>
                </div>

                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            Bias Identification & Measurement
                        </h1>
                        <p className="mt-1 text-zinc-400 max-w-2xl">
                            {biasData['Bias Techniques'].one_liner}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                    <Badge
                        variant="outline"
                        className="border-zinc-700 bg-zinc-800"
                    >
                        Feature Attribution
                    </Badge>
                    <Badge
                        variant="outline"
                        className="border-zinc-700 bg-zinc-800"
                    >
                        Model Fairness
                    </Badge>
                    <Badge
                        variant="outline"
                        className="border-pink-700 bg-pink-900/30 text-pink-300"
                    >
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        High Bias on{' '}
                        {biasData['Bias Attributes']['Max Bias feature']}
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
                        value="visualization"
                        className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
                    >
                        Visualizations
                    </TabsTrigger>
                    <TabsTrigger
                        value="mitigation"
                        className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
                    >
                        Mitigation
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-0">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <Card className="col-span-2 border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950">
                            <CardHeader className="border-b border-zinc-800 pb-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg font-medium text-white">
                                            Bias Analysis Summary
                                        </CardTitle>
                                        <CardDescription>
                                            Understanding bias in the model
                                        </CardDescription>
                                    </div>
                                    <TooltipProvider>
                                        <UITooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <Info className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="max-w-xs">
                                                    Bias analysis summary
                                                    information
                                                </p>
                                            </TooltipContent>
                                        </UITooltip>
                                    </TooltipProvider>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="text-sm text-zinc-300 p-4 bg-zinc-800/50 rounded-md">
                                    <p className="leading-relaxed">
                                        {biasData['Bias Techniques'].one_liner}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex flex-col gap-6">
                            <Card className="border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950">
                                <CardHeader className="border-b border-zinc-800 pb-3">
                                    <CardTitle className="text-lg font-medium text-white">
                                        Key Bias Attributes
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-5">
                                    <div className="space-y-6">
                                        <div className="rounded-md bg-pink-950/20 border border-pink-900/40 p-4">
                                            <div className="mb-2 flex justify-between">
                                                <span className="font-medium text-pink-300">
                                                    Maximum Bias
                                                </span>
                                                <span className="font-bold text-white">
                                                    {
                                                        biasData[
                                                            'Bias Attributes'
                                                        ]['Max Bias feature']
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                        <div className="rounded-md bg-blue-950/20 border border-blue-900/40 p-4">
                                            <div className="mb-2 flex justify-between">
                                                <span className="font-medium text-blue-300">
                                                    Minimum Bias
                                                </span>
                                                <span className="font-bold text-white">
                                                    {
                                                        biasData[
                                                            'Bias Attributes'
                                                        ]['Min Bias feature']
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="visualization" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {biasData['Bias Techniques'].img_path.map(
                            (img, index) => (
                                <Card
                                    key={index}
                                    className="border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950"
                                >
                                    <CardHeader className="border-b border-zinc-800">
                                        <CardTitle className="text-white">
                                            {index === 0
                                                ? 'Bias Measure Plot'
                                                : 'Before Debiasing'}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="relative w-full aspect-square">
                                            <Image
                                                src={`${img}`}
                                                alt={
                                                    index === 0
                                                        ? 'Bias measure plot'
                                                        : 'Before debiasing visualization'
                                                }
                                                fill
                                                // className="object-cover"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="mitigation" className="mt-0">
                    <Card className="border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950">
                        <CardHeader className="border-b border-zinc-800">
                            <CardTitle className="text-white">
                                Bias Mitigation Options
                            </CardTitle>
                            <CardDescription>
                                Available techniques to reduce identified bias
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="py-4">
                            <div className="text-center p-10 text-zinc-400">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-zinc-800 flex items-center justify-center">
                                    <AlertTriangle className="h-10 w-10 text-amber-500" />
                                </div>
                                <h3 className="text-xl font-medium text-white mb-3">
                                    No Mitigation Applied
                                </h3>
                                <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
                                    Bias mitigation techniques have not been
                                    applied yet.
                                </p>
                                <Button className="bg-pink-600 hover:bg-pink-700">
                                    Begin Mitigation Process
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <VersionComparisonModal
                open={comparisonOpen}
                onOpenChange={setComparisonOpen}
                moduleType="Bias Techniques"
            />
        </div>
    )
}
