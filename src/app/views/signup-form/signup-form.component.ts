import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { transitions } from '@core/animations/animations';
import { CoreComponent } from '@core/core.component';
import {
  Select,
  Store
} from '@ngxs/store';
import {
  SendSignupFormAction
} from './store/signup-form-store.actions';
import {
  CustomErrorStateMatcher,
  firstNameInPasswordValidator,
  lastNameInPasswordValidator,
  lowerUppercaseValidator
} from '@core/helpers/forms/error.helpers';
import { APP_EMAIL_REGEX } from '@core/core.config';
import { Observable } from 'rxjs';
import { CoreState } from '@core/core-store/core-store.state';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  animations: [transitions],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent extends CoreComponent implements OnInit {

  @Select(CoreState.isProgressBarShowing)
  public isLoading$: Observable<boolean>;

  public signupForm: FormGroup;
  public passwordMinLength = 8;
  public matcher;

  get password(): AbstractControl {
    return this.signupForm.get('password');
  }

  constructor(private fb: FormBuilder, private store: Store) {
    super();
  }

  ngOnInit(): void {

    this.signupForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(APP_EMAIL_REGEX)]],
      password: [null, [
        Validators.minLength(this.passwordMinLength),
        Validators.required,
        lowerUppercaseValidator
      ]],
    }, { validators:  [firstNameInPasswordValidator, lastNameInPasswordValidator] });

    this.matcher = new CustomErrorStateMatcher();
  }

  onSubmit(): void {
    this.store.dispatch(new SendSignupFormAction());
  }
}
