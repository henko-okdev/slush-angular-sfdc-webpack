'use strict';
import angular from "angular";

// define a generic angular module
// pass the generic module reference to all required components and controllers.
const ngModule = angular.module('ExampleApplication');

ngModule.config(() => {
    // Configure your application here
});

// require application dependencies
require('./components/main/index')(ngModule);
require('./services/MainService')(ngModule);

// require shared dependencies
require('./../../../components/sldsButton')(ngModule);
require('./../../../services/AlertService')(ngModule);






