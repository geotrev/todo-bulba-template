import { v4 as uid } from "uuid"
import * as actions from "./actions"
import { getRandomizedPlaceholder } from "../generate-placeholder"

export function reducer(state, { type, payload }) {
  const { todos } = state

  switch (type) {
    case actions.ADD_TODO: {
      const activeTodo = todos[0]
      if (activeTodo && activeTodo.draft) return

      todos.unshift({
        id: uid(),
        value: "",
        placeholder: getRandomizedPlaceholder(),
        draft: true,
      })
      return { todos }
    }
    case actions.SAVE_TODO: {
      const index = todos.findIndex((todo) => todo.id === payload.id)

      if (index === -1) {
        // eslint-disable-next-line no-console
        console.error(`[TODO]: Couldn't find todo with id '${payload.id}'.`)
        return state
      }

      const activeTodo = todos[0]

      if (index === 0 && activeTodo.draft) delete activeTodo.draft

      todos[index].value = payload.value
      return { todos }
    }
    case actions.DELETE_TODO: {
      const index = todos.findIndex((item) => item.id === payload.id)

      if (index === -1) {
        // eslint-disable-next-line no-console
        console.error(`[TODO]: Couldn't find todo with id '${payload.id}'.`)
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
