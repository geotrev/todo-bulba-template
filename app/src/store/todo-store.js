import { createStore, actionTypes, actions } from "../utils"

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
