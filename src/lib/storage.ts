/** Safe localStorage / sessionStorage helpers — never throw (private mode, quota, SSR). */

function safeGet(store: Storage | undefined, key: string): string | null {
  try {
    return store ? store.getItem(key) : null
  } catch {
    return null
  }
}

function safeSet(store: Storage | undefined, key: string, value: string): boolean {
  try {
    if (!store) return false
    store.setItem(key, value)
    return true
  } catch {
    return false
  }
}

function safeRemove(store: Storage | undefined, key: string) {
  try {
    store?.removeItem(key)
  } catch {
    /* ignore */
  }
}

const local = () => (typeof window === 'undefined' ? undefined : window.localStorage)
const session = () => (typeof window === 'undefined' ? undefined : window.sessionStorage)

export const localStore = {
  get: (key: string) => safeGet(local(), key),
  set: (key: string, value: string) => safeSet(local(), key, value),
  remove: (key: string) => safeRemove(local(), key),
  getJSON<T>(key: string, fallback: T): T {
    const raw = safeGet(local(), key)
    if (raw == null) return fallback
    try {
      return JSON.parse(raw) as T
    } catch {
      return fallback
    }
  },
  setJSON: (key: string, value: unknown) => safeSet(local(), key, JSON.stringify(value)),
}

export const sessionStore = {
  get: (key: string) => safeGet(session(), key),
  set: (key: string, value: string) => safeSet(session(), key, value),
  remove: (key: string) => safeRemove(session(), key),
}
