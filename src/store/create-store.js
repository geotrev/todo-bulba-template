import { createStore } from "../utils"
import { reducer } from "./reducer"

const initialState = {
  todos: [{ id: "foo-bar", draft: true }],
}

createStore(initialState, reducer)
