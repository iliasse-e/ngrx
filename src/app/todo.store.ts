import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createAction, createReducer, emptyProps, on, props } from "@ngrx/store";
import { TodoService } from "./todo.service";
import { catchError, map, of, switchMap, tap } from "rxjs";

// TYPES

export type TodoState = {
    todos: Todo[];
    error: string,
    loading: boolean
}
export interface Todo {
    id: string;
    description: string;
    completed: boolean;
}


// ACTIONS

// TODO : Ajout des erreur et success

export const addTodo = createAction('[Add Todo] Add', props<{todo: Todo}>());

export const deleteTodo = createAction('[Delete Todo] Delete', props<{id: string}>());

export const modifyTodo = createAction('[Modify Todo] Modify', props<{id: string, todo: Todo}>());

export const resetTodos = createAction('[Reset Todos] Reset');

export const loadTodosSuccess = createAction('[Load Todos Success] Load success', props<{todos: Todo[]}>());

export const loadTodosFailure = createAction('[Load Todos failure] Load failure', emptyProps);

export const retrieveTodos = createAction('[Retrieve Todos] Retrieve', emptyProps); // As Effect


// REDUCERS

const initialState: TodoState = {
    todos: [],
    error: '',
    loading: false,
}

export const todoReducer = createReducer(
    initialState,
    on(addTodo, (state, {todo}) => ({...state, todos: [...state.todos, todo]})),
    on(deleteTodo, (state, {id}) => ({...state, todos: [...state.todos.filter(todo => todo.id != id)]})),
    on(modifyTodo, (state, {id, todo}) => ({...state, todos: state.todos.map(t => t.id == id ? todo : t)})),
    on(resetTodos, (state) => ({...state, todos: []})),
    on(retrieveTodos, (state) => ({...state, loading: true, error: ''})),
    on(loadTodosSuccess, (state, {todos}) => ({...state, todos: todos, error: '', loading: false})),
    on(loadTodosFailure, (state) => ({...state, loading: false, error: 'Failure on loading todos data'})),
)


// SELECTORS

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