import cloneDeep from "lodash/cloneDeep"
import { actionTypes, dispatch } from "./actions"

let state = {}

export const getState = () => {
  return cloneDeep(state)
}

export const setState = (nextState = {}) => {
  state = { ...getState(), ...nextState }
}

const subscriptions = []

export const subscribe = (element, cb) => {
  if (!element || !cb) return

  element.addEventListener(actionTypes.STORE_UPDATED, (event) => {
    cb(event.detail)
  })
  subscriptions.push(element)
}

const updateSubscribers = (nextState) => {
  if (typeof nextState === "undefined") return

  setState(nextState)

  subscriptions.forEach((subscriber) => {
    dispatch(subscriber, actionTypes.STORE_UPDATED, getState())
  })
}

export const create = (defaultState, actions = []) => {
  state = defaultState

  for (const action of actions) {
    document.addEventListener(action.type, async (event) => {
      const nextState = await action.dispatch(getState(), event.detail)

      updateSubscribers(nextState)
    })
  }
}
