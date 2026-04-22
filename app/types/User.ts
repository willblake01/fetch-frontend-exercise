export interface User {
  name: string
  email: string
}

export interface UserContext {
  user: User | null
  setUser: (value: User | null) => void
}
