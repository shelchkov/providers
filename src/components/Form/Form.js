import React, { useState, useEffect } from "react"
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
} from "../../utils/utils"
import { useScreenSize } from "../../effects/use-screen-size"

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
    const [formData, setFormData] = useState({ phone: "", amount: "" })

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
      const amount = data.replace(/\D/g, "")

      if (formData[field] !== amount) {
        setFormData({
          ...formData,
          [field]: amount,
        })
      }
    }

    function checkForm() {
      if (buttonState.type === "wait") {
        return
      }

      const phoneError = validatePhone(formData.phone)
      const amountError = validateAmount(formData.amount)
      const btnState = !phoneError && !amountError ? "submit" : "check"

      setFormErrors({
        phone: phoneError,
        amount: amountError,
      })

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
        submitForm(formData)
      }
    }

    const handleFormSubmit = () => {
      submitForm(formData)
    }

    const handlePhoneFocus = () => {
      setFormErrors({ ...formErrors, phone: "" })
    }

    const handleAmountFocus = () => {
      setFormErrors({ ...formErrors, amount: "" })
    }

    const setPhoneValue = (data) => setForm("phone", data)

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
              setInput={(data) => setForm("amount", data)}
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
