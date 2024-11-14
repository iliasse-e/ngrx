import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { addTodo, deleteTodo, modifyTodo, resetTodos, retrieveTodos, Todo, TodoState } from './todo.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ErrorComponent } from './error/error.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ErrorComponent],
  template: `
  <div class="body">
    <section>
      <h1>Todo list</h1>

      <ul>
      @for (item of todos(); track item?.id) {
        <li [class.completed-description]="item.completed">{{item?.description}} 
          <span>
            <input
            type="checkbox" 
            [checked]="item?.completed"
            (click)="toggleCompleted(item)"
            >
            <button (click)="deleteTodo(item.id)">x</button>
        </span></li>
      }
      </ul>

      <label for="new-todo">Description</label>
      <input #description id="new-todo" type="text"/>
      <button (click)="newTodo(description.value)">New todo</button>
  
      @if (todos().length) {
        <button (click)="reset()">Erase all</button>
      }

    </section>

    @if (error().length) {
      <error [message]="error()" />
    }
  </div>

  @if (loading()) {
    <div>Loading...</div>
  }
  `,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  readonly #store = inject(Store<TodoState>);  

  // DEPORT IN SELECTOR

  todos = toSignal(this.#store.select('todo').pipe(map(appState => appState?.todos)));

  error = toSignal(this.#store.select('todo').pipe(map(appState => appState?.error)));

  loading = toSignal(this.#store.select('todo').pipe(map(appState => appState?.loading)))

  ngOnInit(): void {
    this.loadTodos();
  }

  toggleCompleted(todo: Todo): void {
    this.#store.dispatch(modifyTodo({id: todo.id, todo: {...todo, completed: !todo.completed}}));
  }

  newTodo(description: string): any {
    const newTodo: Todo = {
      id: Date.now().toString(),
      description: description,
      completed: false,
    }
    this.#store.dispatch(addTodo({todo: newTodo}));
  }

  deleteTodo(id: string): void {
    this.#store.dispatch(deleteTodo({id: id}));
  }

  loadTodos(): void {
    this.#store.dispatch(retrieveTodos())
  }

  reset(): void {
    this.#store.dispatch(resetTodos());
  }

}

