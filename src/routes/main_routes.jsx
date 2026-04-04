import { Routes, Route } from 'react-router-dom'
import Home from '../pages'
import MainLayout from '../layout/main_layout'
import AgentBuilder from '../pages/agent_builder'

export default function MainRoutes() {
  return (
    <Routes>
        <Route path="/" element={<MainLayout/>} >
            <Route index element={<Home/>} />
            <Route path="new" element={<AgentBuilder/>}/>
        </Route>
    </Routes>
  )
}