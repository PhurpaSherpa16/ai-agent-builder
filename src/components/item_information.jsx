import React from 'react'
import { getIcons } from '../utils/utils'

export default function ItemInformation({item}) {
  return (
    <>
        {item && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-300 p-4 md:p-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
                <div className="flex flex-col-reverse md:flex-row items-start gap-4">
                    <div className="flex gap-4 w-full">
                        <div className="hidden md:block p-3 h-fit bg-indigo-100 text-indigo-700 rounded-xl">
                            {getIcons(item?.name, 'size-8')}
                        </div>
                        <div className="">
                            <h3 className="text-xl text-center md:text-left font-bold text-indigo-900">{item?.name}</h3>
                            <p className="text-gray-700 text-center md:text-left leading-relaxed ">
                            {item?.description || ''}
                            </p>
                        </div>
                    </div>
                    <div className='w-full md:w-fit flex justify-center md:justify-end'>
                        <p className="px-2 py-0.5 w-30 bg-indigo-200 text-indigo-800 text-[10px] 
                        text-center font-bold uppercase rounded-full">
                            {item?.category || item?.type || 'Profile Type'}
                        </p>
                    </div>
                </div>
            </div>
        )}
    </>
  )
}
