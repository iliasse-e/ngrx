import { createReducer, on } from "@ngrx/store";
import { addTodo, deleteTodo, loadTodosFailure, loadTodosSuccess, modifyTodo, resetTodos, retrieveTodos } from "./todo.action";
import { Todo } from "../todo.type";

// TYPES

export type TodoState = {
    todos: Todo[];
    error: string,
    loading: boolean
}

// INITIAL STATE

const initialState: TodoState = {
    todos: [],
    error: '',
    loading: false,
}

// REDUCERS

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