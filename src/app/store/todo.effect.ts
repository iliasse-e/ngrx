import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodoService } from "../todo.service";
import { inject } from "@angular/core";
import { loadTodosFailure, loadTodosSuccess, retrieveTodos } from "./todo.action";
import { catchError, map, of, switchMap } from "rxjs";

export const retrieveTodos$ = createEffect(
      (actions$ = inject(Actions), todoService = inject(TodoService)) => {
        return actions$.pipe(
            ofType(retrieveTodos),
            switchMap(() => todoService.retrieveTodos()),
            map((todoList) => loadTodosSuccess({ todos: todoList })),
            catchError(() => of(loadTodosFailure()))
        )
  },
  {functional: true}
)