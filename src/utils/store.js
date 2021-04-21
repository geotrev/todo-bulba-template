import get from "lodash-es/get"
import cloneDeep from "lodash-es/cloneDeep"

const ASYNC_FN_NAME = "AsyncFunction"
const Stores = {}
let idValue = 0

const createId = () => idValue + 1

const createState = (id, initialState = {}) => {
  Stores[id].state = initialState
}

const createSubscribers = (id) => {
  Stores[id].subscribers = []
}

const getState = (id) => {
  return cloneDeep(Stores[id].state)
}

const setState = (id, nextState = {}) => {
  Stores[id].state = { ...getState(id), ...nextState }
}

const getPropName = (path) => {
  const parts = path.split(".")
  return parts[parts.length - 1]
}

const updateSubscriber = (id, subscriber, properties) => {
  properties.forEach((path) => {
    subscriber[getPropName(path)] = get(getState(id), path)
  })
}

const updateSubscribers = (id, nextState) => {
  if (!nextState) return

  setState(id, nextState)

  Stores[id].subscribers.forEach(([subscriber, properties]) => {
    updateSubscriber(id, subscriber, properties)
  })
}

export const createStore = (initialState, reducer) => {
  const id = createId()

  Stores[id] = {}

  createState(id, initialState)
  createSubscribers(id)

  return {
    dispatch: async (type, payload) => {
      const nextState =
        reducer.constructor.name === ASYNC_FN_NAME
          ? await reducer(type, getState(id), payload)
          : reducer(type, getState(id), payload)

      updateSubscribers(id, nextState)
    },
    subscribe(subscriber, subscribedProperties = []) {
      if (
        !subscriber ||
        !Array.isArray(subscribedProperties) ||
        !subscribedProperties.length
      ) {
        return
      }

      updateSubscriber(id, subscriber, subscribedProperties)
      Stores[id].subscribers.push([subscriber, subscribedProperties])
    },
  }
}
