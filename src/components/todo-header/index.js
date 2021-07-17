import { Rotom, register } from "rotom"
import { dispatch, actions } from "../../store"
import "../todo-action-button"
import styles from "./styles.scss"

class TodoHeader extends Rotom {
  static get styles() {
    return styles
  }

  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  elementDidMount() {
    this.button = this.shadowRoot.querySelector("todo-action-button")
    this.button.addEventListener("click", this.handleClick)
  }

  elementWillUnmount() {
    this.button.removeEventListener("click", this.handleClick)
  }

  handleClick() {
    dispatch(actions.ADD_TODO)
  }

  render() {
    return `
      <header class="todo-header">
        <h1 class="todo-header--heading">
          <span aria-hidden="true">/</span>TooDoo
        </h1>
        <todo-action-button 
          class="todo-header-action-button" 
          icon="+" 
          size="lg"
        >
          Add Todo
        </todo-action-button>
      </header>
    `
  }
}

register("todo-header", TodoHeader)
