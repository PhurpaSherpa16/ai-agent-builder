import { useState } from "react"
import useAgents from "./useAgents"

export default function useForm(initialValues = {}) {
    const { agents, setAgents } = useAgents()
    const [formData, setFormData] = useState({
      name: initialValues.name || "",
      profile: initialValues.profile || "",
      skills: initialValues.skills || [],
      layers: initialValues.layers || [],
      provider: initialValues.provider || "",
    })

    const [error, setError] = useState({
      name: "",
      profile: "",
      skills: "",
      layers: "",
      provider: "",
    })

    const handleChange = (e) =>{
      const {name, value} = e.target
      if(name === "skills"){
        setFormData((prev)=>({...prev, skills: prev.skills.includes(value) ? prev.skills : [...prev.skills, value]}))
      }
      else if(name === "layers"){
        setFormData((prev)=>({...prev, layers: prev.layers.includes(value) ? prev.layers : [...prev.layers, value]}))
      }
      else{
        setFormData((prev)=>({...prev, [name]: value}))
      }

    }

    const [isSaved, setIsSaved] = useState('idle');

  const validateForm = (setActiveTab) => {
    if(!formData.name){
      setError((prev)=>({...prev, name: '*** Please, Enter the name for your agent ***'}))
      setActiveTab('details')
      return false
    }
    if(!formData.provider){
      setError((prev)=>({...prev, provider: '*** Please select one AI provider ***'}))
      setActiveTab('details')
      return false
    }
    if(!formData.profile){
      setError((prev)=>({...prev, profile: '*** Please, Select the base profile - category for your agent ***'}))
      setActiveTab('profile')
      return false
    }
    if(formData.skills.length === 0){
      setError((prev)=>({...prev, skills: '*** Please, Select at least one skill for your agent ***'}))
      setActiveTab('skills')
      return false
    }
    if(formData.layers.length === 0){
      setError((prev)=>({...prev, layers: '*** Please, Select at least one layer for your agent ***'}))
      setActiveTab('layers')
      return false
    }
    return true
  }

  const handleSave = async (onSaveSuccess, setActiveTab, editIndex = null) => {
    try {
        if(!validateForm(setActiveTab)) return
        
        setIsSaved('saving')
        setError({name: "",provider: "",profile: "",skills: "",layers: ""})

        let updatedAgents = [...agents];
        
        if (editIndex !== null && editIndex >= 0 && editIndex < updatedAgents.length) {
            // Update existing agent
            updatedAgents[editIndex] = {
                ...formData,
                id: updatedAgents[editIndex].id || Date.now(),
                startTime : updatedAgents[editIndex].startTime,
                totalTime : updatedAgents[editIndex].totalTime,
                isRunning : updatedAgents[editIndex].isRunning,
            };
        } else {
            // Add new agent
            updatedAgents.push({
                ...formData,
                id: Date.now(),
                startTime : null,
                totalTime : 0,
                isRunning : false,
            });
        }

        // Update global state, which also triggers the localStorage persistence in the context
        setAgents(updatedAgents);
        
        if (onSaveSuccess) onSaveSuccess()

        const delay = Math.floor(Math.random() * 1500) + 500
        await new Promise(resolve => setTimeout(resolve, delay))

        setIsSaved('saved')
        setFormData({name: "",profile: "",skills: [],layers: [],provider: ""})
        
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsSaved('idle')
    } catch (error) {
        console.error("Error saving agent:", error)
        setError((prev)=>({...prev, name: '*** Error saving agent, Please try again later. ***'}))
        setIsSaved('idle')
    }
  };


  return {formData, setFormData, handleChange, error, setError, isSaved, setIsSaved, handleSave}
}
