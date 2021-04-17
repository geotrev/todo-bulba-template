import debounce from "lodash/debounce"
import { UpgradedElement, register } from "upgraded-element"
import { dispatch, actionTypes } from "../store/actions"
import { store } from "../store"
import styles from "./styles.scss"

class TodoBody extends UpgradedElement {
  static get properties() {
    return {
      store: {
        default: store.getState(),
        type: "object",
      },
    }
  }

  static get styles() {
    return styles
  }

  constructor() {
    super()

    this.storeUpdated = this.storeUpdated.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.addTodoEvents = this.addTodoEvents.bind(this)
    this.debounceInput = debounce(this.handleInput, 500)
  }

  elementDidMount() {
    store.subscribe(this, this.storeUpdated)
    this.registerTodos()
  }

  elementDidUpdate() {
    const newTodo = this.store.todos[0]

    if (newTodo && newTodo.draft) {
      this.addTodoEvents(this.shadowRoot.querySelector(".todo"))
    }
  }

  registerTodos() {
    const todos = this.shadowRoot.querySelectorAll(".todo")
    todos.forEach(this.addTodoEvents)
  }

  addTodoEvents(todoElement) {
    const deleteBtn = todoElement.querySelector(".delete")
    const input = todoElement.querySelector("input")
    deleteBtn.addEventListener("click", this.handleDelete)
    input.addEventListener("input", this.debounceInput)
  }

  handleDelete(event) {
    const todoElement = event.target.parentElement

    const deleteBtn = todoElement.querySelector(".delete")
    deleteBtn.removeEventListener("click", this.handleDelete)
    const input = todoElement.querySelector("input")
    input.removeEventListener("input", this.debounceInput)

    dispatch(this, actionTypes.DELETE_TODO, {
      id: event.target.parentElement.id,
    })
  }

  handleInput(event) {
    dispatch(this, actionTypes.SAVE_TODO, {
      id: event.path[0].parentElement.id,
      value: event.path[0].value,
    })
  }

  storeUpdated(state) {
    this.store = state
  }

  renderTodos() {
    return this.store.todos.reduce((todos, todo) => {
      todos += `
        <div class="todo" data-key='${todo.id}' id='${todo.id}'>
          <input class="todo-input" value='${todo.value}' />
          <button class="delete">Delete</button>
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
