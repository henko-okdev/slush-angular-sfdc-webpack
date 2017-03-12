class TodoService {
    constructor($q) {
        'ngInject';

        this.$q = $q;
    }

    getTodos() {
        return this.$q.when([
            {
                title: 'Default',
                selected: false
            },{
                title: 'Write a letter',
                selected: false
            }
        ]);
    }
}

export default TodoService;