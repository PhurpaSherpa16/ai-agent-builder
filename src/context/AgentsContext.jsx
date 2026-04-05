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
  };

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
  };

  return (
    <AgentsContext.Provider value={value}>
      {children}
    </AgentsContext.Provider>
  );
}
