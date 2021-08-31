export const BUTTON_ERROR = "error"
export const BUTTON_SUCCESS = "success"
export const BUTTON_SUBMIT = "submit"
export const BUTTON_CHECK = "check"
export const BUTTON_WAIT = "wait"

export const buttonStates = {
  [BUTTON_ERROR]: { text: "Error", bgColor: "#C52423", color: "#F0F4F3" },
  [BUTTON_SUCCESS]: {
    text: "Success",
    bgColor: "#148653",
    color: "#F0F4F3",
  },
  [BUTTON_SUBMIT]: {
    text: "Submit",
    bgColor: "#58AF9B",
    color: "#F0F4F3",
  },
  [BUTTON_CHECK]: {
    text: "Check Info!",
    bgColor: "#F2990F",
    color: "#F0F4F3",
  },
  [BUTTON_WAIT]: {
    text: "Please Wait",
    bgColor: "#58AF9B",
    color: "#F0F4F3",
  },
}
