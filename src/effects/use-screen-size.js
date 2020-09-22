import { useState, useEffect } from "react"

export const useScreenSize = () => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight)

  useEffect(() => {
    const resizeHandler = (event) => {
      setScreenHeight(event.currentTarget.innerHeight)
    }

    window.onresize = resizeHandler

    return () => {
      window.removeEventListener("onresize", resizeHandler)
    }
    // eslint-disable-next-line
  }, [])

  return { screenHeight }
}
