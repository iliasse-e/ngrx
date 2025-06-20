## Ecrire l'état initial

L'état initial représente la configuration par défaut de votre store au démarrage de l'application. Il est défini en créant un objet qui correspond à la structure de votre état.
Définir l'interface de l'état

Dans src/app/store/users/users.reducer.ts

Tout d'abord, nous devons définir l'interface UsersState qui décrit la forme de l'état des utilisateurs. Cela permet de garantir que l'état est toujours structuré de manière cohérente et prévisible.

```typescript
import { User } from "../../core/interfaces/user.interface";

// Interface représentant l'état des utilisateurs
export interface UsersState {
    usersList: User[];  // Liste des utilisateurs
    loading: boolean;   // Indicateur de chargement
}
```

## Initialiser l'état
Ensuite, dans le même fichier, nous créons une constante usersInitialState qui initialise l'état avec des valeurs par défaut. Cette constante est utilisée pour fournir une base cohérente pour l'état de l'application lors de son démarrage.

```typescript
// État initial des utilisateurs
const usersInitialState: UsersState = {
    usersList: [],    // Liste initiale vide d'utilisateurs
    loading: true     // Indicateur de chargement initialisé à true
};
```

On peut passer aux actions...