import debounce from "lodash-es/debounce"
import { BulbaElement, register } from "@bulba/element"
import { Renderer } from "@bulba/template"
import { dispatch, subscribe, actions } from "../../store"
import "../todo-action-button"
import styles from "./styles.scss"

class TodoBody extends BulbaElement(Renderer) {
  static get properties() {
    return {
      todos: {
        default: [],
        type: "array",
      },
    }
  }

  static get styles() {
    return styles
  }

  constructor() {
    super()
    subscribe(this, ["todos"])
    this.handleClick = this.handleClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.debounceInput = debounce(this.handleInput, 500)
  }

  onMount() {
    this.addEventListener("click", this.handleClick)
    this.addEventListener("input", this.handleInput)
  }

  onUnmount() {
    this.removeEventListener("click", this.handleClick)
    this.removeEventListener("input", this.handleInput)
  }

  onUpdate() {
    this.focusDraftTodo()
  }

  focusDraftTodo() {
    const topTodo = this.todos[0]

    if (topTodo && topTodo.draft) {
      const todoEl = this.shadowRoot.querySelector(".todo")
      todoEl.querySelector(".todo--textarea").focus()
    }
  }

  handleClick(event) {
    const path = event.composedPath()

    const deleteBtn = path.find(
      (element) => element.tagName && element.tagName === "TODO-ACTION-BUTTON"
    )

    if (deleteBtn) {
      dispatch(actions.DELETE_TODO, { id: deleteBtn.parentElement.id })
    }
  }

  handleInput(event) {
    const target = event.composedPath()[0]

    if (!target.classList.contains("todo--textarea")) return

    dispatch(actions.SAVE_TODO, {
      id: target.parentElement.id,
      value: target.value,
    })
  }

  renderEmptyState() {
    return `
      <p>You're done! Rejoice! :)</p>
      <br/>
      <p>Or... create more todos!</p>
    `
  }

  renderTodos() {
    if (!this.todos.length) {
      return this.renderEmptyState()
    }

    return this.todos.reduce((todos, todo) => {
      todos += `
        <div class="todo" data-key="${todo.id}" id="${todo.id}">
          <textarea class="todo--textarea" placeholder="${todo.placeholder}">
            ${todo.value}
          </textarea>
          <todo-action-button 
            class="todo-body-action-button"
            icon="–"
          >
            Delete
          </todo-action-button>
        </div>
      `
      return todos
    }, "")
  }

  render() {
    return `
      <main class="todo-body">
        ${this.renderTodos()}
      </main>
    `
  }
}

register("todo-body", TodoBody)
