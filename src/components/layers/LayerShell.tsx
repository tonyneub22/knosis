import { Link, Outlet } from 'react-router'
import Footer from '../Footer'
import Logo from '../Logo'

/**
 * Minimal page frame for layers with no case flow yet: top bar (wordmark → home) + radial glow +
 * Footer, same look as Layer 1's shell but with no Stepper — there is nothing to step through.
 * Still a nested route with an <Outlet/>, so a case flow can be added later the same way Layer 1's
 * was, without restructuring.
 */
export default function LayerShell() {
  return (
    <div className="relative flex min-h-[100svh] flex-col">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background: 'radial-gradient(ellipse 55% 40% at 50% 20%, rgba(212,195,154,0.06), transparent 70%)',
        }}
      />

      <div className="relative z-30 mx-auto flex w-full max-w-6xl items-center px-6 py-5">
        <Link to="/" className="group flex items-center gap-3 outline-none" aria-label="Knosis home">
          <Logo size={28} animate={false} />
          <span className="font-display text-lg font-light tracking-[0.3em] text-ivory/80 transition-colors duration-500 group-hover:text-ivory">
            Knosis
          </span>
        </Link>
      </div>

      <div className="relative flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}
