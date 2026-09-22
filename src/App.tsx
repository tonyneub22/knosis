import { lazy, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router'
import { levels } from './data/levels'
import Home from './pages/Home'
import LevelPage from './pages/LevelPage'
import ScrollToTop from './components/ScrollToTop'
import Layer1Shell from './components/layer1/Layer1Shell'

// Layer 1 pages are code-split so the landing page stays light.
const Overview = lazy(() => import('./pages/layer1/Overview'))
const ChooseCase = lazy(() => import('./pages/layer1/ChooseCase'))
const Instructions = lazy(() => import('./pages/layer1/Instructions'))
const Reader = lazy(() => import('./pages/layer1/Reader'))
const Severity = lazy(() => import('./pages/layer1/Severity'))
const Feedback = lazy(() => import('./pages/layer1/Feedback'))
const Results = lazy(() => import('./pages/layer1/Results'))

const LAYER1_PATH = '/structural-conditions'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-[100svh]" aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Layer 1 — Structural conditions */}
          <Route path={LAYER1_PATH} element={<Layer1Shell />}>
            <Route index element={<Overview />} />
            <Route path="cases" element={<ChooseCase />} />
            <Route path="cases/:caseId/instructions" element={<Instructions />} />
            <Route path="cases/:caseId/read" element={<Reader />} />
            <Route path="cases/:caseId/severity" element={<Severity />} />
            <Route path="cases/:caseId/feedback" element={<Feedback />} />
            <Route path="results" element={<Results />} />
            <Route path="*" element={<Navigate to={LAYER1_PATH} replace />} />
          </Route>

          {/* Remaining layers — placeholder pages until their content arrives */}
          {levels
            .filter((level) => level.path !== LAYER1_PATH)
            .map((level) => (
              <Route key={level.id} path={level.path} element={<LevelPage level={level} />} />
            ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}
