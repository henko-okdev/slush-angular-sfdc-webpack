import controller from './todo.controller';

const TodoComponent = {
    bindings: {
        todos: '<'
    },
    controller,
    controllerAs: 'vm',
    template: require('./todo.html')
};

export default TodoComponent;