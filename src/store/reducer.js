import { v4 as uid } from "uuid"

export const reducer = (type, state, payload) => {
  const { todos } = state

  switch (type) {
    case "ADD_TODO": {
      const activeTodo = todos[0]
      if (activeTodo && activeTodo.draft) return

      todos.unshift({ id: uid(), value: "", draft: true })
      return { todos }
    }
    case "SAVE_TODO": {
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
    case "DELETE_TODO": {
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
