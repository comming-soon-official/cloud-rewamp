'use client'

import { Bell, HelpCircle, Search, Settings } from 'lucide-react'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

export default function Header() {
    const [searchOpen, setSearchOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-zinc-800 bg-black px-6">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8">
                        <div className="absolute inset-0 rounded-full bg-pink-600"></div>
                        <div className="absolute inset-[2px] flex items-center justify-center rounded-full bg-black text-lg font-bold">
                            <span className="text-pink-600">C</span>
                        </div>
                    </div>
                    <h1 className="text-xl font-bold">
                        <span className="text-white">AiEnsured</span>
                    </h1>
                    <Badge
                        variant="outline"
                        className="ml-1 border-pink-800/30 text-pink-400"
                    >
                        AI Security Suite
                    </Badge>
                </div>

                {searchOpen ? (
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <Input
                            className="w-80 bg-zinc-900 pl-10 text-sm"
                            placeholder="Search modules, metrics, or documentation..."
                            autoFocus
                            onBlur={() => setSearchOpen(false)}
                        />
                    </div>
                ) : (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2 text-zinc-400"
                        onClick={() => setSearchOpen(true)}
                    >
                        <Search className="h-4 w-4" />
                        <span>Search</span>
                    </Button>
                )}
            </div>

            <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                        >
                            <Bell className="h-5 w-5 text-zinc-400" />
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-pink-600"></span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="max-h-80 overflow-auto">
                            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                                <div className="flex w-full justify-between">
                                    <span className="font-medium">
                                        Model Training Complete
                                    </span>
                                    <span className="text-xs text-zinc-400">
                                        2h ago
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-400">
                                    Your model "DeepFake Detector v2" has
                                    completed training.
                                </p>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                                <div className="flex w-full justify-between">
                                    <span className="font-medium">
                                        Security Alert
                                    </span>
                                    <span className="text-xs text-zinc-400">
                                        5h ago
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-400">
                                    Potential vulnerability detected in model
                                    deployment.
                                </p>
                            </DropdownMenuItem>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="icon">
                    <HelpCircle className="h-5 w-5 text-zinc-400" />
                </Button>

                <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5 text-zinc-400" />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="flex items-center gap-2 px-2"
                        >
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                <AvatarFallback className="bg-zinc-800 text-zinc-200">
                                    JD
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start text-sm">
                                <span className="font-medium">John Doe</span>
                                <span className="text-xs text-zinc-400">
                                    Admin
                                </span>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
