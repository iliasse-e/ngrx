import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TodoState } from "./todo.reducer";

const selectTodoState = createFeatureSelector<TodoState>('todo');

export const selectTodoList = createSelector(
    selectTodoState,
    (state: TodoState) => state.todos
)

export const selectTodoLoading = createSelector(
    selectTodoState,
    (state: TodoState) => state.loading
)

export const selectTodoError = createSelector(
    selectTodoState,
    (state: TodoState) => state.error
)