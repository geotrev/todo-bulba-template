import { BulbaElement, register } from "@bulba/element"
import { Renderer } from "@bulba/template"
import styles from "./styles.scss"

class TodoActionButton extends BulbaElement(Renderer) {
  static get properties() {
    return {
      icon: {
        reflected: true,
        required: true,
      },
      size: {
        default: "md",
        reflected: true,
      },
    }
  }

  static get styles() {
    return styles
  }

  render() {
    return `
      <button class="todo-action-button ${this.size}">
        <span aria-hidden="true" class="todo-action-button--icon">${this.icon}</span>
        <span class="todo-action-button--text">
          <slot></slot>
        </span>
      </button>
    `
  }
}

register("todo-action-button", TodoActionButton)
