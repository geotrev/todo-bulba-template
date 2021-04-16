import vars from "./vars.scss"

const styleEl = document.createElement("style")
styleEl.textContent = vars
document.head.appendChild(styleEl)
