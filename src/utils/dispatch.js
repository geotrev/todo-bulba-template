import { REQUEST_STORE_UPDATE } from "./action-types"

export const dispatch = (type, payload = {}) => {
  const event = new CustomEvent(REQUEST_STORE_UPDATE, {
    composed: true,
    bubbles: true,
    detail: { type, payload },
  })
  document.dispatchEvent(event)
}
