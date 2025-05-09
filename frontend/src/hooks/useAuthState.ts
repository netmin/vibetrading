import { createContext, useContext } from 'react'

export type AuthStatus = 'guest' | 'waitlist' | 'paid'

interface AuthContextType {
  status: AuthStatus
  setStatus: (status: AuthStatus) => void
}

export const AuthContext = createContext<AuthContextType>({
  status: 'guest',
  setStatus: () => {},
})

export const useAuthState = () => {
  return useContext(AuthContext)
}