import { UpgradedElement, register } from "upgraded-element"
import styles from "./styles.scss"

class TodoBody extends UpgradedElement {
  static get styles() {
    return styles
  }

  render() {
    return `
      <main class="todo-body">
        body content
      </main>
    `
  }
}

register("todo-body", TodoBody)
