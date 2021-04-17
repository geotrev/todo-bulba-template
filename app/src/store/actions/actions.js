import { v4 as uid } from "uuid"

// dispatch(this, actionTypes.ADD_TODO)
export const addTodo = (state) => {
  const { todos } = state

  // if already writing a draft, don't create a new todo
  if (todos[0] && todos[0].draft) return

  todos.unshift({ id: uid(), value: "", draft: true })
  return { todos }
}

// dispatch(this, actionTypes.EDIT_TODO, {
//   id: event.target.parentElement.id,
//   value: event.target.parentElement.querySelector('todo-input').value
// })
export const saveTodo = (state, payload) => {
  const { todos } = state
  const index = todos.findIndex((todo) => todo.id === payload.id)

  // if its the first todo, check if it was a
  // draft and unset the flag
  if (index === 0 && todos[0].draft) delete todos[0].draft

  todos[index].value = payload.value
  return { todos }
}

// dispatch(this, actionTypes.DELETE_TODO, {
//   id: event.target.parentElement.id
// })
export const deleteTodo = (state, payload) => {
  const { todos } = state
  const index = todos.findIndex((item) => item.id === payload.id)

  if (index === -1) {
    // eslint-disable-next-line no-console
    return console.error(`[TODO]: Couldn't find todo with id ${payload.id}.`)
  }

  todos.splice(index, 1)
  return { todos }
}
