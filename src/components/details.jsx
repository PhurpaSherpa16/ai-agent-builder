import { Bot } from 'lucide-react'

export default function Details({...formProps}) {
    const {formData, handleChange, formError} = formProps
    const handleClick = (provider) =>{
        handleChange({target: {name: 'provider', value: provider.value}})
    }

  return (
    <div className='space-y-8'>
        <div className='md:h-28 relative'>
            <div className='block mb-2'>
                <label htmlFor="name">Agent Name</label>
            </div>
            <div className='flex items-center justify-center'>
                <input type="text" id="name" name="name" 
                placeholder='Enter Agent Name e.g: Vivasoft_Agent'
                value={formData.name} onChange={handleChange} 
                className='group'/>
                <Bot className='text_icon'/>
            </div>
            {(formError?.name && !formData.name) && (
                <p className='error pt-2'>{formError?.name}</p>
            )}
        </div>

        <hr className="border-gray-200" />

        <div>
            <div className='block mb-4'>
                <label htmlFor="provider-select ">AI Provider:</label>
                <p className='text-sm text-gray-500'>Select the AI provider for your agent</p>
            </div>
            <div className='flex gap-4 flex-wrap'>
                {providers.map((provider, index) => (
                    <button key={index} name='provider' value={provider.value} onClick={()=>handleClick(provider)}
                    className={`group hover:border-indigo-700 flex items-center gap-2 justify-center border border-gray-400/60 rounded-lg px-4 py-2
                        hover:shadow-lg
                    ${formData.provider === provider.value && 'border-indigo-700 shadow-lg font-bold'}`} >
                        <div className='group-hover:-translate-x-1 transition-all duration-300'>
                            {provider.icon}     
                        </div>
                        <span className='group-hover:translate-x-1 transition-all duration-300 text-sm group-hover:font-bold'>
                            {provider.name}
                        </span>
                    </button>
                ))}
            </div>
            {(formError?.provider && !formData.provider) && (
                <p className='error pt-2'>{formError?.provider}</p>
            )}
        </div>
    </div>
  )
}


const providers = [
        {name: 'Gemini', icon: <img src='./gemini.png' alt="kimi" className='size-5'/>, value: 'gemini', bgColor: 'bg-blue-50'},
        {name: 'ChatGPT', icon: <img src='./chat.png' alt="kimi" className='size-5'/>, value: 'chatgpt', bgColor: 'bg-green-50'},
        {name: 'Kimi', icon: <img src='./kimi.png' alt="kimi" className='size-5'/>, value: 'kimi', bgColor: 'bg-red-50'},
        {name: 'Claude', icon: <img src='./claude.png' alt="kimi" className='size-5'/>, value: 'claude', bgColor: 'bg-yellow-50'},
        {name: 'DeepSeek', icon: <img src='./deep.png' alt="kimi" className='size-5'/>, value: 'deepseek', bgColor: 'bg-purple-50'},
    ]