import { useEffect, useRef, useState } from 'react'

export const useDebounce = (value: string | number, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState('')
  const timerRef = useRef()

  useEffect(() => {
    // @ts-ignore
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay)

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [value, delay])

  return debouncedValue
}
