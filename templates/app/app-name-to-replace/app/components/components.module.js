// Vendor
import angular from 'angular';

// Shared
// import SldsButton from './../../../../components/slds-button/slds-button.component';

// App
import Todo from './todo';

export const ComponentsModule = angular
    .module('components', [
        Todo
    ])
    .name;