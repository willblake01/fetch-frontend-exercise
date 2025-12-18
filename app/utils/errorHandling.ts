import { useRouter } from 'next/navigation'

export const handleApiError = (error: Error, router: ReturnType<typeof useRouter>, resetContext: () => void) => {
  const { message } = error
  if (message === 'Unauthorized') {
    resetContext()
    router.push('/')
  } else {
    console.error(error)
  }
}
