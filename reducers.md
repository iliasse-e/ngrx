# Créer le reducer dans NgRx

Les reducers en NGRX sont des fonctions pures qui spécifient comment l'état de l'application change en réponse aux actions envoyées au store. Ils prennent l'état actuel et une action comme arguments, puis retournent un nouvel état. Voici comment créer le reducer pour gérer la liste des utilisateurs dans votre application Angular.

## 1. Rappel, les états
Suite à l'explication des états (que l'on a créé comme initial state), nous allons créer la fonction reducer pour gérer les actions.

## 2. Créer le reducer
Nous utilisons createReducer pour créer le reducer. Nous spécifions comment l'état change en réponse à chaque action en utilisant la fonction on.

```typescript
import { createReducer, on } from "@ngrx/store"
import { usersActions } from "./users.action"

export const usersReducer = createReducer(
  usersInitialState, 
  on(loadUsers, state => ({
    ...state, 
    loading: true 
  })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state, 
    usersList: users, 
    loading: false
  })),
  on(loadUsersFailure, state => ({
    ...state,
    loading: false
  }))
);
```

1. usersInitialState : L'état initial est utilisé comme point de départ. Cela garantit que le reducer commence avec une structure d'état cohérente.
2. on(loadUsers, ...) :
    Lors de l'action loadUsers, nous retournons un nouvel état avec loading défini sur true pour indiquer que les utilisateurs sont en cours de chargement.
3. on(loadUsersSuccess, ...) :
    Lors de l'action loadUsersSuccess, nous mettons à jour l'état avec la nouvelle liste d'utilisateurs et définissons loading sur false pour indiquer que le chargement est terminé avec succès.
4. on(loadUsersFailure, ...) :
    Lors de l'action loadUsersFailure, nous définissons simplement loading sur false pour indiquer que le chargement a échoué.

<div class="alert is-important">
    Propagation de l'état

    À chaque action, nous utilisons l'opérateur de décomposition (...state) pour créer une copie de l'état actuel, puis nous modifions seulement les propriétés nécessaires. Cela garantit que nous ne mutons pas l'état directement, respectant ainsi le principe d'immuabilité des reducers.
</div>

## Configuration du reducer
Le reducer doit être intégré dans les configurations du store de votre application Angular. Allez dans app.config.ts:
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { usersReducer } from './store/users/users.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      users: usersReducer
    })
  ]
};
```

## Etre plus rapide avec un Feature
Nous utilisons createFeature pour regrouper le reducer et l'état initial sous une même fonctionnalité nommée users.

```typescript
import { createFeature } from '@ngrx/store';

// Créer une fonctionnalité pour les utilisateurs
export const usersFeature = createFeature({
  name: 'users', 
  reducer: usersReducer  // le reducer plus haut
});
```

1. name: 'users' : Le nom de la fonctionnalité est défini comme `'users'`, ce qui permet d'identifier clairement cette partie de l'état de l'application.
2. reducer: `usersReducer` : Le reducer associé à cette fonctionnalité est usersReducer, qui gère l'état des utilisateurs en fonction des actions.

L'intérêt est que `usersFeature` va vous créer les sélecteurs automatiquement. On aura donc `selectUsersList` et `selectUsersLoading` qui seront créés automatiquement !

<div class="alert is-important">
    Ajouter des selectors

    Si vous souhaitez ajouter d'autres sélecteurs:

    ```typescript
    export const usersFeature = createFeature({
        name: 'users', 
        reducer: usersReducer,
        extraSelectors: ({selectUsers}) => {
            return {
                selectActiveUsers: createSelector(
                    selectUsers,
                    (users) => users.filter(user => user.active)
                )
            }
        }
    });
    ```

    Utilisez `extraSelectors` pour ajouter des sélecteurs supplémentaires à la fonctionnalité. Vous pouvez les définir en fonction des sélecteurs existants pour accéder à l'état de manière plus spécifique.
</div>

Ensuite, il faut ajouter la fonctionnalité usersFeature à la configuration du store de votre application Angular. Allez dans app.config.ts :

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideState, provideStore } from '@ngrx/store';
import { usersFeature, usersReducer } from './store/users/users.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(), // on peut laisser vide si on utilise provideState
    provideState(usersFeature)
  ]
};
```

<div class="alert is-important">

    Points à retenir

    - Les reducers spécifient comment l'état change en réponse aux actions.
    - Utilisez createReducer et on pour définir les transformations d'état.
    - Maintenez l'état immuable en utilisant l'opérateur de décomposition.
    - Gérez différentes actions en modifiant uniquement les parties nécessaires de l'état.
</div>


<div class="alert is-important">
    
    Bonnes pratiques

    - Gardez les reducers simples et focus sur une seule responsabilité.
    - Toujours retourner un nouvel objet d'état au lieu de modifier l'état existant.
    - Utilisez des noms d'actions descriptifs pour clarifier leur rôle.
    - Combinez plusieurs reducers si l'état de votre application devient complexe.
</div>