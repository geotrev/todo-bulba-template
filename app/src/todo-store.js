import { store } from "./store"
import * as actionTypes from "./todo-action-types"
import * as actions from "./todo-actions"

const initialState = {
  todos: [],
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
