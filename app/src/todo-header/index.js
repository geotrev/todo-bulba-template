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
    dispatch(actionTypes.ADD_TODO)
  }

  render() {
    return `
      <header class="todo-header">
        <h1 class="todo-header--heading">
          <span aria-hidden="true">/</span>TooDoo
        </h1>
        <button class="todo-header--add-todo" id='add'>
          <span class="todo-header--add-todo--plus">+</span>
          <span class="todo-header--add-todo--text">Add Todo</span>
        </button>
      </header>
    `
  }
}

register("todo-header", TodoHeader)
