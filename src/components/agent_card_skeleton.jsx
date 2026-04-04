import React from 'react'

export default function AgentCardSkeleton() {
  return (
    <div className='relative bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm overflow-hidden'>
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-gray-50 rounded-full"></div>

        <div className="relative flex items-center gap-4 mb-6">
            <div className="p-3 bg-gray-100 rounded-xl w-12 h-12 skeleton"></div>
            <div className="space-y-2 flex-1">
                <div className="h-5 bg-gray-200 rounded-md w-3/4 skeleton"></div>
                <div className="h-3 bg-gray-100 rounded-md w-1/4 skeleton"></div>
            </div>
        </div>

        <div className="relative flex items-center gap-4 mb-6">
            <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="w-16 h-6 bg-gray-100 border-2 border-white rounded-full skeleton"></div>
                ))}
            </div>
            <div className="w-12 h-6 bg-emerald-50/50 rounded-full skeleton"></div>
        </div>

        <div className='relative flex items-center justify-between pt-4 border-t border-gray-100 mt-2'>
            <div className="flex items-center gap-2">
                <div className='w-9 h-9 bg-gray-50 rounded-xl skeleton'></div>
                <div className='w-9 h-9 bg-gray-50 rounded-xl skeleton'></div>
            </div>
            <div className='w-9 h-9 bg-gray-50 rounded-xl skeleton'></div>
        </div>
    </div>
  )
}
