export const extractSearchValue = (search, name) => {
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

export const validatePhone = (phone) => {
  if (!phone || phone.length === 0) {
    return "You need to type in your phone number"
  }

  if (phone[1] !== "9") {
    return "Please provide correct number"
  }

  if (phone.length !== 11) {
    return "Phone number should contain exactly 11 digits"
  }
}

export const validateAmount = (amount) => {
  if (!amount || amount < 1) {
    return "You can choose amount that lies between 1 and 1000 rubles"
  }
}

export const isEqual = (obj1, obj2) =>
  JSON.stringify(obj1) === JSON.stringify(obj2)

export const isAllValuesEmpty = (obj) => {
  for (const value of Object.values(obj)) {
    if (value) {
      return false
    }
  }

  return true
}

export const getRandomNumber = (start, end) =>
  Math.random() * (end - start) + start

export const urlParams = {
  provider: "provider",
}

export const getFormUrl = (providerId) =>
  `form?${urlParams.provider}=${providerId}`

export const getProvider = (providersList, providerId) => {
  if (!Number.isFinite(providerId)) {
    return
  }

  return providersList.find(({ id }) => id === providerId)
}

export const noop = () => undefined
