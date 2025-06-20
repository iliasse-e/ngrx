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

## Un store sur NgRx, c'est quoi ?

Un store est un concept central dans NgRx et d'autres bibliothèques de gestion d'état réactif. Il s'agit d'une sorte de conteneur qui stocke l'état de l'application de manière centralisée. Le store est accessible à partir de n'importe quel endroit de l'application, ce qui permet à tous les composants d'avoir accès aux mêmes données et d'être mis à jour en conséquence lorsque l'état de l'application change.

Un store NgRx est généralement implémenté en utilisant un Observable RxJS, qui permet de souscrire à l'état de l'application et de recevoir des notifications lorsque l'état change. Les composants de l'application peuvent s'abonner à l'Observable du store pour être notifiés des changements d'état et mettre à jour leur propre état en conséquence.

Le store NgRx permet également aux développeurs de mettre à jour l'état de l'application de manière contrôlée en utilisant des actions et des reducers. Les actions sont des objets qui représentent des intentions de modification de l'état, tandis que les reducers sont des fonctions qui prennent en entrée l'état actuel et une action, et renvoient un nouvel état mis à jour en fonction de l'action. En utilisant ces outils, les développeurs peuvent mettre à jour l'état de l'application de manière déclarative et faciliter la maintenance et l'évolution de l'application.