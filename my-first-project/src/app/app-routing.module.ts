import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildComponent } from './child/child.component';
import { AppComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'form', component: ChildComponent },
  { path: 'users', component: UsersComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: '404', component: PageNotFoundComponent },
  //неизвестный путь
  { path: '**', redirectTo: '404' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
