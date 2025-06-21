# Comment utiliser les effect sur NgRx ?

### Intérêt ?

Les effets de NgRx vous permettent de séparer les effets de côté-effets de votre application de votre logique de mise à jour de l'état. Cela peut être utile pour plusieurs raisons :

- Séparation de la responsabilité : en séparant les effets de côté-effets de votre logique de mise à jour de l'état, vous pouvez mieux structurer votre code et rendre chaque partie de votre application plus facile à comprendre et à maintenir.

- Testabilité : en séparant les effets de côté-effets de votre logique de mise à jour de l'état, vous pouvez les tester de manière plus facile et plus fiable. Vous pouvez également tester votre logique de mise à jour de l'état de manière plus facile en sachant que les effets de côté-effets ont été correctement gérés.

- Performances : en exécutant les effets de côté-effets de manière asynchrone, vous pouvez éviter de bloquer le thread principal de votre application et améliorer les performances de votre application.

### Installer

```
npm install @ngrx/effects
```

## 0. Rappel: les actions

Les actions sont des objets qui représentent des événements dans votre application. Ils sont émis par des composants ou d'autres parties de votre application et sont écoutés par des reducers pour mettre à jour l'état de votre application.

Voir le chapitre sur les actions pour plus de détails.

## 1. Créer l'effet de chargement des utilisateurs
Nous définissons un effet pour gérer le chargement des utilisateurs en réponse à l'action `loadUsers`. Cet effet écoute l'action `loadUsers`, fait appel au service `UserService` pour récupérer les utilisateurs, et émet les actions loadUsersSuccess ou loadUsersFailure en fonction du résultat.

```typescript
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { usersActions } from './users.action';

// Créer un effet pour charger les utilisateurs
export const usersGetAll$ = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(usersActions.getAll),
      switchMap((action) => userService.getAll(action.sort)),
      map((users) => usersActions.getAllSuccess({ users }))
    );
  },
  { functional: true }
);
```

`actions$` est un flux d'actions provenant du store NgRx. Il s'agit d'un observable qui émet chaque action dispatchée dans l'application. En écoutant ce flux, on peut réagir à des actions spécifiques et déclencher des opérations asynchrones comme des requêtes HTTP.

### Pourquoi cet enchaînement et ces opérateurs ?

1. Filtrer les actions avec `ofType`

- **But** : On utilise `ofType` pour filtrer les actions et ne réagir qu'à celles qui nous intéressent. Dans ce cas, nous filtrons les actions pour ne prendre que celles de type `usersActions.getAll`.
- **Pourquoi** : Sans `ofType`, nous réagirions à toutes les actions dispatchées, ce qui n'est pas souhaitable. `ofType` garantit que notre effet ne se déclenche que pour les actions pertinentes.

2. Effectuer une requête asynchrone avec `switchMap`

- **But** : `switchMap` prend chaque action filtrée et effectue une opération asynchrone, ici une requête HTTP via `userService.getAll`.

3. Transformer la réponse avec `map`

- **But** : `map` prend les résultats de la requête HTTP et les transforme en une nouvelle action `usersActions.getAllSuccess` avec les utilisateurs obtenus.
- **Pourquoi** : En NgRx, après avoir effectué une opération asynchrone, on dispatch une nouvelle action pour mettre à jour l'état global de l'application. Cette nouvelle action contient les données nécessaires pour mettre à jour le store.

### En résumé :

1. On écoute une action (via `actions$` en la filtrant avec `ofType`) 
2. On appelle le serveur (via `switchMap`)
3. On récupère les données 
4. On dispatch une action

## Ajoutez les effets dans la configuration
L'effet doit être ajouté à la configuration dans app.config.ts pour être utilisé dans l'application.

```typescript

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      users: usersReducer
    }),
    provideEffects({
      usersGetAll$
    })
  ]
};
```

Les effets fonctionnels en NGRX permettent de gérer les opérations asynchrones et les effets secondaires de manière déclarative et concise. En utilisant createEffect avec des fonctions, nous simplifions la gestion des injections et rendons le code plus lisible et maintenable.

<div class="alert is-important">

    points à retenir

    - Les effets gèrent les opérations asynchrones et les effets secondaires.
    Utilisez createEffect avec des fonctions pour créer des effets pures et injecter les dépendances.
    - Écoutez les actions pertinentes et émettez de nouvelles actions en fonction des résultats des opérations asynchrones.
    - Les effets doivent être ajoutés à la configuration du module NGRX.
</div>

<div class="alert is-important">

    Bonnes pratiques

    - Gardez les effets simples et focus sur une seule responsabilité.
    - Gérer les erreurs de manière proactive avec des actions de type échec.
    - Utilisez des noms d'actions et d'effets descriptifs pour clarifier leur rôle.
    - Centralisez la logique d'effets dans des fichiers séparés pour une meilleure organisation.
</div>