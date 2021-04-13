export function dispatch(source, name, data) {
  const event = new CustomEvent(name, {
    bubbles: true,
    cancelable: true,
    detail: { data },
  })
  source.dispatchEvent(event)
}
