import { Route } from '@angular/router';

export const APP_DEFAULT_URL = '/';
export const APP_SIGNUP_URI = 'https://demo-api.now.sh/users';
export const APP_UNKNOWN_PATH_REDIRECT_TO_DEFAULT_ROUTE: Route = {
    path: '**',
    redirectTo: APP_DEFAULT_URL
};
export const APP_EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


