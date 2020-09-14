import {
  State,
  Selector,
  Action,
  StateContext,
  Store
} from '@ngxs/store';
import {
  SignupStateModel,
  SignUpItemModel
} from './signup-form.model';
import { FormState } from '@core/models/form-state.model';
import {
  SendSignupFormAction,
  SignupErrorAction,
  SignupSuccessAction,
} from './signup-form-store.actions';
import { Navigate } from '@ngxs/router-plugin';
import { Injectable } from '@angular/core';
import { SignupFormService } from '../signup-form.service';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {AsyncEffectsHandler} from '@core/services/async-effects-handler.service';
import {CoreHideProgressBarAction, CoreShowProgressBarAction} from '@core/core-store/core-store.actions';

export const DEFAULT_FORM_STATE = {
  dirty: false,
  status: 'INVALID',
  model: {
    name: '',
    lastName: '',
    email: '',
  },
  errors: {}
};

@State<SignupStateModel>({
  name: 'signupFormStore',
  defaults: {
    form: DEFAULT_FORM_STATE,
    submitted: false
  },
})

@Injectable()
export class SignupFormStoreState {

  constructor(
    private store: Store,
    private service: SignupFormService,
    private asyncEffect: AsyncEffectsHandler,
  ) {

    const dispatchHandledActions = [SendSignupFormAction];

    const completedHandledActions = [SignupSuccessAction, SignupErrorAction];

    this.asyncEffect.setActionsEffect(
      dispatchHandledActions,
      new CoreShowProgressBarAction(),
      'Dispatched'
    )

    this.asyncEffect.setActionsEffect(
      completedHandledActions,
      new CoreHideProgressBarAction(),
      'Completed'
    )

  }
  @Selector()
  public static getForm(
    state: SignupStateModel
  ): FormState<SignUpItemModel> {
    return state.form;
  }

  @Action(
    SendSignupFormAction, { cancelUncompleted: true })
  public sendSignupForm(
    context: StateContext<SignupStateModel>,
    action: SendSignupFormAction
  ): Observable<SignUpItemModel> {

    const state = context.getState();
    const payload = state.form.model;

    return this.service.sendSignupForm(payload).pipe(
      tap(data => {
        const successAction = new SignupSuccessAction();
        return this.store.dispatch(successAction);
      }),
      catchError(errors => {
        const errorAction = new SignupErrorAction(errors);
        return this.store.dispatch(errorAction);
      })
    );
  }

  @Action(SignupSuccessAction)
  public signupSuccess(
    context: StateContext<SignupStateModel>,
    action: SignupSuccessAction
  ): void {

    context.patchState({
      form: DEFAULT_FORM_STATE,
      submitted: true,
    });

    this.store.dispatch(new Navigate(['/welcome-page']));
  }

  @Action(SignupErrorAction)
  public signupError(
    context: StateContext<SignupStateModel>,
    action: SignupErrorAction
  ): void {
    this.store.dispatch(new Navigate(['/error-page']));
  }
}
