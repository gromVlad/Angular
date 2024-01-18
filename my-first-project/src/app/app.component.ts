import { Component, OnInit } from '@angular/core';
import { TodoService, Todos } from './todoService.service';
import { Observable} from 'rxjs';

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  public todosList$!:Observable< Todos[]>
  public title: string = '';
  public error: string = '';

  constructor(private todoService: TodoService) {}


  ngOnInit(): void {
    this.todosList$ = this.todoService.todos$;

    this.getTodos()
  }

  getTodos(): void {
    this.todoService.getTodos()
  }

  deleteTodoList(todolistId: string): void {
   this.todoService.deleteTodoList(todolistId)
  }

  createTodoList(): void {
    if (this.title.trim() === '') {
      console.error('Error creating todo list: Title is required');
      return;
    }
    this.todoService.createTodoList(this.title)
    this.title = ''
  }
}


