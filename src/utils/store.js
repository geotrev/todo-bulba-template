import get from "lodash-es/get"
import cloneDeep from "lodash-es/cloneDeep"
import uniqueId from "lodash-es/uniqueId"

const ASYNC_FN_NAME = "AsyncFunction"
const Stores = {}

const createState = (id, initialState = {}) => {
  Stores[id].state = initialState
}

const createSubscriptions = (id) => {
  Stores[id].subscriptions = [] 
}

export const getState = (id) => {
  return cloneDeep(Stores[id].state)
}

export const setState = (id, nextState = {}) => {
  Stores[id].state = { ...getState(id), ...nextState }
}

const getPropName = (path) => {
  const parts = path.split(".")
  return parts[parts.length - 1]
}

const hydrateElement = (id, element, properties) => {
  properties.forEach((path) => {
    element[getPropName(path)] = get(getState(id), path)
  })
}

const updateSubscribers = (id, nextState) => {
  if (!nextState) return

  setState(id, nextState)

  Stores[id].subscriptions.forEach(([element, properties]) => {
    hydrateElement(id, element, properties)
  })
}

const createDispatch = async (id) => {
  return (type, payload) => {
    const nextState =
      reducer.constructor.name === ASYNC_FN_NAME
        ? await reducer(type, getState(id), payload)
        : reducer(type, getState(id), payload)

    updateSubscribers(id, nextState)
  }
}

export const createStore = (initialState, reducer) => {
  const id = uniqueId('store__')
  
  Stores[id] = {}
  
  createState(id, initialState)
  createSubscriptions(id)
  
  const dispatch = createDispatch(id)

  return {
    subscribe(element, subscribedProperties = []) {
      if (
        !element ||
        !Array.isArray(subscribedProperties) ||
        !subscribedProperties.length
      ) {
        return
      }

      hydrateElement(id, element, subscribedProperties)
      Stores[id].subscriptions.push([element, subscribedProperties])
    },
    dispatch(type, payload) {
      return dispatch(type, payload)
    }
  }
}
