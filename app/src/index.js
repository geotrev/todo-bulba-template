import { UpgradedElement, register } from "upgraded-element"
import { createStore } from "./utils/store.js"
import * as actionTypes from "./utils/action-types"
import * as actions from "./utils/actions"

import "./utils/create-theme.js"
import "./todo-header"
import "./todo-body"
import "./todo-footer"

import styles from "./styles.scss"

createStore([
  {
    type: actionTypes.ADD_TODO,
    dispatch: actions.addTodo,
  },
  {
    type: actionTypes.EDIT_TODO,
    dispatch: actions.editTodo,
  },
  {
    type: actionTypes.DELETE_TODO,
    dispatch: actions.deleteTodo,
  },
])

class TodoApp extends UpgradedElement {
  static get styles() {
    return styles
  }

  render() {
    return `
      <div class="wrapper">
        <todo-header></todo-header>
        <todo-body></todo-body>
        <todo-footer></todo-footer>
      </div>
    `
  }
}

register("todo-app", TodoApp)
