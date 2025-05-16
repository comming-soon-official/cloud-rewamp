"use client"

import { useState } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import MainNavigation from "@/components/main-navigation"
import Header from "@/components/header"
import DataDiagnostic from "@/components/modules/data-diagnostic"
import ModelingPipeline from "@/components/modules/modeling-pipeline"
import ModelExplainability from "@/components/modules/model-explainability"
import AttackVectors from "@/components/modules/attack-vectors"
import MetamorphicTesting from "@/components/modules/metamorphic-testing"
import FeedbackLoop from "@/components/modules/feedback-loop"
import ModelPrivacy from "@/components/modules/model-privacy"
import ModelQuantization from "@/components/modules/model-quantization"
import PerformanceTesting from "@/components/modules/performance-testing"
import WelcomeDashboard from "@/components/welcome-dashboard"
import { cn } from "@/lib/utils"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="dark flex h-screen flex-col bg-background text-foreground">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <MainNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        <main
          className={cn(
            "flex-1 overflow-auto transition-all duration-300 ease-in-out",
            sidebarCollapsed ? "ml-[70px]" : "ml-[250px]",
          )}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsContent value="home" className="h-full data-[state=active]:flex data-[state=active]:flex-col">
              <WelcomeDashboard />
            </TabsContent>

            <TabsContent
              value="data-diagnostic"
              className="h-full data-[state=active]:flex data-[state=active]:flex-col"
            >
              <DataDiagnostic />
            </TabsContent>

            <TabsContent
              value="modeling-pipeline"
              className="h-full data-[state=active]:flex data-[state=active]:flex-col"
            >
              <ModelingPipeline />
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

            <TabsContent value="feedback-loop" className="h-full data-[state=active]:flex data-[state=active]:flex-col">
              <FeedbackLoop />
            </TabsContent>

            <TabsContent value="model-privacy" className="h-full data-[state=active]:flex data-[state=active]:flex-col">
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
