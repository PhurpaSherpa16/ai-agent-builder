import React, { useEffect, useState } from 'react'
import { formatTime } from '../utils/utils'
import { Play, Pause, RotateCcw } from 'lucide-react'
import ConfirmationModal from './confirmation_modal'

export default function SessionPlayer({item, handleStart, handleStop, handleReset, getRunningTime}) {
    const [runningTime, setRunningTime] = useState(getRunningTime(item))

    useEffect(() => {
        let interval;
        if (item.isRunning) {
            interval = setInterval(() => {
                setRunningTime(getRunningTime(item));
            }, 1000);
        } else {
            setRunningTime(getRunningTime(item));
        }
        return () => clearInterval(interval);
    }, [item.isRunning, item.totalTime, item.startTime, getRunningTime])

    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  return (
    <div className="flex items-start justify-between">
        <div className="flex h-10 items-center justify-center gap-2">
                {item.isRunning ? (
                    <button onClick={() => setIsConfirmOpen(true)} className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-red-100 transition-colors shadow-sm" title="Stop Timer">
                        <Pause size={16} />
                    </button>
                ) : (
                    <button onClick={() => handleStart(item)} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-green-100 transition-colors shadow-sm" title="Start Timer">
                        <Play size={16} />
                    </button>
                )}
            <button onClick={() => handleReset(item)} className="p-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors shadow-sm" title="Reset Timer">
                <RotateCcw size={16} />
            </button>
        </div>

        <div className="relative flex items-center justify-center">
                {item.isRunning && <div className='size-10 bg-green-600/20 rounded-full absolute animate-ping'/>}

            <div className='relative z-20'>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Uptime</span>
                <p className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                    {formatTime(runningTime)}
                </p>
            </div>
        </div>
    
        {/* Confirmation Modal */}
        {isConfirmOpen && (
            <ConfirmationModal title="Stop Timer" message="Are you sure you want to stop this timer?"
                handleConfirm={() => {
                    handleStop(item)
                    setIsConfirmOpen(false)
                }}
                handleCancel={() => setIsConfirmOpen(false)}
            />
        )}

    </div>
  )
}