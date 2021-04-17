import * as actionTypes from "./action-types"

export const dispatch = (source, type, detail = {}) => {
  const event = new CustomEvent(type, {
    composed: true,
    bubbles: type !== actionTypes.STORE_UPDATED,
    detail,
  })
  source.dispatchEvent(event)
}
