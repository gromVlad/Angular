import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, EMPTY, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BeatyLoggerServiceService } from '../../сore/service/beaty-logger-service.service';
import { ApiResponse, CreateTodoRequest, CreateTodoResponse, Todos } from '../module/interfaceTodo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos$: BehaviorSubject<Todos[]> = new BehaviorSubject<Todos[]>([]);

  private apiUrl = `${environment.apiUrl}/todo-lists`;

  constructor(
    private http: HttpClient,
    private beatyLogger: BeatyLoggerServiceService
  ) {}

  private errorhandler(error: HttpErrorResponse) {
    this.beatyLogger.log('Error', error.message);
    return EMPTY;
  }

  getTodos() {
    this.http
      .get<Todos[]>(this.apiUrl)
      .pipe(
        catchError(this.errorhandler.bind(this))
      )
      .subscribe((res) => this.todos$.next(res));
  }

  deleteTodoList(todolistId: string) {
    const url = `${this.apiUrl}/${todolistId}`;
    this.http
      .delete<ApiResponse>(url)
      .pipe(
        catchError(this.errorhandler.bind(this)),
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
      )
      .pipe(
        catchError(this.errorhandler.bind(this)),
        map((res) => {
          return [...this.todos$.getValue(), res.data.item];
        })
      )
      .subscribe((res) => this.todos$.next(res));
  }
}
