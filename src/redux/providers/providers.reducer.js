import { providersActionTypes } from "./providers.types"
import { getProvider } from "../../utils/utils"
import { providersList } from "../../utils/providers-list"

const initialState = {
  selectedProvider: undefined,
}

export const providersReducer = (state = initialState, action) => {
  switch (action.type) {
    case providersActionTypes.SELECT_PROVIDER:
      return {
        ...state,
        selectedProvider: getProvider(
          providersList,
          action.payload.providerId
        ),
      }

    default:
      return state
  }
}
