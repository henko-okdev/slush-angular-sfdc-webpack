import controller from './todo-form.controller';

const TodoFormComponent = {
    bindings: {
        todo: '<',
        onAddTodo: '&'
    },
    controller,
    controllerAs: 'vm',
    template: `
    <form name="todoForm" ng-submit="vm.onSubmit();">
      <input type="text" ng-model="vm.todo.title">
      <slds-button type="submit" title="Submit"></slds-button>
    </form>
  `
};

export default TodoFormComponent;