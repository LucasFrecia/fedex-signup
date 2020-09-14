import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { CoreState } from './core-store/core-store.state';
import { environment } from '@environment/environment';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { HeaderModule } from './modules/header/header.module';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

const modules = [
    HttpClientModule,
    BrowserModule,
    MatProgressBarModule,
    HeaderModule,
];

@NgModule({
  imports: [
    modules,
    NgxsModule.forRoot([CoreState], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    NgxsFormPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot()
  ],
  exports: [
    modules
  ]
})
export class CoreModule { }
