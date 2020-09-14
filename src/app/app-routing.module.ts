import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { APP_UNKNOWN_PATH_REDIRECT_TO_DEFAULT_ROUTE } from '@core/core.config';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/signup-form/signup-form.module').then(m => m.SignupFormModule)
  },
  {
    path: 'welcome-page',
    loadChildren: () => import('./views/welcome-page/welcome-page.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'error-page',
    loadChildren: () => import('./views/error-page/error-page.module').then(m => m.ErrorPageModule)
  },
  APP_UNKNOWN_PATH_REDIRECT_TO_DEFAULT_ROUTE
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        scrollPositionRestoration: 'top',
        preloadingStrategy: PreloadAllModules
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
