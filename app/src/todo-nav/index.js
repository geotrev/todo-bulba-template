import { UpgradedElement, register } from "upgraded-element"
import styles from "./styles.scss"

class TodoNav extends UpgradedElement {
  static get styles() {
    return styles
  }

  render() {
    return `
      <header>
        <nav>Navigation</nav>
      </header>
    `
  }
}

register("todo-nav", TodoNav)
