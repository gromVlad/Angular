import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './component/todo.component';


@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class TodoModule { }
