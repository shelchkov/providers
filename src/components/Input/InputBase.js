import React, { useState } from "react"
import InputMask from "react-input-mask"
import "./Input.css"

export const InputBase = ({ setInput, error, mask, ...other }) => {
  const [hasContent, setHasContent] = useState(false)

  const handleChange = (event) => {
    const value = event.currentTarget.value
    setHasContent(value.length > 0)
    setInput(value)
  }

  const className = `${hasContent ? "has-content" : ""}${
    error ? " error" : ""
  }`

  return (
    <InputMask
      mask={mask}
      onChange={handleChange}
      className={className}
      {...other}
    />
  )
}
