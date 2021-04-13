export function dispatch(name, detail) {
  return new CustomEvent(name, {
    bubbles: true,
    cancelable: true,
    detail,
  })
}
