import { UpgradedElement, register } from "upgraded-element"
import { getState, dispatch } from "../store/actions"
import styles from "./styles.scss"

class TodoBody extends UpgradedElement {
  static get properties() {
    return {
      todos: {
        default: getState().todos,
        type: 'array'
      }
    }
  }

  static get styles() {
    return styles
  }
  
  elementDidMount() {
    const todos = this.shadowRoot.querySelectorAll('.todo')

    todos.forEach(todo => {
      todo.querySelector('.edit').addEventListener('click', this.handleEdit)
      todo.querySelector('.delete').addEventListener('click', this.handleDelete)
    })
  }
  
  elementDidUpdate() {
  
  }
  
  handleDelete(event) {
    dispatch(DELETE_TODO, { id: event.target.parentNode.dataset.todoId })
  }
  
  handleEdit(event) {
    const todoWrapper = event.target.parentNode

    dispatch(EDIT_TODO, {
      id: todoWrapper.dataset.todoId,
      value: todoWrapper.querySelector('.todo-input').value
    })
  }

  renderTodo({id, value}) {
    return `
      <div class="todo" data-todo-id='${id}'></div>
    `
  }

  render() {
    return `
      <main class="todo-body">
        ${this.todos.forEach(this.renderTodo)}
      </main>
    `
  }
}

register("todo-body", TodoBody)
