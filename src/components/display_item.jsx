import { GripVertical, Plus, Trash, X } from 'lucide-react'
import { CSS } from '@dnd-kit/utilities'
import { getIcons } from '../utils/utils'
import { DndContext, useSensors, useSensor, PointerSensor, KeyboardSensor, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import React from 'react'

export default function DisplayItem({setFormData, formData, setSelectedSkillId, data, title, description, name }) {
    const sensors = useSensors(
        useSensor(PointerSensor, {
        activationConstraint: {
            distance: 8,
        },
        }),
        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragEnd = (event) => {
        const { active, over } = event

        if (active.id !== over?.id) {
        const oldIndex = formData[name].indexOf(active.id)
        const newIndex = formData[name].indexOf(over.id)

        const newOrder = arrayMove(formData[name], oldIndex, newIndex)
        setFormData(prev => ({ ...prev, [name]: newOrder }))
        }
    }

    const removeItem = (id) => {
        setFormData(prev => ({
            ...prev,
            [name]: prev[name].filter(itemId => itemId !== id)
        }))
        setSelectedSkillId(null)
    }
    
    if(!formData?.[name]) return null

  return (
    <div>
        <div className="block mb-4">
          <label className="text-lg font-semibold text-gray-900">{title}</label>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        <div className="relative min-h-[120px] bg-slate-50/50 border-2 border-dashed border-gray-200 rounded-2xl p-4 transition-colors hover:bg-slate-50">
          {data?.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center py-6 text-gray-400">
              <Plus className="mb-2 opacity-20" size={32} />
              <p className="text-sm">No items added yet. Select from below to start.</p>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              className="min-h-[10px] pb-20"
            >
              <SortableContext items={formData[name] || []} strategy={verticalListSortingStrategy}>
                <div className="flex flex-wrap gap-2 pb-10">
                  {data?.map((item, index) => {
                    const sortableProps = {id: item.id, item, onRemove: removeItem}
                  return(
                    <SortableItem key={index} {...sortableProps} />
                  )})}
                </div>
                <button className="text-red-500 absolute bottom-4 right-4 bg-red-50 p-1 px-2 text-xs border border-red-100 rounded-lg
                flex items-center gap-2 group hover:bg-red-100 transition-all" onClick={() => {
                    setFormData(prev => ({ ...prev, [name]: [] }))
                    setSelectedSkillId(null)
                  }}>
                  <Trash size={12} className='group-hover:-translate-x-1 transition-all' />
                  <span className='group-hover:translate-x-1 transition-all'>Clear All</span>
                </button>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
  )
}


// Sortable Component
const SortableItem = React.memo(
  function SortableItem({ id, item, onRemove }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

    const style = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 10 : 1, opacity: isDragging ? 0.5 : 1, }

    return (
      <div ref={setNodeRef} style={style} className={`w-fit flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm group transition-all duration-200 ${isDragging ? 'shadow-lg ring-2 ring-indigo-500' : 'hover:border-indigo-300'}`}>
        <div {...attributes} {...listeners} className="cursor-grab flex items-start gap-3 active:cursor-grabbing text-gray-400 hover:text-indigo-600">
          <GripVertical size={16} />
          <div className="flex-shrink-0">
            {getIcons(item?.name, 'size-6 text-indigo-600')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{item?.name}</p>
            <p className="text-xs text-gray-500 truncate">{item?.category || item?.type}</p>
          </div>

          <button onClick={() => onRemove(id)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Remove item">
            <X size={16} />
          </button>
        </div>
      </div>
    )
  }
)