'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

import Header from '@/components/header'
import MainNavigation from '@/components/main-navigation'
import AttackVectors from '@/components/modules/attack-vectors'
import DataDiagnostic from '@/components/modules/data-diagnostic'
import FeedbackLoop from '@/components/modules/feedback-loop'
import MetamorphicTesting from '@/components/modules/metamorphic-testing'
import ModelExplainability from '@/components/modules/model-explainability'
import ModelPrivacy from '@/components/modules/model-privacy'
import ModelQuantization from '@/components/modules/model-quantization'
import ModelingPipeline from '@/components/modules/modeling-pipeline'
import PerformanceTesting from '@/components/modules/performance-testing'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import WelcomeDashboard from '@/components/welcome-dashboard'
import { cn } from '@/lib/utils'

import BiasTechniques from './modules/bias-techniques'
import DebiasTechniques from './modules/debias-techniques'

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('home')
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    return (
        <div className="dark flex h-screen flex-col bg-background text-foreground">
            <Header />
            <div className="flex flex-1 overflow-hidden relative">
                <MainNavigation
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    collapsed={sidebarCollapsed}
                    setCollapsed={setSidebarCollapsed}
                />

                {/* Sidebar toggle button */}
                <button
                    onClick={toggleSidebar}
                    className={`absolute z-10 top-4 transition-all duration-300 ease-in-out bg-primary/10 hover:bg-primary/20 p-1 rounded-full shadow-md border border-border ${
                        sidebarCollapsed ? 'left-[54px]' : 'left-[234px]'
                    }`}
                    aria-label={
                        sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
                    }
                >
                    {sidebarCollapsed ? (
                        <ChevronRight className="h-4 w-4 text-pink-600" />
                    ) : (
                        <ChevronLeft className="h-4 w-4 text-pink-600" />
                    )}
                </button>

                <main
                    className={cn(
                        'flex-1 overflow-auto transition-all duration-300 ease-in-out',
                        sidebarCollapsed ? 'ml-[70px]' : 'ml-[250px]'
                    )}
                >
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="h-full"
                    >
                        <TabsContent
                            value="home"
                            className="h-full data-[state=active]:flex data-[state=active]:flex-col"
                        >
                            <WelcomeDashboard />
                        </TabsContent>

                        <TabsContent
                            value="data-diagnostic"
                            className="h-full data-[state=active]:flex data-[state=active]:flex-col"
                        >
                            <BiasTechniques />
                        </TabsContent>

                        <TabsContent
                            value="modeling-pipeline"
                            className="h-full data-[state=active]:flex data-[state=active]:flex-col"
                        >
                            <DebiasTechniques />
                        </TabsContent>

                        <TabsContent
                            value="model-explainability"
                            className="h-full data-[state=active]:flex data-[state=active]:flex-col"
                        >
                            <ModelExplainability />
                        </TabsContent>

                        <TabsContent
                            value="attack-vectors"
                            className="h-full data-[state=active]:flex data-[state=active]:flex-col"
                        >
                            <AttackVectors />
                        </TabsContent>

                        <TabsContent
                            value="metamorphic-testing"
                            className="h-full data-[state=active]:flex data-[state=active]:flex-col"
                        >
                            <MetamorphicTesting />
                        </TabsContent>

                        <TabsContent
                            value="feedback-loop"
                            className="h-full data-[state=active]:flex data-[state=active]:flex-col"
                        >
                            <FeedbackLoop />
                        </TabsContent>

                        <TabsContent
                            value="model-privacy"
                            className="h-full data-[state=active]:flex data-[state=active]:flex-col"
                        >
                            <ModelPrivacy />
                        </TabsContent>

                        <TabsContent
                            value="model-quantization"
                            className="h-full data-[state=active]:flex data-[state=active]:flex-col"
                        >
                            <ModelQuantization />
                        </TabsContent>

                        <TabsContent
                            value="performance-testing"
                            className="h-full data-[state=active]:flex data-[state=active]:flex-col"
                        >
                            <PerformanceTesting />
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    )
}
