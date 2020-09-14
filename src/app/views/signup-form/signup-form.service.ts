import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  throwError
} from 'rxjs';
import { SignUpItemModel } from './store/signup-form.model';
import { tap, catchError } from 'rxjs/operators';
import { APP_SIGNUP_URI } from '@core/core.config';

@Injectable({
  providedIn: 'root'
})
export class SignupFormService {

  constructor(private http: HttpClient) { }

  public sendSignupForm(payload: SignUpItemModel): Observable<SignUpItemModel> {
    return this.http.post<any>(APP_SIGNUP_URI, payload).pipe(
      tap(data => console.log(`${SignupFormService.name}::sendSignupForm (tap)\n\t data: %o`, data)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error(`${SignupFormService.name}::handleError\n\t data: %o`, error);
    return throwError(error);
  }}
