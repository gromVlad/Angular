import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Todos {
  addedDate:string,
  id:string,
  order:number,
  title:string
}

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  todosList: Todos[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Todos[]>(
        'https://social-network.samuraijs.com/api/1.1//todo-lists',
        {
          withCredentials: true,
          headers: {
            'api-key': 'e908cfda-79ef-4a49-94d7-a2a43ceaff44',
          },
        }
      )
      .subscribe((data) => {
        this.todosList = data;
        console.log(this.todosList);
        
      });
  }
}
