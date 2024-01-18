import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Todos {
  addedDate: string;
  id: string;
  order: number;
  title: string;
}

export interface ApiResponse<T = {}> {
  resultCode: number;
  messages: string[];
  data: T;
}

export interface CreateTodoResponse {
  item: Todos;
}

export interface CreateTodoRequest {
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos$: BehaviorSubject<Todos[]> = new BehaviorSubject<Todos[]>([]);

  private apiUrl = `${environment.apiUrl}/todo-lists`;
  private options = {
    withCredentials: true,
    headers: {
      'api-key': `${environment.apiKey}/todo-lists`,
    },
  };

  constructor(private http: HttpClient) {}

  getTodos() {
    this.http
      .get<Todos[]>(this.apiUrl, this.options)
      .subscribe((res) => this.todos$.next(res));
  }

  deleteTodoList(todolistId: string) {
    const url = `${this.apiUrl}/${todolistId}`;
    this.http
      .delete<ApiResponse>(url, this.options)
      .pipe(
        map((res) => {
          return this.todos$
            .getValue()
            .filter((todo) => todo.id !== todolistId);
        })
      )
      .subscribe((res) => this.todos$.next(res));
  }

  createTodoList(title: string) {
    const requestBody: CreateTodoRequest = {
      title,
    };
    this.http
      .post<ApiResponse<CreateTodoResponse>>(
        this.apiUrl,
        requestBody,
        this.options
      )
      .pipe(
        map((res) => {
          return [...this.todos$.getValue(), res.data.item];
        })
      )
      .subscribe((res) => this.todos$.next(res));
  }
}
