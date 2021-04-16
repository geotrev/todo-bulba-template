import { UpgradedElement, register } from "upgraded-element"
import { dispatch, actionTypes } from "../store/actions"
import styles from "./styles.scss"

class TodoHeader extends UpgradedElement {
  static get styles() {
    return styles
  }

  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  elementDidMount() {
    this.button = this.shadowRoot.querySelector("#add")
    this.button.addEventListener("click", this.handleClick)
  }

  elementWillUnmount() {
    this.button.removeEventListener("click", this.handleClick)
  }

  handleClick() {
    dispatch(this, actionTypes.ADD_TODO)
  }

  render() {
    return `
      <header class="todo-header">
        <h1 class="todo-header--heading">/TOODOO</h1>
        <button class="todo-header--add-todo" id='add'>+</button>
      </header>
    `
  }
}

register("todo-header", TodoHeader)
