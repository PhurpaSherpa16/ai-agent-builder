import Button from './button_for_array'
import { ItemSkeleton } from './skeleton'
import { useMemo } from 'react'

export default function FetchedItem({ data, formData, handleChange, selectedSkillId, setSelectedSkillId, name, title, description, loading }) {
  if (!data) return null
  const sortedData = useMemo(() => {
    if (!data) return []

    const orderMap = new Map();
    (formData[name] || []).forEach((id, index) => {
      orderMap.set(id, index)
    })

    return [...data].sort((a, b) => {
      if (a.id === selectedSkillId) return -1
      if (b.id === selectedSkillId) return 1

      const aIndex = orderMap.has(a.id) ? orderMap.get(a.id) : Infinity
      const bIndex = orderMap.has(b.id) ? orderMap.get(b.id) : Infinity

      return aIndex - bIndex

    })
  }, [data, selectedSkillId, formData, name])

  
  return (
    <div>
      <div className="block mb-4">
        <label className="text-lg font-semibold text-gray-900">{title}</label>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="flex flex-wrap gap-4 2xl:gap-6 relative h-60 bg-white border border-gray-200 rounded-2xl 
      p-4 overflow-y-scroll">
        {loading ? (
             <ItemSkeleton />
        ) : (
          sortedData?.map((item, index) => {
            const isAdded = formData[name]?.includes(item.id)
            const isSelected = selectedSkillId === item.id
            const buttonProps = { item, isAdded, isSelected, handleChange, setSelectedSkillId, name }
            return (
              <Button key={index} {...buttonProps} />
            )
          })
        )}
      </div>
      
    </div>
  )
}