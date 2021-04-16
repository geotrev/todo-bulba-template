import { store } from "../"
import { v4 as createUUID } from "uuid"

const { getState, setState } = store

// dispatch(actionTypes.ADD_TODO)
export const addTodo = () => {
  const { todos } = getState()

  // if already writing a draft, don't create a new todo
  if (todos[0] && todos[0].draft) return

  todos.unshift({ id: createUUID(), value: "", draft: true })
  setState({ todos })
}

// dispatch(actionTypes.EDIT_TODO, {
//   id: event.target.parentElement.dataset.id,
//   value: this.value
// })
export const editTodo = (event) => {
  const { detail } = event
  const { todos } = getState()
  const index = todos.findIndex((todo) => todo.id === detail.id)

  // if its the first todo, check if it was a draft and set to false if so
  if (index === 0 && todos[0].draft) todos[0].draft = false

  todos[index].value = detail.value
  setState({ todos })
}

// dispatch(actionTypes.DELETE_TODO, {
//   id: event.target.parentElement.dataset.id
// })
export const deleteTodo = (event) => {
  const { detail } = event
  const { todos } = getState()
  const index = todos.findIndex((item) => item.id === detail.id)

  if (index === -1) {
    // eslint-disable-next-line no-console
    return console.error(`[TODO]: Couldn't find todo with id ${detail.id}.`)
  }

  todos.splice(index, 1)
  setState({ todos })
}
