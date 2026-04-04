import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layout/main_layout'
import Index from '../pages'
import AgentBuilder from '../pages/agent_builder'

export default function MainRoutes() {
  return (
    <Routes>
        <Route path="/" element={<MainLayout/>} >
            <Route index element={<Index/>} />
            <Route path="new" element={<AgentBuilder/>} />
        </Route>
    </Routes>
  )
}