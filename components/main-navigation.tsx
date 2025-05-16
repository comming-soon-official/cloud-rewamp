'use client'

import type React from 'react'
import {
    ChevronLeft,
    ChevronRight,
    Database,
    Home,
    LineChart,
    Lock
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface MainNavigationProps {
    activeTab: string
    setActiveTab: (tab: string) => void
    collapsed: boolean
    setCollapsed: (collapsed: boolean) => void
}

interface NavItemProps {
    id: string
    label: string
    icon: React.ReactNode
    active: boolean
    onClick: () => void
    disabled?: boolean
    beta?: boolean
    collapsed: boolean
}

function NavItem({
    id,
    label,
    icon,
    active,
    onClick,
    disabled,
    beta,
    collapsed
}: NavItemProps) {
    const content = (
        <div
            className={cn(
                'group flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-all',
                active
                    ? 'bg-pink-600 text-white'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white',
                disabled &&
                    'cursor-not-allowed opacity-60 hover:bg-transparent hover:text-zinc-400'
            )}
            onClick={disabled ? undefined : onClick}
        >
            <div className="flex h-6 w-6 items-center justify-center">
                {icon}
            </div>
            {!collapsed && (
                <div className="flex flex-1 items-center justify-between">
                    <span className="text-sm font-medium">{label}</span>
                    {beta && (
                        <Badge
                            variant="outline"
                            className="border-pink-800/30 text-pink-400 text-[10px]"
                        >
                            BETA
                        </Badge>
                    )}
                    {disabled && <Lock className="h-3.5 w-3.5 text-zinc-500" />}
                </div>
            )}
        </div>
    )

    if (collapsed && !disabled) {
        return (
            <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>{content}</TooltipTrigger>
                    <TooltipContent
                        side="right"
                        className="flex items-center gap-2 bg-zinc-900 text-white"
                    >
                        {label}
                        {beta && (
                            <Badge
                                variant="outline"
                                className="border-pink-800/30 text-pink-400 text-[10px]"
                            >
                                BETA
                            </Badge>
                        )}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }

    return content
}

export default function MainNavigation({
    activeTab,
    setActiveTab,
    collapsed,
    setCollapsed
}: MainNavigationProps) {
    const navItems = [
        {
            id: 'home',
            label: 'Home',
            icon: <Home className="h-5 w-5" />,
            disabled: false,
            beta: false
        },
        {
            id: 'data-diagnostic',
            label: 'Bias Techniques',
            icon: <Database className="h-5 w-5" />,
            disabled: false,
            beta: false
        },
        {
            id: 'modeling-pipeline',
            label: 'Debias Techniques',
            icon: <LineChart className="h-5 w-5" />,
            disabled: false,
            beta: false
        }
    ]

    return (
        <div
            className={cn(
                'fixed left-0 top-16 h-[calc(100vh-4rem)] border-r border-zinc-800 bg-black transition-all duration-300 ease-in-out',
                collapsed ? 'w-[70px]' : 'w-[250px]'
            )}
        >
            <div className="flex h-full flex-col justify-between p-3">
                <div className="space-y-1">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.id}
                            id={item.id}
                            label={item.label}
                            icon={item.icon}
                            active={activeTab === item.id}
                            onClick={() => setActiveTab(item.id)}
                            disabled={item.disabled}
                            beta={item.beta}
                            collapsed={collapsed}
                        />
                    ))}
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    className="justify-center text-zinc-400"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? (
                        <ChevronRight className="h-5 w-5" />
                    ) : (
                        <ChevronLeft className="h-5 w-5" />
                    )}
                </Button>
            </div>
        </div>
    )
}
