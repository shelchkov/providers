import React, { useCallback } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { withRouter } from "react-router-dom"

import { FormContainer } from "../FormContainer/FormContainer"
import { ErrorP } from "./ErrorP"
import { Input } from "../Input/Input"
import { FormImage } from "./FormImage"
import { GetBackBtn } from "../Button/Button"

import { validatePhone, validateAmount } from "../../utils/utils"
import { useScreenSize } from "../../effects/use-screen-size"
import { useForm } from "../../effects/use-form"
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
import { useEnter } from "../../effects/use-enter"
import { useProviderId } from "../../effects/use-provider-id"

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
    history,
    setProvider,
    validationSuccess,
    validationFail,
    canSubmit,
    error,
  }) => {
    const { screenHeight } = useScreenSize()
    const { formErrors, setForm, resetError, validate, getData } = useForm(
      { phone: "", amount: "" },
      { phone: validatePhone, amount: validateAmount }
    )

    useEnter(handleEnterPress)
    useProviderId(provider, setProvider, history)

    const checkForm = () => {
      if (!canSubmit) {
        return
      }

      const newErrors = validate()

      if (newErrors) {
        validationFail()

        return newErrors
      }

      validationSuccess()

      return null
    }

    const checkFormAndSubmit = (event) => {
      event.preventDefault()
      !checkForm() && handleFormSubmit()
    }

    function handleEnterPress(event) {
      for (const el of event.path) {
        if (el.nodeName === buttonNodeName && el.onclick) {
          return
        }

        if (el.nodeName === formNodeName) {
          break
        }
      }

      !checkForm() && handleFormSubmit()
    }

    const handleFormSubmit = () => {
      if (!canSubmit) {
        return
      }

      submitForm(getData())
    }

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
  setProvider: (id) => dispatch(setProvider(id)),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Form)
