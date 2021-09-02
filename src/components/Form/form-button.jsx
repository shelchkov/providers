import React from "react"
import { createStructuredSelector } from "reselect"
import {
  selectButtonType,
  selectIsValid,
} from "../../redux/form/form.selectors"
import { connect } from "react-redux"
import { ActiveBtn, NotAllowedBtn } from "../Button/Button"
import { buttonStates } from "../../utils/button-states"

const FormButtonView = ({ checkForm, isValid, buttonType }) => {
  const { bgColor, color, text } =
    buttonStates[buttonType] || buttonStates.BUTTON_SUBMIT

  return (
    <>
      {isValid ? (
        <ActiveBtn
          onMouseOver={checkForm}
          onFocus={checkForm}
          backgroundColor={bgColor}
          color={color}
          type="submit"
        >
          {text}
        </ActiveBtn>
      ) : (
        <NotAllowedBtn
          onMouseOver={checkForm}
          onFocus={checkForm}
          title="Please Provide Correct Information"
        >
          {text}
        </NotAllowedBtn>
      )}
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  isValid: selectIsValid,
  buttonType: selectButtonType,
})

export const FormButton = connect(mapStateToProps)(FormButtonView)
