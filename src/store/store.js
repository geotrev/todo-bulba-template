import { createStore } from "../utils"
import { reducer } from "./reducer"

const initialState = {
  todos: [{ id: "foo-bar", draft: true }],
}

const { dispatch, subscribe } = createStore(initialState, reducer)

export { dispatch, subscribe }
