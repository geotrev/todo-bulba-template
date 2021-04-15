import { UpgradedElement, register } from "upgraded-element"
import styles from "./styles.scss"

class TodoFooter extends UpgradedElement {
  static get styles() {
    return styles
  }

  render() {
    return `
      <footer class="todo-footer">
        <p>Created by George Treviranus</p>
      </footer>
    `
  }
}

register("todo-footer", TodoFooter)
