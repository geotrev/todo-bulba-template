let state = {
  todos: [],
}

window.appState = state

export const setState = (nextState = {}) => {
  state = { ...state, ...nextState }
}
export const getState = () => {
  return { ...state }
}

export const create = (actions = []) => {
  for (const action of actions) {
    document.addEventListener(action.type, action.dispatch)
  }
}
