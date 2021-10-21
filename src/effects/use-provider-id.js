import { useEffect } from "react"
import { extractSearchValue, urlParams, getProvider } from "../utils/utils"
import { providersList } from "../utils/providers-list"

const getProviderId = (search) => {
  const providerId = extractSearchValue(search, urlParams.provider)

  return parseInt(providerId)
}

export const useProviderId = (provider, setProvider, history) => {
  useEffect(() => {
    if (!provider || !Number.isFinite(provider.id)) {
      const { search } = history.location
      const providerId = getProviderId(search)
      const selectedProvider = getProvider(providersList, providerId)

      if (!selectedProvider) {
        history.push("/")
      }

      setProvider(providerId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
