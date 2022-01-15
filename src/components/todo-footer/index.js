import { RotomElement, register } from "rotom"
import styles from "./styles.scss"

class TodoFooter extends RotomElement {
  static get styles() {
    return styles
  }

  render() {
    return `
      <footer class="todo-footer">
        <p>
          <a href="https://github.com/geotrev">
            Created by George Treviranus
          </a>
        </p>
      </footer>
    `
  }
}

register("todo-footer", TodoFooter)
