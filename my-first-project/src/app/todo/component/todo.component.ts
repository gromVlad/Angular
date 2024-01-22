import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable} from 'rxjs';
import { TodoService} from '../service/todoService.service';
import { Todos } from '../module/interfaceTodo';

@Component({
  selector: 'main-root',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
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
    this.forms.reset();
  }
}


