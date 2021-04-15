let state = {
  todos: [],
}

export const setState = (nextState = {}) => {
  state = { ...state, ...nextState }
}
export const getState = () => {
  return { ...state }
}

export const create = (actions = []) => {
  for (const action of actions) {
    document.documentElement.addEventListener(action.type, action.dispatch)
  }
}
