import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Detail from './pages/Detail'
import CreateBog from './pages/Blogs/create-blog'
import 'antd/dist/antd.css'
import WrapPage from './components/wrap-page'
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <WrapPage>
            <HomePage />
          </WrapPage>
        }
      />
      <Route
        path="/blog/create"
        element={
          <WrapPage>
            <CreateBog />
          </WrapPage>
        }
      />
      <Route
        path="detail"
        element={
          <WrapPage>
            <Detail />
          </WrapPage>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
