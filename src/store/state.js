import { v4 as uid } from "uuid"
import { getRandomizedPlaceholder } from "../generate-placeholder"

const TODO_STATE_KEY = "TOODOO_STATE"

function getTodoState() {
  const state = localStorage.getItem(TODO_STATE_KEY)
  return state ? JSON.parse(state) : null
}

export function setTodoState(state) {
  const cache = getTodoState()
  const nextState = state

  if (cache !== nextState) {
    localStorage.setItem(TODO_STATE_KEY, JSON.stringify(nextState))
  }
}

export const state = getTodoState() || {
  todos: [
    {
      id: uid(),
      placeholder: getRandomizedPlaceholder(),
      value: "",
      draft: true,
    },
  ],
}
