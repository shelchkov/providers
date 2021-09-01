import React from "react"
import { Provider } from "../Provider/Provider"
import { providersList } from "../../utils/providers-list"
import { connect } from "react-redux"
import { resetForm } from "../../redux/form/form.actions"
import { useScreenCover } from "screen-cover"
import { useHistory } from "react-router-dom"
import { getFormUrl } from "../../utils/utils"

const ProvidersListView = ({ setProvider, resetForm }) => {
  const { showCover } = useScreenCover()
  const history = useHistory()

  const goToForm = (providerId) => () => {
    history.push(getFormUrl(providerId))
  }

  const selectProvider = (id) => {
    setProvider(id)
    resetForm()
    showCover(goToForm(id))
  }

  return (
    <div>
      {providersList.map((item) => (
        <Provider
          key={item.id}
          provider={item}
          selectProvider={selectProvider}
        />
      ))}
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  resetForm: () => dispatch(resetForm()),
})

export const ProvidersList = connect(
  undefined,
  mapDispatchToProps
)(ProvidersListView)
