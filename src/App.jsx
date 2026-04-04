import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './routes/main_routes'

export default function App() {
  return (
    <BrowserRouter>
        <MainRoutes/>
    </BrowserRouter>
  )
}
