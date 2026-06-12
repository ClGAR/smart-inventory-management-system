/* eslint-disable react-refresh/only-export-components */
import { createContext, useMemo } from 'react'
import { getCurrentUser } from '../services/authService.js'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const value = useMemo(
    () => ({
      user: getCurrentUser(),
      isAuthenticated: Boolean(getCurrentUser()),
    }),
    [],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
