import React, { useState, useEffect } from "react"
import "./Form.css"
import FormContainer from "../FormContainer/FormContainer"
import { connect } from "react-redux"
import { selectBtnState } from "../../redux/button/button.selectors"
import { createStructuredSelector } from "reselect"
import { setButtonType } from "../../redux/button/button.actions"
import ErrorP from "./ErrorP"
import styled from "styled-components"
import { withRouter } from "react-router-dom"

import { Input } from "../Input/Input"

import { buttonStates } from "../../utils/button-states"

const Button = styled.button`
  outline: none;
  opacity: 0.9;
`

const ActiveBtn = styled(Button)`
  &:hover,
  &:focus {
    transform: scale(0.96);
    opacity: 1;
    transition: transform 0.12s ease-out, opacity 0.12s ease-out;
    box-shadow: 0px 0px 38px -5px rgba(204, 204, 204, 0.46);
  }
`

const NotAllowedBtn = styled(Button)`
  cursor: not-allowed;
  color: #777;
`

const GetBackBtn = styled(ActiveBtn)`
  color: #333;
  border-color: #ccc;
`

const extractSearchValue = (search, name) => {
  if (!search) {
    return
  }

  const value = search
    .replace("?", "")
    .split("&")
    .map((pair) => pair.split("="))
    .find((key) => key[0] === name)

  return value && value[1]
}

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

    const [screenHeight, setScreenHeight] = useState(window.innerHeight)

    useEffect(() => {
      const resizeHandler = (event) => {
        setScreenHeight(event.target.innerHeight)
      }

      window.onresize = resizeHandler

      if (!provider.id) {
        const search = history.location.search
        const selectedProviderId = extractSearchValue(search, "provider")

        if (selectedProviderId) {
          setProvider(parseInt(selectedProviderId))
        }
      }

      return () => {
        window.removeEventListener("onresize", resizeHandler)
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
      if (buttonState.text === "Please Wait") {
        return
      }

      let phoneError = ""
      let amountError = ""
      let btnState = "check"

      // Phone Validation
      if (formData.phone.length === 0) {
        phoneError = "You need to type in your phone number"
      } else if (formData.phone[1] !== "9") {
        phoneError = "Please provide correct number"
      } else if (formData.phone.length !== 11) {
        phoneError = "Phone number should contain exactly 11 digits"
      } else {
        btnState = "submit"
      }

      // Amount Validation
      if (formData.amount < 1) {
        amountError =
          "You can choose amount that lies between 1 and 1000 rubles"
        btnState = "check"
      }

      setFormErrors({
        phone: phoneError,
        amount: amountError,
      })

      if (buttonState !== buttonStates[btnState]) {
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

    return (
      <>
        {screenHeight > 321 && (
          <div className="mt2 mb3 ml3 mr3">
            <img
              src={provider.logo}
              alt={provider.name}
              title={provider.name}
              className="logo"
            />
          </div>
        )}

        <div className="mb1">
          <div className="flex items-start">
            <GetBackBtn
              onClick={getHome}
              className="br3 ba ph3 pv2 mb2 pointer bg-transparent"
            >
              Get Back
            </GetBackBtn>
          </div>
        </div>

        <form className="flex flex-column mb3">
          <div style={{ marginTop: "1.1rem" }}>
            <Input
              label="Phone Number"
              setInput={(data) => setForm("phone", data)}
              error={formErrors.phone}
              mask="+7 (999) 999-99-99"
              onFocus={handlePhoneFocus}
              onKeyDown={handleEnterPress}
              inputMode="tel"
            />
          </div>
          <div className="mb1" style={{ marginTop: "1.65rem" }}>
            <Input
              label="Amount"
              setInput={(data) => setForm("amount", data)}
              error={formErrors.amount}
              mask="Rub 999"
              onFocus={handleAmountFocus}
              onKeyDown={handleEnterPress}
              inputMode="decimal"
            />
          </div>
        </form>
        {buttonState.text === "Check Info!" ? (
          <NotAllowedBtn
            onMouseOver={checkForm}
            onFocus={checkForm}
            title="Please Provide Correct Information"
            className="br3 ba ph3 pv2 mb2 center"
            onKeyDown={handleEnterPress}
          >
            {buttonState.text}
          </NotAllowedBtn>
        ) : (
          <ActiveBtn
            onClick={handleFormSubmit}
            onMouseOver={checkForm}
            onFocus={checkForm}
            className="br3 ba ph3 pv2 mb2 pointer center"
            style={{
              background: buttonState.bgColor,
              color: buttonState.color,
            }}
          >
            {buttonState.text}
          </ActiveBtn>
        )}
        {errorMessage.length > 0 && buttonState.text === "Error" ? (
          <ErrorP errorMessage={errorMessage} />
        ) : null}
      </>
    )
  }
)

// Receive state elements for that element
const mapStateToProps = createStructuredSelector({
  buttonState: selectBtnState,
})

// Set State
const mapDispatchToProps = (dispatch) => ({
  setButtonState: (button) => dispatch(setButtonType(button)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FormContainer(Form))
)
