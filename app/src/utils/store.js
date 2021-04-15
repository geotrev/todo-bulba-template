let state = {
  todos: [],
}

export const setState = (nextState = {}) => {
  state = { ...state, ...nextState }
}
export const getState = () => {
  return { ...state }
}

export const createStore = (actions = []) => {
  for (const action of actions) {
    document.documentElement.addEventListener(action.type, action.dispatch)
  }
}
