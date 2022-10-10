import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Detail from './pages/Detail'
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="detail" element={<Detail />} />
    </Routes>
  )
}

export default App
