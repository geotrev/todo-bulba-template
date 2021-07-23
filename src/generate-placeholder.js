export function getRandomizedPlaceholder() {
  const items = [
    "Buy banana",
    "Wash dishes",
    "Rescue cat from tree",
    "Eat lunch",
    "Attempt exercise",
    "Take a nap",
    "Brush teeth",
    "Binge watch The Office",
    "Learn a new language",
    "Remember that thing",
  ]
  return items[Math.floor(Math.random() * items.length)]
}
