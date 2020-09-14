import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { SignupFormComponent } from './signup-form.component';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  NgxsModule,
  Store
} from '@ngxs/store';
import {
  DEFAULT_FORM_STATE,
  SignupFormStoreState
} from './store/signup-form-store.state';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SignupFormService } from './signup-form.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SendSignupFormAction } from './store/signup-form-store.actions';
import { AsyncEffectsHandler } from '@core/services/async-effects-handler.service';


describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let store: Store;

  const defaultValidFormValue = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'valid@email.com',
    password: 'PwdMeetsCriteria',
  };
  const signupFormServiceStub = {
    sendSignupForm: (event: any, payload: {}) => of(payload),
  };
  const asyncEffectsHandlerStub = {
    setActionsEffect: (event: any, payload: {}) => of(payload),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupFormComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: SignupFormService, useValue: signupFormServiceStub },
        { provide: AsyncEffectsHandler, useValue: asyncEffectsHandlerStub }
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
      ],
  })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SignupFormStoreState])]
    });
    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      form: DEFAULT_FORM_STATE,
      submitted: false,
    });

    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when component is created', () => {
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should have invalid email when input does not meet criteria', () => {

    component.signupForm.patchValue({ email:  'lucasgmail.com'});
    let validityValue = component.signupForm.get('email').valid;
    expect(validityValue).toBeFalsy();

    component.signupForm.patchValue({ email:  'lucas@gmail'});
    validityValue = component.signupForm.get('email').valid;
    expect(validityValue).toBeFalsy();

    component.signupForm.patchValue({ email:  'luc..as@gmail.com'});
    validityValue = component.signupForm.get('email').valid;
    expect(validityValue).toBeFalsy();

  });

  it('should have invalid password when input does not meet criteria', () => {
    component.signupForm.patchValue({ password:  'allowcasepassword'});
    let validityValue = component.signupForm.get('password').valid;
    expect(validityValue).toBeFalsy();

    component.signupForm.patchValue({ password:  'ALLCAPSPASSWORD'});
    validityValue = component.signupForm.get('password').valid;
    expect(validityValue).toBeFalsy();

    component.signupForm.patchValue({ password:  'short'});
    validityValue = component.signupForm.get('password').valid;
    expect(validityValue).toBeFalsy();

    component.signupForm.patchValue({ lastName: 'John', firstName: 'Doe', password:  'JohnDoePassword'});
    validityValue = component.signupForm.get('password').valid;
    expect(validityValue).toBeFalsy();
  });

  it('should show as valid first name when valid value inserted', () => {
    component.signupForm.patchValue({ firstName: 'John'});
    const firstName = component.signupForm.get('firstName');
    expect(firstName.valid).toBeTruthy();
  });

  it('should show as valid last name when valid value inserted', () => {
    component.signupForm.patchValue({ lastName: 'Doe'});
    const lastName = component.signupForm.get('lastName');
    expect(lastName.valid).toBeTruthy();
  });

  it('should show as valid email when valid value inserted', () => {
    component.signupForm.patchValue({ email: 'lucas@gmail.com'});
    const email = component.signupForm.get('email');
    expect(email.valid).toBeTruthy();
  });

  it('should show as valid password when valid value inserted', () => {
    component.signupForm.patchValue({ firstName: 'John', password: 'ValidPassword'});
    const email = component.signupForm.get('password');
    expect(email.valid).toBeTruthy();
  });

  it('should have a valid form when data meets validation criteria', () => {
    component.signupForm.patchValue(defaultValidFormValue);
    expect(component.signupForm.valid).toBeTruthy();
  });

  it('should dispatch form submission', () => {
    component.signupForm.patchValue(defaultValidFormValue);
    expect(component.signupForm.valid).toBeTruthy();

    store.dispatch(new SendSignupFormAction());
    const submitted = store.selectSnapshot(state => state.signupFormStore.submitted);
    expect(submitted).toBe(true);
  });
});

