import angular from 'angular';
import uiRouter from 'angular-ui-router';
import TodoComponent from './todo.component';
import TodoService from './todo.service';
import TodoForm from './todo-form';
import TodoList  from './todo-list';

const todo = angular
    .module('todo', [
        uiRouter,
        TodoForm,
        TodoList
    ])
    .component('todo', TodoComponent)
    .service('TodoService', TodoService)
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject';

        $stateProvider
            .state({
                name: 'todos',
                url: '/todos',
                component: 'todo',
                resolve: {
                    todos: (TodoService) => {
                        'ngInject';
                        return TodoService.getTodos();
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    })
    .name;

export default todo;