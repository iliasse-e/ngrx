# Comment créer des actions sur NgRx ?
Les actions dans NGRX sont des objets qui décrivent des événements déclenchés dans votre application. Elles permettent de signaler que quelque chose s'est produit et qu'une modification de l'état est nécessaire. Voici comment créer les actions pour gérer la liste des utilisateurs dans votre application Angular.

## définition des actions

Pour gérer l'état des utilisateurs, nous allons créer trois actions principales :

    Charger les utilisateurs.
    Indiquer le succès du chargement des utilisateurs.
    Indiquer une erreur lors du chargement des utilisateurs.

Ces actions sont définies dans un fichier nommé users.actions.ts dans le répertoire src/app/store/users/.

## 1. Charger les utilisateurs
Cette action est déclenchée pour commencer le processus de chargement des utilisateurs. Elle n'a pas de charge utile (payload), car elle sert uniquement à signaler le début du chargement.

```typescript
import { createAction, props } from '@ngrx/store';
import { User } from './user';

// Action pour commencer le chargement des utilisateurs
export const loadUsers = createAction('[Users] Load Users');
```

## 2. Indiquer le succès du chargement des utilisateurs
Cette action est déclenchée lorsque les utilisateurs ont été chargés avec succès. Elle transporte les données des utilisateurs sous forme de charge utile.

```typescript
// Action pour indiquer le succès du chargement des utilisateurs
export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>() 
);
```

<div class="alert is-important">

    Qu'est-ce que props dans les actions ngrx?

    La fonction props dans NGRX est utilisée pour ajouter des propriétés (ou charges utiles) à une action. Lorsqu'une action nécessite de transporter des données (par exemple, une liste d'utilisateurs ou des détails d'une erreur), props permet de définir la forme de ces données.

    Type sûr : En utilisant props, TypeScript peut vérifier les types des données transportées par vos actions, réduisant ainsi les erreurs.
    Clarté : props rend explicite les données associées à chaque action, ce qui améliore la lisibilité et la maintenance du code.
    Interopérabilité : Les actions avec props peuvent être facilement utilisées avec d'autres parties de NGRX, comme les reducers et les effets, qui peuvent accéder directement aux propriétés définies.
</div>

## 3. Indiquer une erreur lors du chargement des utilisateurs
Cette action est déclenchée en cas d'échec du chargement des utilisateurs. Elle peut transporter des informations supplémentaires sur l'erreur, mais dans cet exemple, nous n'ajoutons pas de charge utile.

```typescript
// Action pour indiquer une erreur lors du chargement des utilisateurs
export const loadUsersFailure = createAction('[Users] Load Users Failure');
```

## Organisation des actions
Pour une organisation claire et une maintenance facile, placez toutes les actions dans un fichier séparé comme users.actions.ts.

## Regroupement des actions avec `createActionGroup`

NGRX propose une fonctionnalité pratique appelée `createActionGroup`, qui permet de regrouper plusieurs actions sous une même source. Cela simplifie la gestion et l'organisation des actions dans votre application. Voici comment utiliser `createActionGroup` pour gérer les actions liées à la liste des utilisateurs.
### 1. créer le groupe d'actions
Nous utilisons `createActionGroup` pour définir un groupe d'actions sous la source 'Users'. Chaque événement (ou action) est défini avec les propriétés (ou charge utile) qu'il transporte.

```typescript
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from './user';

export const usersActions = createActionGroup({
  source: 'Users',
  events: {
    'Get All':  emptyProps(), 
    'Get All Success': props<{ users: User[] }>(),
    'Get All Failure': props<{ error: any }>() 
  },
});
```

ceci créera un objet usersActions qui contient les actions suivantes : `getAll`, `getAllSuccess`, `getAllFailure`. Autrement dit, les clés de l'objet ont été changées en camelCase. Donc, par exemple, pour déclencher l'action Get All, on utilisera `usersActions.getAll()`.

<div class="alert is-important">

    Bonnes pratiques

    Utilisez `createActionGroup` pour regrouper les actions liées par fonctionnalité.
    Nommez les actions de manière descriptive pour clarifier leur rôle.
    Centralisez la définition des actions dans des fichiers séparés pour une meilleure organisation.
    Utilisez les actions groupées dans les reducers et les effets pour une gestion cohérente de l'état.
</div>