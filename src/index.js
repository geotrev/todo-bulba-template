import { RotomElement, register } from "rotom"
import "./components/todo-header"
import "./components/todo-body"
import "./components/todo-footer"
import "./theme"

import styles from "./styles.scss"

// define the app

class TodoApp extends RotomElement {
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
