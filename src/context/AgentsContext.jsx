import React, { createContext, useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "agent_builder_config";

export const AgentsContext = createContext();

export function AgentsProvider({ children }) {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchAgents = useCallback(async () => {
    try {
      setLoading(true);
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        try {
          const parsed = JSON.parse(data);
          // Simulate network delay for a more premium "loading" feel as previously implemented
          const delay = Math.floor(Math.random() * 1000) + 500;
          await new Promise((resolve) => setTimeout(resolve, delay));
          setAgents(Array.isArray(parsed) ? parsed : [parsed]);
        } catch (e) {
          console.error("Error parsing agents from local storage:", e);
          setError("Failed to load agents");
        }
      } else {
          setAgents([]);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
      setError("Failed to load agents");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAgent = async (index) => {
    setDeletingId(index);
    try {
      const delay = Math.floor(Math.random() * 1000) + 500;
      await new Promise((resolve) => setTimeout(resolve, delay));
      const updatedAgents = agents.filter((_, i) => i !== index);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAgents));
      setAgents(updatedAgents);
    } finally {
      setDeletingId(null);
    }
  }

  const getRunningTime = (agent) => {
      if(agent.isRunning && agent.startTime){
        return (agent.totalTime || 0) + (Date.now() - agent.startTime)
      }
      return agent.totalTime || 0
  }

  const stats = React.useMemo(() => {
      if (!agents || agents.length === 0) return { total: 0, active: 0, inactive: 0, max: 0, average: 0 }
      
      const uptimes = agents.map(a => getRunningTime(a))
      return {
          total: agents.length,
          active: agents.filter(a => a.isRunning).length,
          inactive: agents.filter(a => !a.isRunning).length,
          max: Math.max(...uptimes),
          total_uptime: uptimes.reduce((a, b) => a + b, 0),
          average: uptimes.reduce((a, b) => a + b, 0) / agents.length
      }
  }, [agents])

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  // Persist changes to localStorage whenever agents state changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(agents));
    }
  }, [agents, loading]);

  const value = {
    agents,
    loading,
    error,
    deleteAgent,
    refreshAgents: fetchAgents,
    deletingId,
    setAgents,
    stats,
    getRunningTime
  };

  return (
    <AgentsContext.Provider value={value}>
      {children}
    </AgentsContext.Provider>
  );
}
