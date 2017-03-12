'use strict';
// Vendor
import angular from "angular";
import uiRouter from 'angular-ui-router';

// App
import {AppComponent} from './app.component';
import {ComponentsModule} from './components/components.module';
import {CommonModule} from './common/common.module';

export const AppModule = angular
    .module('app', [
        ComponentsModule,
        CommonModule,
        uiRouter
    ])
    .component('app', AppComponent)
    .config(function($stateProvider) {
        const main = {
            name: 'main',
            url: '/',
            template: '<h3>Hi! This is a starting point of your Application!</h3>'
        };

        $stateProvider.state(main);
    })
    .name;