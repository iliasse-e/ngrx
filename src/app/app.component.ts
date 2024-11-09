import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { addTodo, deleteTodo, loadTodos, modifyTodo, resetTodos, Todo, TodoState } from './todo.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, of, tap } from 'rxjs';
import { TodoService } from './todo.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, JsonPipe],
  providers: [TodoService],
  template: `
  <h1>Todo list</h1>

  <ul>
  @for (item of todos(); track item?.id) {
    <li>{{item?.description}}</li>
  }
  </ul>

  <button>New todo</button>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  #store = inject(Store<TodoState>);
  

  constructor(private service: TodoService) {}
  
  todos = toSignal(this.#store.select('todo').pipe(map(appState => appState?.todos)));

  ngOnInit(): void {
    this.loadTodos();
  }

  newTodo(description: string): any {
    const newTodo: Todo = {
      id: undefined,
      description: description,
      completed: false,
    }
    this.#store.dispatch(addTodo({todo: newTodo}));
  }

  markAsComplete(id: string) {
  }

  deleteTodo(id: string) {
    this.#store.dispatch(deleteTodo({id: id}));
  }

  loadTodos() {
    // TODO : Create EFFECT
    this.service.retrieveTodos().pipe(tap(todos => {
      console.log(todos);
      
      this.#store.dispatch(loadTodos({todos: todos}))
    })).subscribe()
  }

  reset() {
    this.#store.dispatch(resetTodos());
  }

  
}
