import { store } from "../utils"
import * as actionTypes from "./action-types"
import * as actions from "./actions"

const initialState = {
  todos: [{ id: "foo-bar", draft: true }],
}

store.create(initialState, [
  {
    type: actionTypes.ADD_TODO,
    dispatch: actions.addTodo,
  },
  {
    type: actionTypes.SAVE_TODO,
    dispatch: actions.saveTodo,
  },
  {
    type: actionTypes.DELETE_TODO,
    dispatch: actions.deleteTodo,
  },
])
