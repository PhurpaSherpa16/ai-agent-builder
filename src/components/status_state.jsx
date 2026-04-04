import React from 'react'
import { Bot } from 'lucide-react'

export default function StatusState({ icon: Icon = Bot, title, message, action, variant = 'indigo' }) {
  const variants = {
    indigo: {
      border: 'border-indigo-200 hover:border-indigo-600',
      groupHover: 'group-hover:bg-indigo-600'
    },
    red: {
      border: 'border-red-200 hover:border-red-600',
      groupHover: 'group-hover:bg-red-600'
    }
  };
  
  return (
    <div className='flex items-center justify-center'>
        <div className={`flex flex-col items-center justify-center py-32 bg-white rounded-lg border-2 border-dashed 
        ${variants[variant].border} space-y-6 group transition-all duration-300 w-full md:w-xl h-[400px]`}>
          <div className={`p-6 bg-gray-50 ${variants[variant].groupHover} rounded-full text-gray-300 group-hover:text-white transition-colors duration-300`}>
              {Icon && <Icon size={32} />}
          </div>
          <div className="text-center space-y-2 px-4">
              <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
              <p className="text-gray-500 max-w-sm mx-auto">{message}</p>
          </div>
          {action && (
            <div className="mt-4">
              {action}
            </div>
          )}
      </div>
    </div>
  );
}
