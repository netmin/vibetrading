import { createContext, useContext, useEffect, ReactNode } from 'react'

export type Theme = 'light'

interface ThemeContextType {
  theme: Theme
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light'
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: 'light' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
