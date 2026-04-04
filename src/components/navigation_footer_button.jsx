import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

export default function NavigationFooterButton({activeTab, setActiveTab, breadCrumbItems}) {
  const totalTabs = breadCrumbItems.length
  const currentTabIndex = breadCrumbItems.indexOf(activeTab)
  const isLastTab = currentTabIndex === totalTabs - 1
  const isFirstTab = currentTabIndex === 0

  const nextTab = () => {
    if(currentTabIndex < totalTabs - 1){
      setActiveTab(breadCrumbItems[currentTabIndex + 1])
    }
  }

  const prevTab = () => {
    if(currentTabIndex > 0){
      setActiveTab(breadCrumbItems[currentTabIndex - 1])
    }
  }

  return (
    <div className="flex justify-between pt-8">
        <div>
            <button className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2
              ${isFirstTab ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white'}`} 
              onClick={() => prevTab()} disabled={isFirstTab}>
              <ChevronLeft/>
              Prev
            </button>
        </div>
        <div>
            <button className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2
              ${isLastTab ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white'}`} 
              onClick={() => nextTab()} disabled={isLastTab}>
              Next
              <ChevronRight/>
            </button>
        </div>
    </div>
  )
}