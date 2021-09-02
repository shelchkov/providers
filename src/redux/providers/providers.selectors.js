import { createSelector } from "reselect"

const selectProviders = (state) => state.providers

export const selectProvider = createSelector(
  [selectProviders],
  (providers) => providers.selectedProvider
)
