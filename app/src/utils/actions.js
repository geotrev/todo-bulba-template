import { getState, setState } from "./store"
import { v1 as createUUID } from "uuid"

export const addTodo = () => {
  const { todos } = getState()
  todos.push({ id: createUUID(), value: "" })
  setState({ todos })
}

export const editTodo = (event) => {
  const { detail } = event
  const { todos } = getState()
  const length = todos.length

  for (let i = 0; i < length; i++) {
    if (todos[i].id !== detail.id) continue
    todos[i].value = detail.value
    break
  }

  setState({ todos })
}

export const deleteTodo = (event) => {
  const { detail } = event
  const { todos } = getState()
  const index = todos.findIndex((item) => item.id === detail.id)

  todos.splice(index, 1)
  setState({ todos })
}
