import React from "react";
import { X, User, Shield, Cpu, Layers, Bot, Lightbulb } from "lucide-react";
import { getIcons } from "../utils/utils";
import { capitalize } from "../utils/captalize";
import { Link } from "react-router-dom";

export default function AgentDetailsModal({ onClose, agent, handleEdit}) {

  return (
    <div className="fixed inset-0 z-50 h-screen flex items-center justify-center p-2 md:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white h-fit overflow-scroll w-full max-w-2xl rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}>
        <div className="relative p-4 md:p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              {getIcons(agent.profile?.name, 'md:size-10')}
            </div>
            <div>
              <h1>{agent.name}</h1>
              <p>{agent.profile?.description}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-red-100 rounded-full transition-colors text-gray-500 hover:text-red-600 group">
            <X size={24} className="group-hover:rotate-90 transition-transform duration-200"/>
          </button>
        </div>

        <div className="p-4 md:p-6 py-8 space-y-8 max-h-[55vh] overflow-y-auto">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm uppercase tracking-wider">
                <Lightbulb size={16} />
                <span>Summary</span>
              </div>
              <p >
                {agent.profile?.name || agent.profile || "No profile selected"} with <span className="text-indigo-600 font-semibold capitalize">{capitalize(agent.provider)}</span> AI Provider
              </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm uppercase tracking-wider">
                <Cpu size={16} />
                <span>Enabled Skills</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {agent.skills && agent.skills.length > 0 ? (
                agent.skills.map((skill, i) => (
                  <span key={i} title={skill.description} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full 
                  flex items-center gap-2
                  text-sm font-medium border border-indigo-100 shadow-sm capitalize cursor-help">
                    {getIcons(skill.name, 'size-4')}
                    {skill.name || skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 italic">No skills selected</span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm uppercase tracking-wider">
                <Layers size={16} />
                <span>Logic Layers</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {agent.layers && agent.layers.length > 0 ? (
                agent.layers.map((layer, i) => (
                  <span key={i} title={layer.description} className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full 
                  flex items-center gap-2
                  text-sm font-medium border border-emerald-100 shadow-sm capitalize cursor-help">
                    {getIcons(layer.name, 'size-4')}
                    {layer.name || layer}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 italic">No layers selected</span>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-100 text-center flex md:flex-row flex-col-reverse gap-4 md:gap-8 justify-end">
             <button onClick={onClose} className="px-8 py-3 bg-gray-400 text-white rounded-xl font-semibold hover:bg-red-700 transition-all shadow-lg hover:shadow-indigo-200">
                Close Details
             </button>
             <button onClick={() => handleEdit(agent)} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200">
                Edit Agent
             </button>
             
        </div>
      </div>
    </div>
  );
}
