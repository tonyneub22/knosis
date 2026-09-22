import { lazy, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router'
import Home from './pages/Home'
import ScrollToTop from './components/ScrollToTop'
import Layer1Shell from './components/layer1/Layer1Shell'
import LayerShell from './components/layers/LayerShell'

// Layer pages are code-split so the landing page stays light.
const Overview = lazy(() => import('./pages/layer1/Overview'))
const ChooseCase = lazy(() => import('./pages/layer1/ChooseCase'))
const Instructions = lazy(() => import('./pages/layer1/Instructions'))
const Reader = lazy(() => import('./pages/layer1/Reader'))
const Severity = lazy(() => import('./pages/layer1/Severity'))
const Feedback = lazy(() => import('./pages/layer1/Feedback'))
const Results = lazy(() => import('./pages/layer1/Results'))

const Layer2Overview = lazy(() => import('./pages/layer2/Overview'))
const Layer3Overview = lazy(() => import('./pages/layer3/Overview'))
const Layer4Overview = lazy(() => import('./pages/layer4/Overview'))
const Layer5Overview = lazy(() => import('./pages/layer5/Overview'))
const Layer6Overview = lazy(() => import('./pages/layer6/Overview'))

const LAYER1_PATH = '/structural-conditions'
const LAYER2_PATH = '/work-system'
const LAYER3_PATH = '/continuity-and-transitions'
const LAYER4_PATH = '/encounter'
const LAYER5_PATH = '/case-itself'
const LAYER6_PATH = '/reasoning-moment'

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

          {/* Layers 2–6 — overview pages only, no case flow yet */}
          <Route path={LAYER2_PATH} element={<LayerShell />}>
            <Route index element={<Layer2Overview />} />
          </Route>
          <Route path={LAYER3_PATH} element={<LayerShell />}>
            <Route index element={<Layer3Overview />} />
          </Route>
          <Route path={LAYER4_PATH} element={<LayerShell />}>
            <Route index element={<Layer4Overview />} />
          </Route>
          <Route path={LAYER5_PATH} element={<LayerShell />}>
            <Route index element={<Layer5Overview />} />
          </Route>
          <Route path={LAYER6_PATH} element={<LayerShell />}>
            <Route index element={<Layer6Overview />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}
