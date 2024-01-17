import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  private apiUrl = `${environment.apiUrl}/todo-lists`;
  private options = {
    withCredentials: true,
    headers: {
      'api-key': `${environment.apiKey}/todo-lists`,
    },
  };

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todos[]> {
    return this.http.get<Todos[]>(this.apiUrl, this.options);
  }

  deleteTodoList(todolistId: string): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${todolistId}`;
    return this.http.delete<ApiResponse>(url, this.options);
  }

  createTodoList(title: string): Observable<ApiResponse<CreateTodoResponse>> {
    const requestBody: CreateTodoRequest = {
      title,
    };
    return this.http.post<ApiResponse<CreateTodoResponse>>(
      this.apiUrl,
      requestBody,
      this.options
    );
  }
}
