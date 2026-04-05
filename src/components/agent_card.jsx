import { useState, useEffect } from 'react'
import { Eye, Edit3, Trash2, User, Shield, Bot, EllipsisVertical, Loader2, Play, Pause, RotateCcw } from 'lucide-react'
import { formatTime, getIcons } from '../utils/utils'
import SessionPlayer from './session_player';
import Menus from './menus';

export default function AgentCard({item, index, handleEdit, handleDelete, handleView, isSelected, setIsSelected, deletingId, loading, handleStart, handleStop, handleReset, getRunningTime}) {

  return (
    <div className='group relative bg-white border border-gray-200/60 overflow-hidden rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300'>
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-indigo-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"/>
        
        <div className="relative flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100 group-hover:bg-indigo-700 transition-colors">
                <Bot size={24} />
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{item.name}</h3>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                    {getIcons(item.profile?.name, 'size-4')}
                    <span className="capitalize">{item.profile?.name || item.profile || "Assistant"}</span>
                </p>
            </div>
        </div>

        <div className="relative flex flex-wrap items-center gap-4 mb-6">
            <div className="flex -space-x-2">
                {item.skills && item.skills.slice(0, 1).map((skill, i) => (
                    <div key={i} className="px-3 flex items-center gap-1 py-1 bg-gray-100 border-2 border-white rounded-full text-xs font-semibold text-gray-700 capitalize shadow-sm">
                        {getIcons(skill.name)}
                        {skill?.name?.split(" ")[0] || skill}...
                    </div>
                ))}
                {item.skills && item.skills.length > 2 && (
                    <div className="px-3 py-1 bg-gray-100 border-2 h-fit border-white rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                        +{item?.skills.length - 2}
                    </div>
                )}
            </div>
            {item.provider && (
                <div className="flex items-center gap-1.5 px-3 overflow-hidden py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100 capitalize">
                    {getIcons(item?.provider)}
                    {item?.provider}
                </div>
            )}
        </div>
        
        {/* deleting */}
        {(deletingId === item.originalIndex) && (
        <div className='bg-red-100/60 backdrop-blur h-full w-full absolute top-0 left-0 z-50 flex items-center justify-center'>
            <p className='flex items-center gap-2 text-lg'>
                Deleting...
                <Loader2 className='animate-spin text-red-600'/>
            </p>
        </div>
        )}

        <Menus isSelected={isSelected} setIsSelected={setIsSelected} item={item} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete}/>

        <SessionPlayer item={item} handleStart={handleStart} handleStop={handleStop} handleReset={handleReset} getRunningTime={getRunningTime}/>

    </div>
  )
}