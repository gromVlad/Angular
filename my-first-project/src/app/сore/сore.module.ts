import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredentialsInterceptor } from './interceptor/credentials.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AutmMeService } from './service/authMe.service';
import { AuthGuard } from './guard/is-auth-me.guard';


@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    AutmMeService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true,
    },
  ],
})
export class СoreModule {}
