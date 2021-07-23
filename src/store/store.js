import { createStore } from "core-flux"
import { state } from "./state"
import { reducer } from "./reducer"
import bindings from "./bindings"

const { bindSubscriber, bindState } = bindings

const { dispatch, subscribe, __data } = createStore(
  state,
  reducer,
  bindSubscriber,
  bindState
)

window.__store__ = __data

export { dispatch, subscribe }
