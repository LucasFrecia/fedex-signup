import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page.component';
import { WelcomePageRoutingModule } from './welcome-page.routing.module';
import { SharedModule } from '@shared/*';

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [
    CommonModule,
    SharedModule,
    WelcomePageRoutingModule,
  ]
})
export class WelcomePageModule { }
