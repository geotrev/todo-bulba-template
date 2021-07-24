import get from "lodash-es/get"
import forEach from "lodash-es/forEach"
import { setTodoState } from "./state"

function getPropName(path) {
  const parts = path.split(".")
  return parts[parts.length - 1]
}

function bindSubscriber([subscriber, paths], state) {
  forEach(paths, function (path) {
    subscriber[getPropName(path)] = get(state, path)
  })
}

function bindState(subscriptions, nextState, setState) {
  if (!nextState) return

  try {
    forEach(subscriptions, function (subscription) {
      bindSubscriber(subscription, nextState)
    })

    // set to store
    setState(nextState)

    // set to localStorage
    setTodoState(nextState)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error saving new todo state. Error output:")
    throw new Error(err)
  }
}

export default {
  bindSubscriber,
  bindState,
}
