import { store } from "../utils"
import * as actionTypes from "./action-types"
import { reducer } from "./reducer"

const initialState = {
  todos: [{ id: "foo-bar", draft: true }],
}

store.create(initialState, reducer)
