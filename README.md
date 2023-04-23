# AllaneSeChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## BE Issues

### Vehicle and customer are updated unexpectedly
When a contract get updated and a new vehicle/customer was selected, the vehicle/customer in the contract is still old vehicle/customer with data from new vehicle/customer. And the data of the vehicle/customer is changed unexpectedly via update contract API

### No error is thrown when a new contract is added with a used vehicle
When a request is sent with a vehicle which is selected, BE just save it, so the vehicle can be used in multiple contracts. There is no API to check if a vehicle is already used in a contract so the FE must send a request to get every contract to know if a vehicle is used. And the contract overview API need a page size param, which can't be defined in this case. The only option is doing a hack by using the number from the first API as the size to provide to the API.

## Solutions
I used Angular material and TailwindCSS for styling and Dialog. The list of customer and vehicle are lazy loaded and controlled over the LazyLoadingControl class. There are some components that share behaviors and templates, so they are extended from same abstract classes.
