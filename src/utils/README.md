# Core Flux

Shared state manager for ES6 classes and/or constructor functions using the Flux pattern.

1. **Subscribe** to properties in the store
2. **Dispatch** new state payloads
3. **Receive** new state as a property

## Create a store

Import and call `createStore` to initialize a new store instance (you can have multiple if you want). All that's required is the default **initial state object** and a [**reducer function**](#write-a-reducer).

```js
import { createStore } from "core-flux"
import { reducer } from "./my-reducer"

const initialState = {
  foo: [],
  bar: {
    baz: 0,
    beep: "hello",
  },
}

const { subscribe, dispatch } = createStore(initialState, reducer)

export { subscribe, dispatch }
```

The result of `createStore` will be helpers used to interact with the store.

- `dispatch` - used to update state with an accompanying action.
- `subscribe` - used to subscribe a class or prototype to the store.

## Write a reducer

Reducers in Core Flux are like other flux implementation: a pure function that returns new state, using custom action types to direct state-changing logic.

The state object passed in is a copy, so you can safely mutate it to your heart's desire.

```js
import actionTypes from "./my-action-types"

export const reducer = (type, state, payload) => {
  switch (type) {
    // 'ADD_ONE'
    case actionTypes.ADD_ONE: {
      state.bar.baz += 1
      return state
    }

    // 'MORE_FOO'
    case actionTypes.MORE_FOO: {
      state.foo.concat(payload.foo)
      return state
    }

    default: {
      return state
    }
  }
}
```

Params:

- `type`: The name of the dispatched action.
- `state`: An immutable copy of current state.
- `payload`: Payload given from the dispatched action.

## Dispatch an action

Provide an **action type** and the **payload object** which reflects a piece of state to be handled in your reducer.

```js
import { dispatch } from "./my-store"
import actionTypes from "./my-action-types"

dispatch(actionTypes.ADD_MORE_FOO, {
  foo: [{ id: "baz", value: "beep" }],
})

dispatch(actionTypes.ADD_ONE)
```

## Subscribe to the store

Last but not least, to subscribe to a store, provide the class or function instance (`this` for either a class or constructor function) and an **array of paths** to properties in the store.

```js
import { subscribe } from "./my-store"

// Class
class FooBar {
  constructor() {
    subscribe(this, ["foo", "some.bar.beep"])
  }

  get myBeep() {
    return this.beep
  }
}

// Constructor function
const FooBar() {
  subscribe(this, ["foo", "some.bar.beep"])
}
```

**Whenever these state properties change, the values are automatically forwarded to your class as matching properties.** To use the above example, `foo` and `beep` would be the properties updated on your class.
