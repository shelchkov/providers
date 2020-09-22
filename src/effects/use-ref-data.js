import { useRef } from "react"

export const useRefData = (initialValue) => {
  const data = useRef(initialValue || {})

  const updateData = (newData) => {
    if (data && data.current) {
      data.current = { ...data.current, ...newData }
    }
  }

  const getData = (property) => {
    if (!data || !data.current) {
      return
    }

    if (!property) {
      return data.current
    }

    if (data.current[property]) {
      return data.current[property]
    }

    return
  }

  return { updateData, getData }
}
