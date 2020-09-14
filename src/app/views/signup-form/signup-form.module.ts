import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupFormComponent } from './signup-form.component';
import { SignupFormRoutingModule } from './signup-form.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/*';
import { NgxsModule } from '@ngxs/store';
import { SignupFormStoreState } from './store/signup-form-store.state';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { AsyncEffectsHandler } from '@core/services/async-effects-handler.service';

@NgModule({
  declarations: [SignupFormComponent],
  imports: [
    CommonModule,
    SignupFormRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgxsModule.forFeature([
      SignupFormStoreState
    ]),
    NgxsFormPluginModule,
  ],
  providers: [AsyncEffectsHandler]
})
export class SignupFormModule { }
