# FedEx

Angular 10 project built by Lucas Frecia for a jot test.

### Installation

After cloning, install with npm, run the production local server, and run it to see tha app running

```sh
$ npm i
$ npm run start:prod
```

Then navigate to http://localhost:4200/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. If you have redux tools in your browser you will be able to see the working store.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Plugins

Some of the libs included that make for a better user and developer experience are:

| Plugin | README |
| ------ | ------ |
| @ngxs/store | https://ngxs.gitbook.io/ngxs/ |
| @angular/flex-layout | https://github.com/angular/flex-layout |
| @angular/material | https://material.angular.io/guides |

### Why @ngxs state management?

Using a state management library would really not be necessary for a small project. However, using such a library shows I can use this approach.

### Testing

For this project I went with the default unit testing approach since I have many other projects that use Cypress for e2e testing.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Validation decisions

The best way to validate an email address is to send an Email to the user. However for this FE only project, email validation for our clients should at least contain a fully formed domain. Angulars native email validator allows for such addresses like:
 
 -  john@doe
 
 In this case, we want to mimic web sites like Twitter or FedEx's own email validations that require the full address like
 
 - john@doe.com
 
 To achieve this I had to go with a custom validator with a regEx
