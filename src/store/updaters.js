import get from "lodash-es/get"
import forEach from "lodash/forEach"

/**
 * Derives a new name for a subscriber's property by
 * the inner-most property name of a path.
 * @param {string} path
 * @returns {string}
 */
function getPropName(path) {
  const parts = path.split(".")
  return parts[parts.length - 1]
}

function updateSubscriber([subscriber, paths], state) {
  forEach(paths, function (path) {
    subscriber[getPropName(path)] = get(state, path)
  })
}

/**
 * Updates a given Store's state, then forwards the values
 * to all subscribers of that Store. If the state is falsy,
 * nothing happens.
 * @param {string} id
 * @param {Object} nextState
 */
function stateUpdated(subscriptions, nextState, setState) {
  setState(nextState)

  forEach(subscriptions, function (subscription) {
    updateSubscriber(subscription, nextState)
  })
}

export default {
  subscriptionAdded: updateSubscriber,
  stateUpdated,
}
