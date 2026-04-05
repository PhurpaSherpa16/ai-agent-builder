import { useContext } from "react";
import { AgentsContext } from "../context/AgentsContext";

export default function useAgents() {
  const context = useContext(AgentsContext);
  if (!context) {
    throw new Error("useAgents must be used within an AgentsProvider");
  }
  return context;
}
