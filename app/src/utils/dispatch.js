export const dispatch = (type, detail) => {
  const event = new CustomEvent(type, { detail })
  document.documentElement.dispatchEvent(event)
}
