export interface User {
  email: string
  name: string
}

export interface UserContext {
  user: User | null
  setUser: (value: User | null) => void
}
