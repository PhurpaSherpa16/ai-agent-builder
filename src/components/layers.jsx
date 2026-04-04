import { useState } from 'react'
import ItemInformation from './item_information'
import DisplayItem from './display_item'
import FetchedItem from './fetched_item'

export default function Layers({ ...formProps }) {
  const { data, formData, handleChange, setFormData, formError, loading } = formProps
  const [selectedLayerId, setSelectedLayerId] = useState(null)

  const layers = data?.layers || []
  const addedLayers = (formData.layers || []).map(id => layers.find(l => l.id === id)).filter(Boolean)
  const selectedLayerDetails = layers.find(l => l.id === selectedLayerId)

  const props = {setFormData, formData, setSelectedSkillId: setSelectedLayerId, 
    data: addedLayers, title: 'Configured Layers', name: 'layers',
    description: "Drag to prioritize and order your agent's personality layers." }

  const fetchedProps = {setFormData, formData, selectedSkillId: selectedLayerId, setSelectedSkillId: setSelectedLayerId, 
    data: data?.layers || [], title: 'Available Layers',  handleChange, name: 'layers', loading,
    description: "Browse and add personality layers to your agent." }

  return (
    <div className="space-y-8">
      
      <DisplayItem {...props}/>

      <hr className="border-gray-200" />

      {/* Available Layers Selector */}
      <FetchedItem {...fetchedProps}/>

      {(formError?.layers && !formData.layers.length > 0 ) && (
        <p className='error pt-4'>{formError?.layers}</p>
      )}

      {/* Layer Details View */}
      <ItemInformation item={selectedLayerDetails} />
    </div>
  )
}
