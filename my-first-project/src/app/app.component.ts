import { Component, OnInit } from '@angular/core';
import { TodoService, Todos } from './todoService.service';

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public todosList: Todos[] = [];
  public title: string = '';
  public error: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((data) => {
      this.todosList = data;
      console.log(this.todosList);
      console.log(this.title);
    });
  }

  deleteTodoList(todolistId: string): void {
    this.todoService.deleteTodoList(todolistId).subscribe({
      next: (response) => {
        if (response.resultCode === 0) {
          console.log('Todo list deleted successfully');
          this.getTodos();
        } else {
          console.error('Error deleting todo list:', response.messages);
        }
      },
      error: (e) => {
        this.error = `${e}`;
      },
      complete: () => console.log('done'),
    });
  }

  createTodoList(): void {
    if (this.title.trim() === '') {
      console.error('Error creating todo list: Title is required');
      return;
    }

    this.todoService.createTodoList(this.title).subscribe({
      next: (response) => {
        if (response.resultCode === 0) {
          console.log('Todo list created successfully');
          const createdTodo = response.data.item;
          this.todosList.push(createdTodo);
          this.title = '';
        } else {
          console.error('Error creating todo list:', response.messages);
        }
      },
      error: (e) => {
        this.error = `${e}`;
      },
      complete: () => console.log('done'),
    });
  }
}
