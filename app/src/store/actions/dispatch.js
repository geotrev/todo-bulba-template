export const dispatch = (el, type, detail = {}) => {
  const event = new CustomEvent(type, {
    bubbles: true,
    composed: true,
    currentTarget: el,
    target: el,
    detail,
  })
  el.dispatchEvent(event)
}
