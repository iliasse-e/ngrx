// TODO : Ajout des erreur et success
// TODO : migrate to `createActionGroup`

import { createAction, emptyProps, props } from "@ngrx/store";
import { Todo } from "../todo.type";

export const addTodo = createAction('[Add Todo] Add', props<{todo: Todo}>());

export const deleteTodo = createAction('[Delete Todo] Delete', props<{id: string}>());

export const modifyTodo = createAction('[Modify Todo] Modify', props<{id: string, todo: Todo}>());

export const resetTodos = createAction('[Reset Todos] Reset');

export const loadTodosSuccess = createAction('[Load Todos Success] Load success', props<{todos: Todo[]}>());

export const loadTodosFailure = createAction('[Load Todos failure] Load failure', emptyProps);

export const retrieveTodos = createAction('[Retrieve Todos] Retrieve', emptyProps); // As Effect
