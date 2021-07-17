import { v4 as uid } from "uuid"
import { createStore } from "core-flux"
import { reducer } from "./reducer"
import bindings from "./bindings"

const { bindSubscriber, bindState } = bindings

const state = {
  todos: [{ id: uid(), draft: true }],
}

const { dispatch, subscribe, __data } = createStore(
  state,
  reducer,
  bindSubscriber,
  bindState
)

window.__store__ = __data

export { dispatch, subscribe }
