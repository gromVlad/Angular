import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildComponent } from './child/child.component';
import { AppComponent } from './main/main.component';
import { App } from './app.component';

const routes: Routes = [
  { path: 'todo', component: AppComponent },
  { path: 'form', component: ChildComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
