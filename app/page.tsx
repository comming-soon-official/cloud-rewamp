import type { Metadata } from 'next'
import Dashboard from '@/components/dashboard'

export const metadata: Metadata = {
    title: 'AiEnsured AI Security Suite',
    description: 'Advanced AI security and model diagnostics platform'
}

export default function Home() {
    return <Dashboard />
}
