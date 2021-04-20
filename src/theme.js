import theme from "./theme.scss"

const styleEl = document.createElement("style")
styleEl.textContent = theme
document.head.appendChild(styleEl)
