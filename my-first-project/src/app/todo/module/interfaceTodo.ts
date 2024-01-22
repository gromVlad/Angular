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
