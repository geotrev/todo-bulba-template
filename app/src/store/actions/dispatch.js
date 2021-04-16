export const dispatch = (type, detail = {}) => {
  const event = new CustomEvent(type, {
    composed: true,
    detail,
  })
  document.dispatchEvent(event)
}
