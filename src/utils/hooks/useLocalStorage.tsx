import { useState } from 'react'

type SetValue<T> = (value: T) => void

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, SetValue<T>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue: SetValue<T> = (value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      setStoredValue(value)
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}
