import { providersActionTypes } from "./providers.types"

export const setProvider = (id) => ({
  type: providersActionTypes.SELECT_PROVIDER,
  payload: { providerId: id },
})
