import { Action, createAction, createReducer, on, props } from "@ngrx/store";

// TYPES

export type TodoState = {
    todos: Todo[];
    error: string,
    loading: boolean
}

export interface Todo {
    id: string | undefined;
    description: string;
    completed: boolean;
}


// ACTIONS

export const addTodo = createAction('[Add Todo] Add', props<{todo: Todo}>());

export const deleteTodo = createAction('[Delete Todo] Delete', props<{id: string}>());

export const modifyTodo = createAction('[Modify Todo] Modify', props<{id: string, todo: Todo}>());

export const resetTodos = createAction('[Reset Todos] Reset');

export const loadTodos = createAction('[Load Todos] Load', props<{todos: Todo[]}>());


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
    on(loadTodos, (state, {todos}) => ({...state, todos: todos})),
)


// SELECTORS

