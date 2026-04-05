import { useState, useMemo, useEffect } from "react"
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
  const { agents, loading, deleteAgent, error: fetchError, deletingId, setAgents, stats, getRunningTime } = useAgents()
  const { data, loading: fetchLoading } = useFetch()

  const [selectedAgent, setSelectedAgent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSelected, setIsSelected] = useState(null)
  const navigate = useNavigate()

  const handleEdit = (agent) => {
    navigate("/new", { state: { agent, isEditing: true, index: agent.originalIndex } })
  }

  const handleDelete = (agent) => {
      deleteAgent(agent.originalIndex)
  }

  const enrichedAgents = useMemo(() => {
    if (!agents || !data) return agents;

    return agents.map((agent, index) => ({
      ...agent,
      originalIndex: index,
      profile: data.agentProfiles?.find(p => p.id === (agent.profile?.id || agent.profile)) || agent.profile,
      skills: agent.skills?.map(sId => {
        const id = typeof sId === 'object' ? sId.id : sId;
        return data.skills?.find(s => s.id === id) || sId;
      }) || [],
      layers: agent.layers?.map(lId => {
        const id = typeof lId === 'object' ? lId.id : lId;
        return data.layers?.find(l => l.id === id) || lId;
      }) || []
    }));
  }, [agents, data]);

  const groupedAgents = useMemo(() => {
    if (!enrichedAgents) return { active: [], inactive: [] };

    const sorted = [...enrichedAgents].sort((a, b) => {
      return getRunningTime(b) - getRunningTime(a);
    });

    return {
      active: sorted.filter(a => a.isRunning),
      inactive: sorted.filter(a => !a.isRunning)
    };
  }, [enrichedAgents]);

  const handleView = (agent) => {
    setSelectedAgent(agent)
    setIsModalOpen(true)
  }

  const handleStart = (agent) => {
    const updatedAgents = agents.map((a, i) => {
      if (i === agent.originalIndex) {
        return { ...a, isRunning: true, startTime: Date.now() }
      }
      return a
    })
    setAgents(updatedAgents)
  }

  const handleStop = (agent) => {
    const updatedAgents = agents.map((a, i) => {
      if (i === agent.originalIndex) {
        const startTime = a.startTime || Date.now()
        const totalTime = (a.totalTime || 0) + (Date.now() - startTime)
        return { ...a, isRunning: false, totalTime, startTime: null }
      }
      return a
    })
    setAgents(updatedAgents)
  }

  const handleReset = (agent) => {
    const updatedAgents = agents.map((a, i) => {
      if (i === agent.originalIndex) {
        return { ...a, isRunning: false, totalTime: 0, startTime: null }
      }
      return a
    })
    setAgents(updatedAgents)
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
        )}

        {agents.length === 0 && !loading && !fetchError && (
          <StatusState title="No Agents Operational" message="Bring your first custom AI agent to life by clicking the Create New Agent button." variant="indigo" icon={Bot}
            action={<ActionButton to="/new" label="Create New Agent" icon={Plus} />}
          />
        )}

        {(enrichedAgents.length > 0 && !loading && !fetchError) && (
          <div className="space-y-16">
            {groupedAgents.active.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
                    <h2 className="text-sm font-bold text-black/60">Active Operations (Running)</h2>
                  <div className="h-px flex-1 bg-gray-100" />
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{groupedAgents.active.length}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {groupedAgents.active.map((agent) => (
                    <AgentCard key={agent.id} item={agent} handleEdit={handleEdit} handleDelete={handleDelete}
                      handleView={handleView} isSelected={isSelected} setIsSelected={setIsSelected} loading={loading}
                      deletingId={deletingId} handleStart={handleStart} handleStop={handleStop} handleReset={handleReset} getRunningTime={getRunningTime}
                    />
                  ))}
                </div>
              </section>
            )}

            {groupedAgents.inactive.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-red-300" />
                  <h2 className="text-sm font-bold text-black/60">On Standby (Pause)</h2>
                  <div className="h-px flex-1 bg-gray-100" />
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{groupedAgents.inactive.length}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {groupedAgents.inactive.map((agent) => (
                    <AgentCard key={agent.id} item={agent} handleEdit={handleEdit} handleDelete={handleDelete}
                      handleView={handleView} isSelected={isSelected} setIsSelected={setIsSelected}
                      loading={loading} deletingId={deletingId} handleStart={handleStart} handleStop={handleStop}
                      handleReset={handleReset} getRunningTime={getRunningTime}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <AgentDetailsModal onClose={() => setIsModalOpen((p) => !p)} agent={selectedAgent} handleEdit={() => handleEdit(isSelected)} />
      )}
    </div>
  )
}
