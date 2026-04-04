import React from 'react'
import { getIcons } from '../utils/utils'

export default function ItemInformation({item}) {
  return (
    <>
        {item && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-300 p-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
                <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl">
                    {getIcons(item?.name, 'size-8')}
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-indigo-900">{item?.name}</h3>
                    <span className="px-2 py-0.5 bg-indigo-200 text-indigo-800 text-[10px] font-bold uppercase rounded-full">
                        {item?.category || item?.type || 'Profile Type'}
                    </span>
                    </div>
                    <p className="mt-2 text-gray-700 leading-relaxed">
                    {item?.description || ''}
                    </p>
                </div>
                </div>
            </div>
        )}
    </>
  )
}
