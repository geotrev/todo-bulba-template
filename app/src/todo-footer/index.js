import {
  UpgradedElement,
  register,
} from "upgraded-element/lib/upgraded-element.es.js"
import styles from "./styles.scss"

class TodoFooter extends UpgradedElement {
  static get styles() {
    return styles
  }

  render() {
    return `
      <footer class="todo-footer">
        <p>
          Created by&nbsp;
          <a href="https://github.com/geotrev">
            George Treviranus
          </a>
        </p>
      </footer>
    `
  }
}

register("todo-footer", TodoFooter)
