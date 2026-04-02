'use client'
import { FC, FormEvent, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Context, ContextType } from '../../context'
import { login } from '../../api/userApi'
import { AuthenticationCard } from './components'

const UserAuthentication: FC = () => {
  const router = useRouter()

  const { setUser } = useContext(Context) as ContextType

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await login({ name, email })
      setUser({ name, email })
      router.push('/search/dogs')
    } catch (err) {
      setError(`Error: ${err}: Login failed. Please try again`)
    } finally {
      setIsLoading(false)
      setName('')
      setEmail('')
    }
  }

  return (
    <AuthenticationCard
        name={name}
        email={email}
        onNameChange={setName}
        onEmailChange={setEmail}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
    />
  )
}

export default UserAuthentication
