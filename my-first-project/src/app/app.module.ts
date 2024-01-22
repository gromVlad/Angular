import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { App } from './app.component';
import { СoreModule } from './сore/сore.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';
import { SharedModule } from './shared/shared.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { ErrorModule } from './error/error.module';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    СoreModule,
    AuthModule,
    HomeModule,
    ProfileModule,
    SharedModule,
    TodoModule,
    UserModule,
    ErrorModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [App],
})
export class AppModule {}
