import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Todos {
  addedDate:string,
  id:string,
  order:number,
  title:string
}

interface ApiResponse<T = {}> {
  resultCode: number;
  messages: string[];
  data: T;
}

interface CreateTodoResponse {
  item: Todos;
}

interface CreateTodoRequest {
  title: string;
}

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  todosList: Todos[] = [];
  options = {
    withCredentials: true,
    headers: {
      'api-key': 'e908cfda-79ef-4a49-94d7-a2a43ceaff44',
    },
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.http
      .get<Todos[]>(
        'https://social-network.samuraijs.com/api/1.1/todo-lists',
        this.options
      )
      .subscribe((data) => {
        this.todosList = data;
        console.log(this.todosList);
      });
  }

  deleteTodoList(todolistId: string) {
    const url = `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`;

    this.http
      .delete<ApiResponse<CreateTodoResponse>>(url, this.options)
      .subscribe((response) => {
        if (response.resultCode === 0) {
          console.log('Todo list deleted successfully');
          this.getTodos();
        } else {
          console.error('Error deleting todo list:', response.messages);
        }
      });
  }

  createTodoList(title: string) {
    const url = 'https://social-network.samuraijs.com/api/1.1/todo-lists';

    const requestBody: CreateTodoRequest = {
      title: title,
    };

    this.http
      .post<ApiResponse<CreateTodoResponse>>(url, requestBody, this.options)
      .subscribe((response) => {
        if (response.resultCode === 0) {
          console.log('Todo list created successfully');
          const createdTodo = response.data.item;
          this.todosList.push(createdTodo);
        } else {
          console.error('Error creating todo list:', response.messages);
        }
      });
  }
}
