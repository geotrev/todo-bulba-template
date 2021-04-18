export const dispatch = (source, type, detail = {}) => {
  const event = new CustomEvent(type, {
    composed: true,
    bubbles: true,
    detail,
  })
  source.dispatchEvent(event)
}
