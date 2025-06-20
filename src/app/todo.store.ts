import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodoService } from "./todo.service";
import { catchError, map, of, switchMap } from "rxjs";
import { loadTodosFailure, loadTodosSuccess, retrieveTodos } from "./store/todo.action";

// EFFECT

export const retrieveTodos$ = createEffect(
    (action$ = inject(Actions), todoService = inject(TodoService)) => {
        return action$.pipe(
            ofType(retrieveTodos),
            switchMap(() => todoService.retrieveTodos()),
            map(todos => loadTodosSuccess({ todos })),
            catchError(() => of(loadTodosFailure()))
        )
    },
    { functional: true }
)