import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * Resets scroll position on route change so each page opens at the top. When the URL carries a
 * hash that matches an element id on the page (e.g. `/#pyramid`), scrolls there instead.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}
