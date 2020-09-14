import {SignUpItemModel} from './signup-form.model';

const FEATURE_KEY = '[Signup]';

export class SendSignupFormAction {
  public static readonly type = `${FEATURE_KEY} Send form`;
}

export class SignupSuccessAction {
  public static readonly type = `${FEATURE_KEY} Signup success`;
}

export class SignupErrorAction {
  public static readonly type = `${FEATURE_KEY} Signup error`;
  constructor(public readonly payload: any) {}
}
