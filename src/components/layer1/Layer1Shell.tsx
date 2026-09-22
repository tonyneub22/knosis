import { Link, Outlet, useLocation } from 'react-router'
import Footer from '../Footer'
import Logo from '../Logo'
import Stepper from './Stepper'

/** Page frame for every Layer 1 route: slim top bar with wordmark + stepper, the page, footer. */
export default function Layer1Shell() {
  const { pathname } = useLocation()
  const isResults = pathname.endsWith('/results')

  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background: 'radial-gradient(ellipse 55% 40% at 50% 20%, rgba(212,195,154,0.06), transparent 70%)',
        }}
      />

      <div className="relative z-30 mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <Link to="/" className="group flex items-center gap-3 outline-none" aria-label="Knosis home">
          <Logo size={28} animate={false} />
          <span className="font-display text-lg font-light tracking-[0.3em] text-ivory/80 transition-colors duration-500 group-hover:text-ivory">
            Knosis
          </span>
        </Link>
        {isResults ? (
          <span className="font-body text-[10px] uppercase tracking-[0.28em] text-gold/70">Live results</span>
        ) : (
          <Stepper />
        )}
      </div>

      <div className="relative flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}
