import { useState } from 'react'
import ItemInformation from './item_information'
import DisplayItem from './display_item'
import FetchedItem from './fetched_item'

export default function Skills({ ...formProps }) {
  const { data, formData, handleChange, setFormData, formError, loading } = formProps
  const [selectedSkillId, setSelectedSkillId] = useState(null)

  const skills = data?.skills || []
  const addedSkills = formData?.skills?.map(id => skills.find(s => s.id === id)).filter(Boolean)
  const selectedSkillDetails = skills?.find(s => s.id === selectedSkillId)

  const name = 'skills'
  
  const props = {setFormData, formData, setSelectedSkillId, 
    data: addedSkills, title: 'Configured Capabilities', name: name, 
    description: "Drag to prioritize and order your agent's skills." }

  const fetchedProps = {setFormData, formData, selectedSkillId, setSelectedSkillId, 
    data: data?.skills, title: 'Available Skills',  handleChange, name: name, loading,
    description: "Browse and add technical capabilities to your agent." }

  console.log(formData)

  return (
    <div className="space-y-8">
      
      <DisplayItem {...props}/>

      <hr className="border-gray-200" />

      {/* Available Skills Selector */}
      <FetchedItem {...fetchedProps}/>

      {(formError?.skills && !formData.skills.length > 0 ) && (
        <p className='error pt-4'>{formError?.skills}</p>
      )}

      {/* Skill Details View */}
      <ItemInformation item={selectedSkillDetails} />
    </div>
  )
}

