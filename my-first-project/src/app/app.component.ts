import { Component, OnInit } from '@angular/core';
import { TodoService, Todos } from './todoService.service';
import { Observable} from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public todosList$!: Observable<Todos[]>;
  
  forms = new FormControl('');


  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todosList$ = this.todoService.todos$;

    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos();
  }

  deleteTodoList(todolistId: string): void {
    this.todoService.deleteTodoList(todolistId);
  }

  createTodoList(): void {
    this.todoService.createTodoList(this.forms.value as string);
  }
}


