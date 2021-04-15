import { createStore } from "./store"
import { actionTypes } from "./action-types"
import { actions } from "./actions"

createStore([
  {
    type: actionTypes.ADD_TODO,
    dispatch: actions.addTodo,
  },
  {
    type: actionTypes.EDIT_TODO,
    dispatch: actions.editTodo,
  },
  {
    type: actionTypes.DELETE_TODO,
    dispatch: actions.deleteTodo,
  },
])
