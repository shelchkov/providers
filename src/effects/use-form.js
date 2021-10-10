import { useState, useCallback } from "react"

import { useRefData } from "./use-ref-data"
import { isEqual, noop } from "../utils/utils"

export const useForm = (initialValues, validators) => {
  const { updateData, getData } = useRefData(initialValues)
  const [formErrors, setFormErrors] = useState({})

  const fields = Object.keys(initialValues)

  const setForm = (field, data) => {
    const value = data.replace(/\D/g, "")

    if (getData(field) !== value) {
      updateData({ [field]: value })
    }
  }

  const validate = () => {
    const newErrors = {}

    fields.forEach((field) => {
      const error = (validators[field] || noop)(getData(field))

      if (error) {
        newErrors[field] = error
      }
    })

    if (!isEqual(newErrors, formErrors)) {
      setFormErrors(newErrors)
    }

    if (Object.values(newErrors).length > 0) {
      return newErrors
    }
  }

  const resetError = useCallback(
    (field) => {
      const newErrors = { ...formErrors, [field]: "" }

      if (!isEqual(newErrors, formErrors)) {
        setFormErrors(newErrors)
      }
    },
    [formErrors, setFormErrors]
  )

  return { formErrors, setForm, resetError, validate, getData }
}
