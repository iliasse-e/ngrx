import { delay, Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { Todo } from "./todo.type";

@Injectable({providedIn: "root"})
export class TodoService {

    private readonly todos = [
        {id: '1', description: 'Read 50 last pages of Toqueville s On Democracy', completed: false},
        {id: '21', description: 'Cook msemen for sunday morning family weekly breakfast', completed: false},
        {id: '33', description: 'Get sakhra from lwalida', completed: false},
    ]

    retrieveTodos(): Observable<Todo[]> {
        const isServerDown = Math.random() < 0.15;
        if (isServerDown) throw new Error("Error on retrieve todos");
        return of(this.todos).pipe(delay(1500));
    }

    saveTodo(todo: Todo): Observable<void> {
        this.todos.push(todo);
        return of();
    }

    erase(): Observable<void> {
        this.todos.forEach(() => this.todos.pop());
        return of();
    }
}