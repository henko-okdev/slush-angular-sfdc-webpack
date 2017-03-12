class TodoFormController {
    constructor(EventEmitter) {
        'ngInject';
        this.EventEmitter = EventEmitter;
    }

    $onChanges(changes) {
        if (changes.todo) {
            this.todo = Object.assign({}, this.todo);
        }
    }

    onSubmit() {
        if (!this.todo.title) return;
        // with EventEmitter wrapper
        this.onAddTodo(
            this.EventEmitter({
                todo: this.todo
            })
        );
        // without EventEmitter wrapper
        /*this.onAddTodo({
             $event: {
                todo: this.todo
             }
         });*/
    }
}

export default TodoFormController;