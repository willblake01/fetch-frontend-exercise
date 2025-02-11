'use client'
import { createContext, ReactNode } from 'react'
import { useLocalStorage } from './utils/useLocalStorage'

interface ContextType {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
}

export const Context = createContext<ContextType | null>(null)

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false)

  const context = {
    isLoggedIn,
    setIsLoggedIn
  }

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}
