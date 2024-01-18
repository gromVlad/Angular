import { TodoService, Todos } from './todoService.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable} from 'rxjs';

@Component({
  selector: 'main-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class AppComponent implements OnInit {
  public todosList$!: Observable<Todos[]>;
  
  forms = new FormControl('');


  constructor(private TodoService: TodoService) {}

  ngOnInit(): void {
    this.todosList$ = this.TodoService.todos$;

    this.getTodos();
  }

  getTodos(): void {
    this.TodoService.getTodos();
  }

  deleteTodoList(todolistId: string): void {
    this.TodoService.deleteTodoList(todolistId);
  }

  createTodoList(): void {
    this.TodoService.createTodoList(this.forms.value as string);
  }
}


