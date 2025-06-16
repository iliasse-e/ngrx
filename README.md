# Description

<figure>
  <img src="/public/state-management-lifecycle.png" alt="NgRx State Management Lifecycle Diagram" width="100%" height="100%" />
</figure>

## Key concepts

- [Actions](/actions) describe unique events that are dispatched from components and services.
- State changes are handled by pure functions called [reducers](/reducers) that take the current state and the latest action to compute a new state.
- [Reducers](/reducers) in NgRx are responsible for handling transitions from one state to the next state in your application. Reducer functions handle these transitions by determining which actions to handle based on the action's type.
- [Selectors](/selectors) are pure functions used to select, derive and compose pieces of state.
- State is accessed with the `Store`, an observable of state and an observer of actions.
- [Effects](/effects) are an RxJS powered side effect model for Store. Effects use streams to provide new sources of actions to reduce state based on external interactions such as network requests, web socket messages and time-based events.
