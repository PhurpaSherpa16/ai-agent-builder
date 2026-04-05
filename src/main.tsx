import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App' 
import './index.css'
import { AgentsProvider } from './context/AgentsContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AgentsProvider>
      <App />
    </AgentsProvider>
  </StrictMode>,
)
