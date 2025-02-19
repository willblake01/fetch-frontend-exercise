'use client'
import { useEffect, useRef, useState } from 'react'

const useLocalStorage = (
  key: string,
    defaultValue: null | number | string | boolean | object | Array<string | number | object>,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) => {
  const [state, setState] = useState(typeof defaultValue === 'function' ? defaultValue() : defaultValue)

  const prevKeyRef = useRef(key)

  useEffect(() => {
    try {
      if (window !== undefined) {
        const valueInLocalStorage = window?.localStorage?.getItem(key)

      if (valueInLocalStorage) {
        setState(deserialize(valueInLocalStorage))
      }
      }
    } catch (error) {
      console.error(error)
    }
}, [key, deserialize])

  useEffect(() => {
    if (window !== undefined) {
      try {
        const prevKey = prevKeyRef.current

      if (prevKey !== key) {
          window?.localStorage?.removeItem(prevKey)
        }
        prevKeyRef.current = key
        window?.localStorage?.setItem(key, serialize(state))
      } catch (error) {
        console.error(error)
      }
    }
  }, [key, serialize, state])
  
  return [state, setState]
}

export { useLocalStorage}
