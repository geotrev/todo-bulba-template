import {REQUEST_STORE_UPDATE} from "./action-types"

export const dispatch = (source, type, payload = {}) => {
  const event = new CustomEvent(REQUEST_STORE_UPDATE, {
    composed: true,
    bubbles: true,
    detail: { type, payload },
  })
  source.dispatchEvent(event)
}
