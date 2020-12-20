import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { withRouter } from "react-router-dom"

import FormContainer from "../FormContainer/FormContainer"
import { ErrorP } from "./ErrorP"
import { Input } from "../Input/Input"
import { FormImage } from "./FormImage"
import { ActiveBtn, NotAllowedBtn, GetBackBtn } from "../Button/Button"

import { selectBtnState } from "../../redux/button/button.selectors"
import { setButtonType } from "../../redux/button/button.actions"
import {
  extractSearchValue,
  validatePhone,
  validateAmount,
  isEqual,
} from "../../utils/utils"
import { useScreenSize } from "../../effects/use-screen-size"
import { useRefData } from "../../effects/use-ref-data"

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

// eslint-disable-next-line react/display-name
const Form = React.memo(
  ({
    getHome,
    submitForm,
    provider,
    errorMessage,
    buttonState,
    setButtonState,
    history,
    setProvider,
  }) => {
    const { updateData, getData } = useRefData({ phone: "", amount: "" })

    const [formErrors, setFormErrors] = useState({
      phone: "",
      amount: "",
    })

    const { screenHeight } = useScreenSize()

    useEffect(() => {
      if (!provider || !provider.id) {
        const search = history.location.search
        const selectedProviderId = extractSearchValue(search, "provider")

        if (selectedProviderId) {
          setProvider(parseInt(selectedProviderId))
        }
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
      if (buttonState.type === "wait") {
        return
      }

      const phoneError = validatePhone(getData("phone"))
      const amountError = validateAmount(getData("amount"))
      const btnState = !phoneError && !amountError ? "submit" : "check"

      const newErrors = {
        phone: phoneError,
        amount: amountError,
      }

      if (!isEqual(newErrors, formErrors)) {
        setFormErrors(newErrors)
      }

      if (buttonState.type !== btnState) {
        setButtonState(btnState)
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

    return (
      <>
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

          {buttonState.type === "check" ? (
            <NotAllowedBtn
              onMouseOver={checkForm}
              onFocus={checkForm}
              title="Please Provide Correct Information"
            >
              {buttonState.text}
            </NotAllowedBtn>
          ) : (
            <ActiveBtn
              onMouseOver={checkForm}
              onFocus={checkForm}
              backgroundColor={buttonState.bgColor}
              color={buttonState.color}
              type="submit"
            >
              {buttonState.text}
            </ActiveBtn>
          )}
        </StyledForm>

        {errorMessage.length > 0 && buttonState.type === "error" ? (
          <ErrorP errorMessage={errorMessage} />
        ) : null}
      </>
    )
  }
)

const mapStateToProps = createStructuredSelector({
  buttonState: selectBtnState,
})

const mapDispatchToProps = (dispatch) => ({
  setButtonState: (button) => dispatch(setButtonType(button)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FormContainer(Form))
)
