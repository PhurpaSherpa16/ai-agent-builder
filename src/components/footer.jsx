import React from 'react'
import useAgents from '../hooks/useAgents'
import { formatTime } from '../utils/utils'
import { Bot, Activity, PauseCircle, ArrowUpCircle, ArrowDownCircle } from 'lucide-react'

export default function Footer() {
    const { agents, loading } = useAgents()

    const getRunningTime = (agent) => {
        if(agent.isRunning && agent.startTime){
          return (agent.totalTime || 0) + (Date.now() - agent.startTime)
        }
        return agent.totalTime || 0
    }

    const stats = React.useMemo(() => {
        if (!agents || agents.length === 0) return { total: 0, active: 0, inactive: 0, max: 0, average: 0 }
        
        const uptimes = agents.map(a => getRunningTime(a))
        return {
            total: agents.length,
            active: agents.filter(a => a.isRunning).length,
            inactive: agents.filter(a => !a.isRunning).length,
            max: Math.max(...uptimes),
            total_uptime: uptimes.reduce((a, b) => a + b, 0),
            average: uptimes.reduce((a, b) => a + b, 0) / agents.length
        }
    }, [agents])

  return (
    <footer className='fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] h-20 flex items-center px-6'>
        <div className='max-w-7xl mx-auto w-full'>
            {loading ? (
                <FooterSkeleton />
            ) : (
                <div className='flex items-center justify-center gap-2 md:gap-8 overflow-x-auto no-scrollbar'>
                    <StatItem icon={Bot} label="Total Agents" value={stats.total} colorClass="bg-indigo-100 text-indigo-600" />
                    <div className='w-px h-8 bg-gray-100 hidden md:block'/>
                    <StatItem icon={Activity} label="Active" value={stats.active} colorClass="bg-green-100 text-green-600" />
                    <StatItem icon={PauseCircle} label="Inactive" value={stats.inactive} colorClass="bg-gray-100 text-gray-500" />
                    <div className='w-px h-8 bg-gray-100 hidden md:block'/>
                    <StatItem icon={ArrowUpCircle} label="Max Uptime" value={formatTime(stats.max)} colorClass="bg-blue-100 text-blue-600" />
                    <StatItem icon={ArrowDownCircle} label="Average Uptime" value={formatTime(stats.average)} colorClass="bg-orange-100 text-orange-600" />
                </div>
            )}
        </div>
    </footer>
  )
}

const StatItem = ({ icon: Icon, label, value, colorClass }) => (
    <div className='flex items-center gap-3 px-4 py-2 hover:bg-gray-50/50 rounded-xl transition-colors'>
        <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10`}>
            <Icon size={18} className={colorClass.replace('bg-', 'text-')} />
        </div>
        <div className='flex flex-col'>
            <span className='text-[10px] font-bold text-gray-400 uppercase tracking-wider'>{label}</span>
            <span className='text-sm font-bold text-gray-700 leading-none'>{value}</span>
        </div>
    </div>
)

const FooterSkeleton = () => (
    <div className='flex items-center justify-center gap-8 py-2 overflow-x-auto'>
        {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className='flex items-center gap-3 animate-pulse px-4 border-r border-gray-100 last:border-0'>
                <div className='size-9 bg-gray-100 rounded-xl'/>
                <div className='space-y-1.5'>
                    <div className='h-2 w-12 bg-gray-100 rounded'/>
                    <div className='h-3 w-16 bg-gray-100 rounded'/>
                </div>
            </div>
        ))}
    </div>
)