import { ChevronRight } from 'lucide-react'

export default function BreadCrumb({breadCrumbItems, setActiveTab, activeTab}) {
  return (
    <div className="flex gap-2">
        {breadCrumbItems.map((item, index) => (
        <button key={index} onClick={() => setActiveTab(item)}
        className={`flex items-center gap-2 capitalize cursor-pointer ${activeTab === item ? 'text-indigo-700 font-bold' : 'text-black/60'}`}>
            {item} {index < breadCrumbItems.length - 1 && 
            <ChevronRight className="size-4"/>
            }
        </button>
        ))}
    </div>
  )
}