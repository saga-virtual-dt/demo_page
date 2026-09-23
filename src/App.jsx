import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import RequestForm from './pages/RequestForm'
import NichePage from './pages/NichePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/precos" element={<Pricing />} />
      <Route path="/solicitar" element={<RequestForm />} />
      <Route path="/:slug" element={<NichePage />} />
    </Routes>
  )
}
