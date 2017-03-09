MainController.$inject = ['MainService', 'AlertService'];
class MainController {

    constructor(mainService, alertService) {
        this.mainService = mainService;
        this.alertService = alertService;
    }

    showAlert() {
        this.alertService.alert('This message from Main component!');
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

