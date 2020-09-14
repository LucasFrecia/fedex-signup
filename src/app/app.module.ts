import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        CoreModule,
        FlexModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
