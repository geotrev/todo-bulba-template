import { UpgradedElement, register } from "upgraded-element"
import { dispatch, actionTypes } from "../utils"
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
    dispatch(actionTypes.ADD_TODO)
    // dispatch(EDIT_TODO, {id: this.value, value: this.elementId})
    // dispatch(DELETE_TODO, {id: event.target.id})
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
