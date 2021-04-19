import get from "lodash/get"
import cloneDeep from "lodash/cloneDeep"

const ASYNC_FN_NAME = "AsyncFunction"
const subscriptions = []
let state = {}

export const getState = () => {
  return cloneDeep(state)
}

export const setState = (nextState = {}) => {
  state = { ...getState(), ...nextState }
}

const getPropName = (path) => {
  const parts = path.split(".")
  return parts[parts.length - 1]
}

const hydrateElement = (element, properties) => {
  properties.forEach((path) => {
    element[getPropName(path)] = get(getState(), path)
  })
}

const updateSubscribers = (nextState) => {
  if (typeof nextState === "undefined") return

  setState(nextState)

  subscriptions.forEach(([element, subscribedProperties]) => {
    hydrateElement(element, subscribedProperties)
  })
}

export const subscribe = (element, subscribedProperties = []) => {
  if (
    !element ||
    !Array.isArray(subscribedProperties) ||
    !subscribedProperties.length
  ) {
    return
  }

  hydrateElement(element, subscribedProperties)
  subscriptions.push([element, subscribedProperties])
}

export const create = (defaultState, actions = []) => {
  state = defaultState

  for (const action of actions) {
    const {type, dispatch} = action
    document.addEventListener(type, async (event) => {
      const nextState = dispatch.constructor.name === ASYNC_FN_NAME
        ? await dispatch(getState(), event.detail)
        : dispatch(getState(), event.detail)

      updateSubscribers(nextState)
    })
  }
}