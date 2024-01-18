import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService, Todos } from './todoService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit,OnDestroy {
  public todosList: Todos[] = [];
  public title: string = '';
  public error: string = '';

  subscriptions:Subscription = new Subscription()

  constructor(private todoService: TodoService) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.subscriptions.add(this.todoService.getTodos().subscribe((data) => {
      this.todosList = data;
      console.log(this.todosList);
      console.log(this.title);
    }))
  }

  deleteTodoList(todolistId: string): void {
    this.subscriptions.add(this.todoService.deleteTodoList(todolistId).subscribe({
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
    }))
  }

  createTodoList(): void {
    if (this.title.trim() === '') {
      console.error('Error creating todo list: Title is required');
      return;
    }

    this.subscriptions.add(this.todoService.createTodoList(this.title).subscribe({
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
    }))
  }
}


