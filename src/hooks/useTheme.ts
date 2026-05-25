import { useEffect, useRef, useState } from 'react'

type Theme = 'light' | 'dark'

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
    } catch {
      return 'light'
    }
  })
  const mounted = useRef(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    if (mounted.current) {
      try {
        localStorage.setItem('theme', theme)
      } catch (err) {
        console.warn('[useTheme] Could not persist theme preference:', err)
      }
    }
    mounted.current = true
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return { theme, toggle }
}
