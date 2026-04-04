import { Check, Plus } from 'lucide-react'
import { getIcons } from '../utils/utils'

export default function Button({ item, isAdded, isSelected, handleChange, setSelectedSkillId, name }) {
    return (
        <button title={isAdded ? 'Added' : ''} key={item.id} onClick={() => {
            setSelectedSkillId(item.id)
            if (!isAdded) {
                handleChange({ target: { name: name, value: item.id } })
            }
        }}
            className={`group relative flex items-center gap-3 p-2 px-6 text-left border rounded-xl transition-all duration-300 
            transform active:scale-95
            ${isSelected || isAdded ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-200 hover:border-indigo-400 hover:shadow-md'}
            ${isAdded ? 'opacity-100 border-indigo-700' : 'opacity-70 hover:opacity-100'}
        `}>
            <div className={`p-2 rounded-lg transition-colors 
            ${isAdded ? 'bg-indigo-600 font-bold text-white' : 'bg-gray-200/60 text-black/60'} 
            ${isSelected || isAdded ? 'bg-indigo-600 text-white' : 'bg-gray-100 group-hover:bg-indigo-100 group-hover:text-indigo-600'}`}>
                {getIcons(item.name, 'size-4')}
            </div>
            <div className="flex">
                <span className={`text-sm font-medium ${isSelected || isAdded ? 'text-indigo-900' : 'text-gray-700'}`}>
                    {item.name}
                </span>
            </div>
            {isAdded ? (
                <Check className='text-green-600 z-10 p-0.5 bg-green-100 rounded-full border size-4 absolute right-1 top-1' />
            ) : (
                <div className='w-0 overflow-hidden transition-all duration-300 group-hover:w-6'>
                    <Plus className='text-indigo-600 z-10 p-0.5 bg-indigo-100 rounded-full border size-4 transition-all' />
                </div>
            )}
        </button>
    )
}
