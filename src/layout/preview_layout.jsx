import { getIcons, getName, getProfileDetails } from "../utils/utils"
import { Save, Check, User, Box, Code, Layers, Bot, Sparkles, Loader2 } from "lucide-react";

export default function PreviewLayout({data, formData, isSaved, handleSave, onSaveSuccess, isEditing, setActiveTab}) {
  const profile = getProfileDetails(formData?.profile, data);

  return (
    <div className='sticky top-10 bg-white/60 backdrop-blur-xl rounded-lg border border-white/20 shadow
    overflow-hidden transition-all duration-500 hover:shadow-blue-500/10'>
        {/* Header */}
        <div className="bg-linear-to-r from-indigo-600/10 to-indigo-600/50 p-6 flex flex-col gap-4 md:flex-row justify-between md:items-center">
            <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-600/20">
                    <Bot className="size-5" />
                </div>
                <div>
                     <h2 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 leading-tight tracking-tight">Agent Preview</h2>
                     <p className="text-xs text-gray-500 font-medium">Real-time configuration</p>
                </div>
            </div>
            <button onClick={()=>handleSave(onSaveSuccess)} disabled={isSaved === 'saving' || isSaved === 'saved'}
                className={`flex w-fit ml-auto items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 
                    transform active:scale-95 cursor-pointer group disabled:opacity-80 disabled:cursor-not-allowed ${
                    isSaved === 'saving'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105'
                    : isSaved === 'saved'
                    ? 'bg-green-600 text-white shadow-lg shadow-green-500/20 scale-105'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-900/20'
                }`}>
                {isSaved === 'saving' ? (
                    <>
                        <Loader2 className="size-4 animate-spin" />
                        <span>{isEditing ? 'Updating' : 'Saving'}</span>
                    </>
                ) : isSaved === 'saved' ? (
                    <>
                        <Check className="size-4 animate-bounce" />
                        <span>{isEditing ? 'Updated' : 'Saved'}</span>
                    </>
                ) : (
                    <>
                        <Save className="size-4 group-hover:-translate-x-1 transition-all duration-300" />
                        <span className="group-hover:translate-x-1 transition-all duration-300">{isEditing ? 'Update Agent' : 'Save Agent'}</span>
                    </>
                )}
            </button>
        </div>

        <div className="p-8 space-y-8">
            {/* Agent Name Section */}
            <div className="space-y-1 group transition-all duration-300">
                <div className="flex items-center gap-2 text-gray-400 font-bold text-xs tracking-[0.2em] uppercase">
                    <User className="size-3" />
                    <span>Agent Identity</span>
                </div>
                <h1 className="text-4xl font-black tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                    {formData?.name || 'Unnamed Agent'}
                </h1>
            </div>

            {/* Profile Card */}
            <div className="bg-white/40 p-6 rounded-2xl border border-white/60 shadow-sm transition-all duration-300 hover:border-blue-200 group/card">
                 <div className="flex items-center gap-2 text-blue-600 font-bold text-xs tracking-widest uppercase mb-4">
                    <Sparkles className="size-3" />
                    <span>Core Profile</span>
                </div>
                <div className="space-y-1">
                    <p className="text-xl font-extrabold text-gray-900 group-hover/card:translate-x-1 transition-transform">
                        {profile?.name || 'No Profile Selected'}
                    </p>
                    <p className="text-gray-600 leading-relaxed text-sm font-medium">
                        {profile?.description || 'Select a profile to individualize your AI agent.'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Skills Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] tracking-[0.2em] uppercase">
                        <Code className="size-3" />
                        <span>Core Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData?.skills?.length > 0 ? (
                            formData?.skills?.map((skillId, index) => {
                                const name = getName(skillId, data);
                                return (
                                    <div key={index} className="px-3 py-1.5 bg-blue-50/50 backdrop-blur-sm text-blue-700 rounded-lg text-sm font-bold border 
                                    border-blue-100/50 flex items-center hover:bg-blue-100 transition-colors shadow-sm gap-2 capitalize">
                                        {getIcons(name, 'size-4')} {name || 'Loading...'}
                                    </div>
                                )
                            })
                        ) : (
                            <p className="text-xs text-gray-400 italic font-medium">No skills defined</p>
                        )}
                    </div>
                </div>

                {/* Layers Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] tracking-[0.2em] uppercase">
                        <Layers className="size-3" />
                        <span>Functional Layers</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData?.layers?.length > 0 ? (
                            formData?.layers?.map((layerId, index) => {
                                const name = getName(layerId, data);
                                return (
                                    <div key={index} className="px-3 py-1.5 bg-purple-50/50 backdrop-blur-sm text-purple-700 rounded-lg text-sm font-bold 
                                    border border-purple-100/50 hover:bg-purple-100 transition-colors shadow-sm
                                    flex items-center gap-2 capitalize">
                                        {getIcons(name, 'size-4')} {name || 'Loading...'}
                                    </div>
                                )
                            })
                        ) : (
                            <p className="text-xs text-gray-400 italic font-medium">No layers active</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Provider Section */}
            <div className="pt-4">
                <div className="flex justify-between items-center p-4 bg-gray-50/30 backdrop-blur-sm rounded-2xl border border-white/50">
                    <div className="flex items-center gap-2 font-bold text-xs text-gray-500 tracking-widest uppercase">
                        <Box className="size-3" />
                        <span>AI Provider</span>
                    </div>
                    <span className="px-4 py-1.5 bg-white text-gray-900 border border-gray-100 rounded-xl text-sm font-black shadow-sm ring-4 ring-gray-100/30
                    flex items-center gap-2 capitalize">
                        {getIcons(formData?.alt || 'gemini', 'size-4')} {formData?.provider || 'None'}
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

