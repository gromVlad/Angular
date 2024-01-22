import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './component/todo.component';
import { AuthGuard } from '../сore/guard/is-auth-me.guard';

const routes: Routes = [
  { path: 'todo', component: TodoComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
