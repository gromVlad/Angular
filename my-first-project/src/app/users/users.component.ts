import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserService } from '../service/users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$!: Observable<User[]>;
  currentPage: number = 1;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:Params) => {
      this.getUsers(params["page"] ? params["page"] : this.currentPage )
    })
  }

  getUsers(page: number) {
    this.users$ = this.userService.getUsers(page);
  }

  nextPageUsers() {
    this.currentPage++;
     this.router
       .navigate(['/users'], { queryParams: { page: this.currentPage } })
  }
}

