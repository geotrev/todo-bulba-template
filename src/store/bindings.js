import get from "lodash-es/get"
import forEach from "lodash-es/forEach"

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

  setState(nextState)

  forEach(subscriptions, function (subscription) {
    bindSubscriber(subscription, nextState)
  })
}

export default {
  bindSubscriber,
  bindState,
}
