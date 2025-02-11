import { useState, useEffect, useRef } from 'react'

function useLocalStorage(
  key: string,
  defaultValue: null | number | string | boolean | object | Array<string | number | object>,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [state, setState] = useState(() => {
    if (typeof window !== 'undefined') {
      const valueInLocalStorage = window.localStorage.getItem(key)

      if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = useRef(key)

  useEffect(() => {
    const prevKey = prevKeyRef.current

    if (typeof window !== 'undefined') {
      if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
    }
  }, [key, state, serialize])
  return [state, setState]
}

export { useLocalStorage}
