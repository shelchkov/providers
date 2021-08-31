import { getRandomNumber } from "./utils"

const generateSuccessResponse = (provider, formData) => ({
  result: "success",
  data: {
    some: "Information",
    other: "Information",
    provider: { name: provider.name },
  },
  user: {
    phone: formData.phone,
    amount: formData.amount,
  },
})

const sendRequest = (provider, formData) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve(generateSuccessResponse(provider, formData))
      } else {
        reject({ message: "Something went wrong" })
      }
    }, getRandomNumber(900, 2000))
  })

export const requestInfo = async (formData, selectedProvider) =>
  sendRequest(selectedProvider, formData)
