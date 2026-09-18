import { Route, Routes, Navigate } from 'react-router'
import { levels } from './data/levels'
import Home from './pages/Home'
import LevelPage from './pages/LevelPage'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        {levels.map((level) => (
          <Route key={level.id} path={level.path} element={<LevelPage level={level} />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
