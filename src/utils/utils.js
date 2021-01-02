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

  return
}

export const validateAmount = (amount) => {
  if (!amount || amount < 1) {
    return "You can choose amount that lies between 1 and 1000 rubles"
  }

  return
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

const getRandomNumber = (start, end) =>
  Math.random() * ( end - start ) + start

export const sendRequest = (provider, formData) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve({
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
      } else {
        reject({ message: "Something went wrong" })
      }
    }, getRandomNumber(900, 2000))
  })
