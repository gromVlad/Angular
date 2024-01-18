import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildComponent } from './child/child.component';
import { AppComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { App } from './app.component';

const routes: Routes = [
  { path: 'todo', component: AppComponent },
  { path: 'form', component: ChildComponent },
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
