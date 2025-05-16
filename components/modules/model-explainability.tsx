'use client'

import {
    ChevronLeft,
    ChevronRight,
    Download,
    ExternalLink,
    Home,
    Info,
    RefreshCw
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

// Data for explainability methods
const explainabilityData = {
    'White Box (Saliency Maps)': {
        one_liner:
            'The purpose of the saliency map is to represent the saliency at every location in the visual field by a scalar quantity and to guide the selection of attended locations, based on the spatial distribution of saliency.',
        layer_name: 'block5_conv3',
        img_path: [
            'Whitebox_saliency_maps/misclassified_saliency_maps/miscalssified_saliency_map_18.png',
            'Whitebox_saliency_maps/misclassified_saliency_maps/miscalssified_saliency_map_19.png',
            'Whitebox_saliency_maps/misclassified_saliency_maps/miscalssified_saliency_map_9.png',
            'Whitebox_saliency_maps/misclassified_saliency_maps/miscalssified_saliency_map_8.png',
            'Whitebox_saliency_maps/misclassified_saliency_maps/miscalssified_saliency_map_20.png',
            'Whitebox_saliency_maps/misclassified_saliency_maps/miscalssified_saliency_map_12.png',
            'Whitebox_saliency_maps/misclassified_saliency_maps/miscalssified_saliency_map_6.png',
            'Whitebox_saliency_maps/misclassified_saliency_maps/miscalssified_saliency_map_7.png'
        ]
    },
    'Black Box (LIME)': {
        one_liner:
            'LIME is model-agnostic, meaning that it can be applied to any machine learning model. The technique attempts to understand the model by perturbing the input of data samples and understanding how the predictions change.',
        img_path: [
            'Blackbox_saliency_maps/misclassified_saliency_maps/misclassified_saliency_map_16.png',
            'Blackbox_saliency_maps/misclassified_saliency_maps/misclassified_saliency_map_17.png',
            'Blackbox_saliency_maps/misclassified_saliency_maps/misclassified_saliency_map_15.png',
            'Blackbox_saliency_maps/misclassified_saliency_maps/misclassified_saliency_map_14.png',
            'Blackbox_saliency_maps/misclassified_saliency_maps/misclassified_saliency_map_10.png',
            'Blackbox_saliency_maps/misclassified_saliency_maps/misclassified_saliency_map_11.png',
            'Blackbox_saliency_maps/misclassified_saliency_maps/misclassified_saliency_map_9.png',
            'Blackbox_saliency_maps/misclassified_saliency_maps/misclassified_saliency_map_13.png'
        ]
    }
}

// Custom Image Gallery component
function ImageGallery({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedVersion, setSelectedVersion] = useState('v1')

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        )
    }

    // For demo purposes, we'll use placeholder images
    const placeholderSrc = `https://placehold.co/600x400/3f3f46/ffffff?text=Saliency+Map+${
        currentIndex + 1
    }`

    return (
        <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* In a real app, you would use the actual image paths */}
                    <Image
                        src={placeholderSrc}
                        alt={`Saliency map ${currentIndex + 1}`}
                        width={600}
                        height={400}
                        className="h-full w-full object-contain"
                    />
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-950/80 to-transparent p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-white">
                                Map {currentIndex + 1} of {images.length}
                            </p>
                            <p className="text-xs text-zinc-400 truncate">
                                {images[currentIndex]}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Select
                                value={selectedVersion}
                                onValueChange={setSelectedVersion}
                            >
                                <SelectTrigger className="h-8 w-[120px] border-zinc-700 bg-zinc-800 text-xs">
                                    <SelectValue placeholder="Select Version" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="v1">
                                        Version 1
                                    </SelectItem>
                                    <SelectItem value="v2">
                                        Version 2
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 border-zinc-700 bg-zinc-800"
                                onClick={prevImage}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 border-zinc-700 bg-zinc-800"
                                onClick={nextImage}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {images.slice(0, 5).map((img, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        className={`h-16 w-16 p-0 border-zinc-700 bg-zinc-800 ${
                            index === currentIndex ? 'ring-2 ring-pink-600' : ''
                        }`}
                        onClick={() => setCurrentIndex(index)}
                    >
                        <Image
                            src={`https://placehold.co/100x100/3f3f46/ffffff?text=${
                                index + 1
                            }`}
                            alt={`Thumbnail ${index + 1}`}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                        />
                    </Button>
                ))}
                {images.length > 5 && (
                    <Button
                        variant="outline"
                        className="h-16 w-16 border-zinc-700 bg-zinc-800 text-xs"
                    >
                        +{images.length - 5} more
                    </Button>
                )}
            </div>
        </div>
    )
}

export default function ModelExplainability() {
    const [selectedVersion, setSelectedVersion] = useState('v1')

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
                    <span className="text-white">Model Explainability</span>
                </div>

                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Model Explainability
                        </h1>
                        <p className="mt-1 text-zinc-400">
                            Understand and interpret your AI model's decisions
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

                        <Button className="bg-pink-600 hover:bg-pink-700">
                            Access Module
                        </Button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Badge
                        variant="outline"
                        className="border-zinc-700 bg-zinc-800"
                    >
                        Feature Importance
                    </Badge>
                    <Badge
                        variant="outline"
                        className="border-zinc-700 bg-zinc-800"
                    >
                        SHAP Values
                    </Badge>
                    <Badge
                        variant="outline"
                        className="border-zinc-700 bg-zinc-800"
                    >
                        Attention Maps
                    </Badge>
                    <Badge
                        variant="outline"
                        className="border-zinc-700 bg-zinc-800"
                    >
                        Interpretability
                    </Badge>
                </div>
            </div>

            {/* Module Content */}
            <Tabs defaultValue="white-box" className="w-full">
                <TabsList className="mb-6 w-full justify-start bg-transparent p-0">
                    <TabsTrigger
                        value="white-box"
                        className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
                    >
                        White Box (Saliency Maps)
                    </TabsTrigger>
                    <TabsTrigger
                        value="black-box"
                        className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
                    >
                        Black Box (LIME)
                    </TabsTrigger>
                    <TabsTrigger
                        value="feature-importance"
                        className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
                    >
                        Feature Importance
                    </TabsTrigger>
                    <TabsTrigger
                        value="shap"
                        className="rounded-md data-[state=active]:bg-pink-600 data-[state=active]:text-white"
                    >
                        SHAP Analysis
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="white-box" className="mt-0">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <Card className="border-zinc-800 bg-zinc-900">
                                <CardHeader className="border-b border-zinc-800 pb-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg font-medium text-white">
                                                White Box Explainability:
                                                Saliency Maps
                                            </CardTitle>
                                            <CardDescription>
                                                Visualization of CNN layer:{' '}
                                                {
                                                    explainabilityData[
                                                        'White Box (Saliency Maps)'
                                                    ].layer_name
                                                }
                                            </CardDescription>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 border-zinc-700 bg-zinc-800"
                                        >
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            View Full Gallery
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <ImageGallery
                                        images={
                                            explainabilityData[
                                                'White Box (Saliency Maps)'
                                            ].img_path
                                        }
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        <div>
                            <Card className="border-zinc-800 bg-zinc-900">
                                <CardHeader className="border-b border-zinc-800 pb-3">
                                    <CardTitle className="text-lg font-medium text-white">
                                        What are Saliency Maps?
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <p className="text-zinc-400">
                                        {
                                            explainabilityData[
                                                'White Box (Saliency Maps)'
                                            ].one_liner
                                        }
                                    </p>

                                    <div className="mt-4 rounded-md border border-zinc-800 bg-zinc-950 p-3">
                                        <div className="flex items-start gap-3">
                                            <div className="rounded-full bg-pink-600/10 p-2">
                                                <Info className="h-4 w-4 text-pink-600" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-white">
                                                    How to Interpret
                                                </h4>
                                                <p className="mt-1 text-xs text-zinc-400">
                                                    Bright areas in the saliency
                                                    maps highlight regions that
                                                    strongly influence the
                                                    model's prediction. By
                                                    examining these regions, you
                                                    can understand what features
                                                    the model focuses on when
                                                    making decisions.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-white mb-2">
                                            Benefits
                                        </h4>
                                        <ul className="space-y-2 text-sm text-zinc-400">
                                            <li className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 rounded-full bg-pink-600"></span>
                                                <span>
                                                    Provides direct insight into
                                                    CNN's decision process
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 rounded-full bg-pink-600"></span>
                                                <span>
                                                    Helps identify model biases
                                                    and focus areas
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 rounded-full bg-pink-600"></span>
                                                <span>
                                                    Allows for targeted model
                                                    improvements
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="black-box" className="mt-0">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <Card className="border-zinc-800 bg-zinc-900">
                                <CardHeader className="border-b border-zinc-800 pb-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg font-medium text-white">
                                                Black Box Explainability: LIME
                                            </CardTitle>
                                            <CardDescription>
                                                Local Interpretable
                                                Model-agnostic Explanations
                                            </CardDescription>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 border-zinc-700 bg-zinc-800"
                                        >
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            View Full Gallery
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <ImageGallery
                                        images={
                                            explainabilityData[
                                                'Black Box (LIME)'
                                            ].img_path
                                        }
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        <div>
                            <Card className="border-zinc-800 bg-zinc-900">
                                <CardHeader className="border-b border-zinc-800 pb-3">
                                    <CardTitle className="text-lg font-medium text-white">
                                        What is LIME?
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <p className="text-zinc-400">
                                        {
                                            explainabilityData[
                                                'Black Box (LIME)'
                                            ].one_liner
                                        }
                                    </p>

                                    <div className="mt-4 rounded-md border border-zinc-800 bg-zinc-950 p-3">
                                        <div className="flex items-start gap-3">
                                            <div className="rounded-full bg-pink-600/10 p-2">
                                                <Info className="h-4 w-4 text-pink-600" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-white">
                                                    How to Interpret
                                                </h4>
                                                <p className="mt-1 text-xs text-zinc-400">
                                                    LIME generates explanations
                                                    by highlighting image
                                                    superpixels that contribute
                                                    positively (green) or
                                                    negatively (red) to the
                                                    predicted class. These
                                                    visualizations help
                                                    understand what parts of the
                                                    image drive the model's
                                                    decisions.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-white mb-2">
                                            Advantages
                                        </h4>
                                        <ul className="space-y-2 text-sm text-zinc-400">
                                            <li className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 rounded-full bg-pink-600"></span>
                                                <span>
                                                    Model-agnostic - works with
                                                    any black box model
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 rounded-full bg-pink-600"></span>
                                                <span>
                                                    Provides local explanations
                                                    for individual predictions
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 rounded-full bg-pink-600"></span>
                                                <span>
                                                    Easy to understand visual
                                                    representations
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="feature-importance" className="mt-0">
                    <Card className="border-zinc-800 bg-zinc-900">
                        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                            <div className="mb-6 rounded-full bg-zinc-800 p-6">
                                <div className="h-16 w-16 rounded-full bg-pink-600 p-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-full w-full text-white"
                                    >
                                        <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path>
                                        <line
                                            x1="2"
                                            y1="20"
                                            x2="2"
                                            y2="20"
                                        ></line>
                                    </svg>
                                </div>
                            </div>
                            <h2 className="mb-2 text-2xl font-bold">
                                Feature Importance Analysis
                            </h2>
                            <p className="mb-6 max-w-md text-zinc-400">
                                This module will help you understand which
                                features have the most influence on your model's
                                predictions.
                            </p>
                            <Button className="bg-pink-600 hover:bg-pink-700">
                                Coming Soon
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="shap" className="mt-0">
                    <Card className="border-zinc-800 bg-zinc-900">
                        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                            <div className="mb-6 rounded-full bg-zinc-800 p-6">
                                <div className="h-16 w-16 rounded-full bg-pink-600 p-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-full w-full text-white"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                        <line
                                            x1="12"
                                            y1="17"
                                            x2="12.01"
                                            y2="17"
                                        ></line>
                                    </svg>
                                </div>
                            </div>
                            <h2 className="mb-2 text-2xl font-bold">
                                SHAP Value Analysis
                            </h2>
                            <p className="mb-6 max-w-md text-zinc-400">
                                SHAP (SHapley Additive exPlanations) values
                                provide a unified measure of feature importance,
                                helping you understand individual predictions.
                            </p>
                            <Button className="bg-pink-600 hover:bg-pink-700">
                                Coming Soon
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
