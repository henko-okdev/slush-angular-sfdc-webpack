MainController.$inject = ['MainService'];
class MainController {

    constructor(mainService) {
        this.mainService = mainService;
    }

}

module.exports = (ngModule) => {

    ngModule.component('main', {
        template: require('./main.html'),
        bindings: {},
        controller: MainController,
        controllerAs: 'vm'
    });

};

