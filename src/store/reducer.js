import { v4 as uid } from "uuid"
import * as actionTypes from "./action-types"

export const reducer = (type, state, payload) => {
  const { todos } = state

  switch (type) {
    case actionTypes.ADD_TODO: {
      const activeTodo = todos[0]
      if (activeTodo && activeTodo.draft) return

      todos.unshift({ id: uid(), value: "", draft: true })
      return { todos }
    }
    case actionTypes.SAVE_TODO: {
      const index = todos.findIndex((todo) => todo.id === payload.id)

      if (index === -1) {
        // eslint-disable-next-line no-console
        console.error(`[TODO]: Couldn't find todo with id ${payload.id}.`)
        return state
      }

      const activeTodo = todos[0]

      if (index === 0 && activeTodo.draft) delete activeTodo.draft

      todos[index].value = payload.value
      return { todos }
    }
    case actionTypes.DELETE_TODO: {
      const index = todos.findIndex((item) => item.id === payload.id)

      if (index === -1) {
        // eslint-disable-next-line no-console
        console.error(`[TODO]: Couldn't find todo with id ${payload.id}.`)
        return state
      }

      todos.splice(index, 1)
      return { todos }
    }
    default: {
      return state
    }
  }
}
