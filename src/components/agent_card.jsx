import { Eye, Edit3, Trash2, User, Shield, Bot, EllipsisVertical } from 'lucide-react'
import { getIcons } from '../utils/utils'

export default function AgentCard({item, index, handleEdit, handleDelete, handleView, isSelected, setIsSelected}) {

  return (
    <div className='group relative bg-white border border-gray-200/60 overflow-hidden rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300'>
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-indigo-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
        
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
                {item.skills && item.skills.slice(0, 2).map((skill, i) => (
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
        {/* action buttons */}
        <div className="absolute right-4 top-4 ">
            <button onClick={() => setIsSelected(isSelected === index ? null : index)}
            className={`relative p-2 rounded-full transition-all duration-200 z-10 ${
                isSelected === index 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
            }`}>
                <EllipsisVertical size={18} />
            </button>
            {
            isSelected === index 
            &&
            <div className='absolute right-0 top-10 bg-white border border-gray-200 rounded'>
                <button onClick={() => {
                    handleView(index)
                }} className='menuList ' title="View Details">
                    View
                </button>
                <button onClick={() => {
                    setIsSelected(null)
                    handleEdit(index)
                }} className='menuList'
                title="Edit Agent">
                    Edit
                </button>
                <button onClick={() => {
                    setIsSelected(null)
                    handleDelete(index)}
                } className='menuList' title="Delete Agent">
                    Delete
                </button>
            </div>
            }
        </div>
    </div>
  )
}