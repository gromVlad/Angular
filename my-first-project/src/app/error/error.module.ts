import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { PageNotFoundComponent } from './component/page-not-found.component';


@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, ErrorRoutingModule],
})
export class ErrorModule {}
