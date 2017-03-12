class TodoController {
    constructor(TodoService) {
        'ngInject';
        this.todoService = TodoService;
    }

    $onInit() {
        this.newTodo = {
            title: '',
            selected: false
        };
    }

    $onChanges(changes) {
        if (changes.todoData) {
            this.todos = Object.assign({}, this.todoData);
        }
    }

    addTodo({todo}) {
        if (!todo) return;
        this.todos.unshift(todo);
        console.log(this.todos);
        this.newTodo = {
            title: '',
            selected: false
        };
    }
}

export default TodoController;