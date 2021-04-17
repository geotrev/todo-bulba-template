import { store } from "./store"
import { actionTypes, actions } from "./store/actions"

const initialState = {
  todos: [
    {
      id: "foo-bar",
      value: "Make a todo!",
    },
  ],
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
