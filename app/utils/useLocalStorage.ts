import { useEffect, useRef, useState } from 'react'

const useLocalStorage = (
  key: string,
  defaultValue: null | number | string | boolean | object | Array<string | number | object>,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) => {
  const [state, setState] = useState(() => {
      const valueInLocalStorage = window?.localStorage?.getItem(key)

      if (valueInLocalStorage) {
        return deserialize(valueInLocalStorage)
      }

    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = useRef(key)

  useEffect(() => {
    const prevKey = prevKeyRef.current

    if (prevKey !== key) {
        window?.localStorage?.removeItem(prevKey)
      }
      prevKeyRef.current = key
      window?.localStorage?.setItem(key, serialize(state))
  }, [key, serialize, state])
  
  return [state, setState]
}

export { useLocalStorage}




// import { useCallback, useEffect, useRef, useState } from 'react'

// const useLocalStorage = (
//   key: string,
//   defaultValue: null | number | string | boolean | object | Array<string | number | object>,
//   { serialize = JSON.stringify, deserialize = JSON.parse } = {}
// ) => {
//   const [state, setState] = useState(null)

//   useCallback(() => {
//     const valueInLocalStorage = window?.localStorage?.getItem(key)

//     if (valueInLocalStorage) {
//       return deserialize(valueInLocalStorage)
//     }

//   return typeof defaultValue === 'function' ? defaultValue() : defaultValue
//   }, [defaultValue])

//   const prevKeyRef = useRef(key)

//   useEffect(() => {
//     const prevKey = prevKeyRef.current

//     if (prevKey !== key) {
//         window?.localStorage?.removeItem(prevKey)
//       }
//       prevKeyRef.current = key
//       window?.localStorage?.setItem(key, serialize(state))
//   }, [key, serialize, state])
  
//   return [state, setState]
// }

// export { useLocalStorage}
