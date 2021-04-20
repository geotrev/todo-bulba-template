# Upflux

Global state manager for ES6 classes. Automatically adds data from the store into a corresponding class property.

## Create a store

To create a store, provide your initial state object and a reducer containing your action logic.

```js
import { store } from "./utils"
import { reducer } from "./reducer"

const initialState = {
  foo: [],
  bar: 0
}

store.create(initialState, reducer)
```

## Write a reducer

Reducers here are like other flux implementation: a pure function that returns new state. Use your own action types to direct state change logic.

```js
import actionTypes from "./action-types"

export const reducer = (type, state, payload) => {
  switch (type) {
    case actionTypes.ADD_ONE: {
      return { ...state, bar: state.bar + 1 }
    }
    case actionTypes.MORE_FOO: {
      const foo = foo.concat(payload.foo)
      return { ...state, foo }
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

## Subscribe to the store

Subscribing is a single call. It takes the `this` of your class and an array of paths to properties in the store.

```js
store.subscribe(this, ["foo", "some.nested[0].propName"])
```

Whenever these state values change, the values are automatically forwarded to your class as matching properties to the inner-most property name.

To use the above example, `propName` and `foo` would be the properties updated on your subscribed class.

## Dispatch an action

All that's left is dispatching the action.

```js
import { dispatch } from "./utils"
import actionTypes from "./action-types"

dispatch(actionTypes.ADD_MORE_FOO, {
  foo: [{ id: 'baz', value: 'beep' }],
})

dispatch(actionTypes.ADD_ONE)
```
