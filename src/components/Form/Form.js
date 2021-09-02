import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { withRouter } from "react-router-dom"

import { FormContainer } from "../FormContainer/FormContainer"
import { ErrorP } from "./ErrorP"
import { Input } from "../Input/Input"
import { FormImage } from "./FormImage"
import { GetBackBtn } from "../Button/Button"

import {
  extractSearchValue,
  validatePhone,
  validateAmount,
  isEqual,
  urlParams,
  getProvider,
} from "../../utils/utils"
import { useScreenSize } from "../../effects/use-screen-size"
import { useRefData } from "../../effects/use-ref-data"
import {
  validationFail,
  validationSuccess,
} from "../../redux/form/form.actions"
import {
  selectCanSubmit,
  selectError,
} from "../../redux/form/form.selectors"
import { FormButton } from "./form-button"
import { compose } from "redux"
import { selectProvider } from "../../redux/providers/providers.selectors"
import { setProvider } from "../../redux/providers/providers.actions"
import { providersList } from "../../utils/providers-list"

const GetBackContainer = styled.div`
  display: flex;
  margin-bottom: 0.25rem;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`

const InputContainer = styled.div`
  margin-top: ${(p) => p.marginTop || "1.1rem"};
  margin-bottom: ${(p) => p.marginBottom || "0"};
`

const buttonNodeName = "BUTTON"
const formNodeName = "FORM"

const getProviderId = (search) => {
  const providerId = extractSearchValue(search, urlParams.provider)

  return parseInt(providerId)
}

// eslint-disable-next-line react/display-name
const Form = React.memo(
  ({
    getHome,
    submitForm,
    provider,
    history,
    setProvider,
    validationSuccess,
    validationFail,
    canSubmit,
    error,
  }) => {
    

    const { updateData, getData } = useRefData({ phone: "", amount: "" })

    const [formErrors, setFormErrors] = useState({
      phone: "",
      amount: "",
    })

    const { screenHeight } = useScreenSize()

    useEffect(() => {
      if (!provider || !Number.isFinite(provider.id)) {
        const { search } = history.location
        const providerId = getProviderId(search)
        const selectedProvider = getProvider(providersList, providerId)

        if (!selectedProvider) {
          history.push("/")
        }

        setProvider(providerId)
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setForm = (field, data) => {
      const value = data.replace(/\D/g, "")

      if (getData(field) !== value) {
        updateData({ [field]: value })
      }
    }

    function checkForm() {
      if (!canSubmit) {
        return
      }

      const phoneError = validatePhone(getData("phone"))
      const amountError = validateAmount(getData("amount"))

      const newErrors = {
        phone: phoneError,
        amount: amountError,
      }

      if (!isEqual(newErrors, formErrors)) {
        setFormErrors(newErrors)
      }

      if (!phoneError && !amountError) {
        validationSuccess()
      } else {
        validationFail()
      }

      return phoneError || amountError
        ? {
            phone: phoneError,
            amount: amountError,
          }
        : null
    }

    const checkFormAndSubmit = (event) => {
      event.preventDefault()
      !checkForm() && handleFormSubmit()
    }

    const handleEnterPress = (event) => {
      if (event.keyCode !== 13) {
        return
      }

      for (const el of event.path) {
        if (el.nodeName === buttonNodeName && el.onclick) {
          return
        }

        if (el.nodeName === formNodeName) {
          break
        }
      }

      if (!checkForm()) {
        handleFormSubmit()
      }
    }

    useEffect(() => {
      document.addEventListener("keydown", handleEnterPress)

      return () => {
        document.removeEventListener("keydown", handleEnterPress)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFormSubmit = () => {
      if (!canSubmit) {
        return
      }

      submitForm(getData())
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

    const handlePhoneFocus = useCallback(() => {
      resetError("phone")
    }, [resetError])

    const handleAmountFocus = useCallback(() => {
      resetError("amount")
    }, [resetError])

    const setPhoneValue = (data) => setForm("phone", data)
    const setAmountValue = (data) => setForm("amount", data)

    if (!provider) {
      return <></>
    }

    return (
      <FormContainer>
        {screenHeight > 321 && (
          <FormImage logo={provider.logo} name={provider.name} />
        )}

        <GetBackContainer>
          <GetBackBtn onClick={getHome}>Get Back</GetBackBtn>
        </GetBackContainer>

        <StyledForm onSubmit={checkFormAndSubmit}>
          <InputContainer>
            <Input
              label="Phone Number"
              setInput={setPhoneValue}
              error={formErrors.phone}
              mask="+7 (999) 999-99-99"
              onFocus={handlePhoneFocus}
              inputMode="tel"
            />
          </InputContainer>
          <InputContainer marginBottom="1.25rem" marginTop="1.65rem">
            <Input
              label="Amount"
              setInput={setAmountValue}
              error={formErrors.amount}
              mask="Rub 999"
              onFocus={handleAmountFocus}
              inputMode="decimal"
            />
          </InputContainer>

          <FormButton checkForm={checkForm} />
        </StyledForm>

        {error && <ErrorP errorMessage={error} />}
      </FormContainer>
    )
  }
)

const mapStateToProps = createStructuredSelector({
  canSubmit: selectCanSubmit,
  error: selectError,
  provider: selectProvider,
})

const mapDispatchToProps = (dispatch) => ({
  validationFail: () => dispatch(validationFail()),
  validationSuccess: () => dispatch(validationSuccess()),
  setProvider: (id) => dispatch(setProvider(id))
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Form)
