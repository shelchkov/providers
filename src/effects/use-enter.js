import { useEffect } from "react"

export const useEnter = (handler) => {
  const handleEnterPress = (event) => {
    if (event.keyCode !== 13) {
      return
    }

    handler()
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEnterPress)

    return () => document.removeEventListener("keydown", handleEnterPress)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
