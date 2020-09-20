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
  margin-bottom: 1rem;
`

const InputContainer = styled.div`
  margin-top: ${(p) => p.marginTop || "1.1rem"};
  margin-bottom: ${(p) => p.marginBottom || "0"};
`

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
    console.log("Form")
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

      // eslint-disable-next-line
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

    const handleEnterPress = (event) => {
      if (event.keyCode === 13 && !checkForm()) {
        handleFormSubmit()
      }
    }

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

        <StyledForm>
          <InputContainer>
            <Input
              label="Phone Number"
              setInput={setPhoneValue}
              error={formErrors.phone}
              mask="+7 (999) 999-99-99"
              onFocus={handlePhoneFocus}
              onKeyDown={handleEnterPress}
              inputMode="tel"
            />
          </InputContainer>
          <InputContainer marginBottom=".25rem" marginTop="1.65rem">
            <Input
              label="Amount"
              setInput={setAmountValue}
              error={formErrors.amount}
              mask="Rub 999"
              onFocus={handleAmountFocus}
              onKeyDown={handleEnterPress}
              inputMode="decimal"
            />
          </InputContainer>
        </StyledForm>

        {buttonState.type === "check" ? (
          <NotAllowedBtn
            onMouseOver={checkForm}
            onFocus={checkForm}
            title="Please Provide Correct Information"
            onKeyDown={handleEnterPress}
          >
            {buttonState.text}
          </NotAllowedBtn>
        ) : (
          <ActiveBtn
            onClick={handleFormSubmit}
            onMouseOver={checkForm}
            onFocus={checkForm}
            backgroundColor={buttonState.bgColor}
            color={buttonState.color}
          >
            {buttonState.text}
          </ActiveBtn>
        )}

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
