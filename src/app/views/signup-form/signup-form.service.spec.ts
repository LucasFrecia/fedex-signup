import { TestBed } from '@angular/core/testing';

import { SignupFormService } from './signup-form.service';
import {SignupFormComponent} from './signup-form.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

describe('SignupFormService', () => {
  let service: SignupFormService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignupFormService]
    });

    // inject the service
    service = TestBed.get(SignupFormService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
