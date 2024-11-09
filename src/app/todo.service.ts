import { from, Observable, of } from "rxjs";
import { Todo } from "./todo.store";

export class TodoService {

    retrieveTodos(): Observable<Todo[]> {
        console.log('called retrieveTodos');
        
        return of(
            [
                {id: '1', description: 'Read 50 last pages of Toqueville s On Democracy', completed: false},
                {id: '21', description: 'Cook msemen for sunday morning family weekly breakfast', completed: false},
                {id: '33', description: 'Get sakhra from lwalida', completed: false},
            ])
    }
}