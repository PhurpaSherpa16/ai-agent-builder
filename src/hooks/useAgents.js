import { useState, useEffect } from "react";

const STORAGE_KEY = "agent_builder_config";

export default function useAgents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null)
  const fetchAgents = async () => {
    try {
      setLoading(true);
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        try {
          const parsed = JSON.parse(data)
          const delay = Math.floor(Math.random() * 2000) + 1000
          await new Promise((resolve) => setTimeout(resolve, delay))
          setAgents(Array.isArray(parsed) ? parsed : [parsed]);
        } catch (e) {
          console.error("Error parsing agents from local storage:", e);
          setError('Failed to load agents');
        }finally{
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error parsing agents from local storage:", error);
      setError('Failed to load agents');
    }finally{
      setLoading(false);
    }
  };

  const deleteAgent = async (index) => {
    setDeletingId(index)
    try {
      const delay = Math.floor(Math.random() * 2000) + 1000
      await new Promise((resolve) => setTimeout(resolve, delay))
      const updatedAgents = agents.filter((_, i) => i !== index);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAgents));
      setAgents(updatedAgents);
    } finally {
      setDeletingId(null)
    }
  }

  useEffect(() => {
    fetchAgents();
  }, []);

  return {
    agents,
    loading,
    error,
    deleteAgent,
    refreshAgents: fetchAgents,
    deletingId,
  };
}
