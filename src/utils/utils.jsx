import { Bot, CloudCheck, Code, Database, Gavel, LayoutDashboard, ShoppingCart } from "lucide-react"
import { BiMoney } from "react-icons/bi"
import { FaBlog, FaUsers } from "react-icons/fa"
import { RiCustomerService2Fill } from "react-icons/ri"
import { useFetch } from "../hooks/useFetch"

export const getProfileDetails = (id, data) =>{
    return data?.agentProfiles?.find((profile)=> profile.id === id)   
}


export const getName = (id, data) => {
    if (!data) return ''
    const {skills = [], layers = []} = data
    if (!id || typeof id !== 'string') return ''
    const id_type = id.split("_")[0]
    let name = ''
    if(id_type === "sk"){
        name = skills?.find((skill) => skill.id === id)?.name
    }
    else if(id_type === "ly"){
        name = layers?.find((layer) => layer.id === id)?.name
    }
    return name
}

export const getSkills = (id, skill=[]) =>{
    if (!skill) return ''
    const skillName = skill?.find((s) => s.id === id)?.name
    return skillName
}

export const getLayers = (id, layer=[]) =>{
    if (!layer) return ''
    const layerName = layer?.find((l) => l.id === id)?.name
    return layerName
}


  

export const getIcons = (name, className='size-5') =>{
    const lowerName = name?.toLowerCase()
    const tempName = [
        {name: 'customer support',
            icon: <RiCustomerService2Fill className={className}/>
        }, 
        {name: 'code assistant',
            icon: <Code className={className}/>
        }, 
        {name: 'data analyst',
            icon: <Database className={className}/>
        }, 
        {name: 'creative writer',
            icon: <FaBlog className={className}/>
        }, 
        {name: 'sales representative',
            icon: <ShoppingCart className={className}/>
        }, 
        {name: 'financial advisor',
            icon: <BiMoney className={className}/>
        }, 
        {name: 'hr assistant',
            icon: <FaUsers className={className}/>
        }, 
        {name: 'devops engineer',
            icon: <CloudCheck className={className}/>
        }, 
        {name: 'legal consultant',
            icon: <Gavel className={className}/>
        }, 
        {name: 'ui/ux designer',
            icon: <LayoutDashboard className={className}/>
        },
        {name: 'gemini',
            icon: <img src="./gemini.png" alt="gemini" className={className}/>
        },
        {name: 'chatgpt',
            icon: <img src="./chat.png" alt="chatgpt" className={className}/>
        },
        {name: 'claude',
            icon: <img src="./claude.png" alt="claude" className={className}/>
        },
        {name: 'deepseek',
            icon: <img src="./deep.png" alt="deepseek" className={className}/>
        },
        {name: 'kimi',
            icon: <img src="./kimi.png" alt="kimi" className={className}/>
        },
        {name: 'default',
            icon: <Bot className={className}/>
        },
    ]
    
    const icon = tempName.find((item) => item.name === lowerName || item.name === 'default')?.icon
    return icon   
}