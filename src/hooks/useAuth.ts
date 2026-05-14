import { useEffect, useState } from 'react'
const ITS_ID = import.meta.env.VITE_ITS_ID_URL || 'https://it-s-id.vercel.app'
interface AuthUser { id: string; email: string; name: string; avatar: string }
export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const token = localStorage.getItem('its-id-token')
    if (!token) { setLoading(false); return }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      setUser({ id: payload.sub || payload.id || '', email: payload.email || '', name: payload.name || payload.email || 'User', avatar: payload.avatar || '' })
    } catch {
      localStorage.removeItem('its-id-token')
    }
    setLoading(false)
  }, [])
  return { user, loading }
}
