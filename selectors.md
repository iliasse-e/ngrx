# Comment utiliser selector sur NgRx ?

Les sélecteurs sont définis dans un fichier séparé, généralement nommé users.selectors.ts. Ils permettent de récupérer des informations spécifiques de l'état des utilisateurs. Pour notre exemple, nous allons créer trois sélecteurs : un pour accéder à l'état des utilisateurs, un pour accéder à la liste des utilisateurs, et un pour vérifier l'état de chargement.

1. Créer un sélecteur pour l'état des utilisateurs
Nous créons un sélecteur de fonctionnalité pour accéder à l'état des utilisateurs. Ce sélecteur de fonctionnalité est utilisé comme base pour les autres sélecteurs.

```typescript
// Sélecteur pour accéder à l'état des utilisateurs
export const selectUsersState = createFeatureSelector<UsersState>('users');
```

2. créer des sélecteurs spécifiques

    Nous utilisons createSelector pour créer des sélecteurs spécifiques basés sur le sélecteur de fonctionnalité.

    - Ce sélecteur extrait la liste des utilisateurs de l'état.


    ```typescript
    // Sélecteur pour accéder à la liste des utilisateurs
    export const selectUsersList = createSelector(
    selectUsersState,
    (state: UsersState) => state.usersList 
    );
    ```

    - Ce sélecteur extrait l'état de chargement de l'état.


    ```typescript
    // Sélecteur pour accéder à l'état de chargement
    export const selectUsersLoading = createSelector(
    selectUsersState, 
    (state: UsersState) => state.loading 
    );
    ```



- ``createFeatureSelector`` : Cette fonction crée un sélecteur de fonctionnalité qui permet d'accéder à l'état des utilisateurs dans le store global.
- ``createSelector`` : Cette fonction crée des sélecteurs spécifiques basés sur le sélecteur de fonctionnalité. Elle prend le sélecteur de fonctionnalité comme premier argument, puis une fonction de projection qui retourne la partie spécifique de l'état.

## Utilisation des sélecteurs dans les composants
Les sélecteurs sont utilisés dans les composants pour obtenir les données nécessaires de l'état. Voici un exemple d'utilisation dans un composant Angular :

```typescript
@Component({
  selector: 'app-users',
  template: `...`,
})
export class UsersComponent implements OnInit {
  private store = inject(Store)
  usersList$: Observable<User[]> = this.store.select(selectUsersList);
  loading$: Observable<boolean> = this.store.select(selectUsersLoading); 

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }
}
```

<div>

    Points à retenir

    - Les sélecteurs sont utilisés pour extraire des parties spécifiques de l'état du store.

    - createFeatureSelector crée un sélecteur de fonctionnalité pour accéder à une partie spécifique de l'état global.

    - createSelector crée des sélecteurs spécifiques basés sur le sélecteur de fonctionnalité.

    - Les sélecteurs permettent une gestion optimisée et typée de l'état dans vos composants.

</div>

<div>

    Bonnes pratiques

    - Utilisez des noms de sélecteurs descriptifs pour clarifier leur rôle.
    
    - Combinez les sélecteurs pour créer des sélecteurs complexes si nécessaire.
    
    - Centralisez la définition des sélecteurs dans des fichiers séparés pour une meilleure organisation.
    
    - Utilisez les sélecteurs dans les composants pour minimiser la logique d'état directement dans les composants.

</div>