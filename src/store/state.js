import { v4 as uid } from "uuid"
import { getRandomizedPlaceholder } from "../generate-placeholder"

export const state = {
  todos: [
    {
      id: uid(),
      placeholder: getRandomizedPlaceholder(),
      value: "",
      draft: true,
    },
  ],
}
