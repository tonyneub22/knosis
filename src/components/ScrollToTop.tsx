import { useEffect } from 'react'
import { useLocation } from 'react-router'

/** Resets scroll position on route change so each page opens at the top. */
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}
