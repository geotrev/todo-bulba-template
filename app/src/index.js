import { UpgradedElement, register } from "upgraded-element"
import "./todo-store"
import "./theme.js"

import "./todo-header"
import "./todo-body"
import "./todo-footer"

import styles from "./styles.scss"

// define the app

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
