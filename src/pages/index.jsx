import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import AgentCard from "../components/agent_card"
import useAgents from "../hooks/useAgents"
import AgentDetailsModal from "../components/agent_details_modal"
import AgentCardSkeleton from "../components/agent_card_skeleton"
import StatusState from "../components/status_state"
import ActionButton from "../components/action_button"
import { Plus, Bot, RotateCwIcon } from "lucide-react"
import { useFetch } from "../hooks/useFetch"

export default function Home() {
  const { agents, loading, deleteAgent, error: fetchError, deletingId } = useAgents()
  const {data, loading:fetchLoading} = useFetch()

  const [selectedAgent, setSelectedAgent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSelected, setIsSelected] = useState(null)
  const navigate = useNavigate()

  const handleEdit = (index) => {
    const agent = agents[index]
    // Navigate to /new and pass agent data in state for editing
    navigate("/new", { state: { agent, isEditing: true, index } })
  }

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      deleteAgent(index)
    }
  }

  // fetching details of data
  
  const enrichedAgents = useMemo(() => {
    if (!agents || !data) return agents;

    return agents.map(agent => ({
      ...agent,
      // Map profile ID to full profile object
      profile: data.agentProfiles?.find(p => p.id === (agent.profile?.id || agent.profile)) || agent.profile,
      // Map skill IDs to full skill objects
      skills: agent.skills?.map(sId => {
        const id = typeof sId === 'object' ? sId.id : sId;
        return data.skills?.find(s => s.id === id) || sId;
      }) || [],
      // Map layer IDs to full layer objects
      layers: agent.layers?.map(lId => {
        const id = typeof lId === 'object' ? lId.id : lId;
        return data.layers?.find(l => l.id === id) || lId;
      }) || []
    }));
  }, [agents, data]);

  const handleView = (index) => {
    setSelectedAgent(enrichedAgents[index])
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-indigo-600 font-bold text-sm uppercase tracking-[0.2em]">
                        <Bot size={20} />
                        <span>AI Agent Builder</span>
                    </div>
                    <h1 className="font-black">Your Agent Factory</h1>
                    <p>Manage and monitor your custom-built AI agents with premium insights and control.</p>
                </div>
                {/* create new button */}
                {agents.length > 0 && (
                  <ActionButton to="/new" label="Create New Agent" icon={Plus} variant="indigo" />
                )}
            </header>

            {loading && fetchLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <AgentCardSkeleton key={i} />
                    ))}
                </div>
            )} 

                {fetchError && !loading && (
                <StatusState title="Failed to Load Agents" message={fetchError} variant="red" icon={Bot}
                  action={<ActionButton label="Refresh" icon={RotateCwIcon} variant="green" 
                  onClick={() => window.location.reload()} iconAnimation="hover:rotate-180" />}
                />
              ) } 

              {agents.length === 0 && !loading && !fetchError && (
                <StatusState title="No Agents Operational" message="Bring your first custom AI agent to life by clicking the button above." variant="indigo" icon={Bot}
                  action={<ActionButton to="/new" label="Create New Agent" icon={Plus} />}
                />
              )} 

            {(enrichedAgents.length > 0 && !loading && !fetchError) && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {enrichedAgents.map((agent, index) => {
                      return (
                      <AgentCard key={agent.id || index} item={agent} index={index} 
                      handleEdit={handleEdit} handleDelete={handleDelete} handleView={handleView}
                      isSelected={isSelected} setIsSelected={setIsSelected} loading={loading} deletingId={deletingId}
                      />
                    )})}
                </div>
            )}
        </div>
        
        {isModalOpen && (
            <AgentDetailsModal onClose={() => setIsModalOpen((p)=>!p)} agent={selectedAgent} handleEdit={()=>handleEdit(isSelected)}/>
        )}
    </div>
  )
}
    