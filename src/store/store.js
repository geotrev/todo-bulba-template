import { createStore } from "core-flux/lib/core-flux.es.js"
import { reducer } from "./reducer"
import updaters from "./updaters"

const { subscriptionAdded, stateUpdated } = updaters

const state = {
  todos: [{ id: "foo-bar", draft: true }],
}

const { dispatch, subscribe } = createStore(
  state,
  reducer,
  subscriptionAdded,
  stateUpdated
)

export { dispatch, subscribe }
