import { UpgradedElement, register } from "upgraded-element"
// import "./todo-nav"
// import "./todo-body"
// import "./todo-footer"
import styles from "./styles.scss"

class TodoApp extends UpgradedElement {
  static get styles() {
    return styles
  }

  render() {
    return `
      <div class="wrapper">
        <todo-nav></todo-nav>
        <todo-body></todo-body>
        <todo-footer></todo-footer>
      </div>
    `
  }
}

register("todo-app", TodoApp)
