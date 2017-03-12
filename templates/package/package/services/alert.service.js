class AlertService {

    constructor($timeout) {
        'ngInject';
        this.$timeout = $timeout;
    }

    alert(message) {
        this.$timeout(() => {
            alert(message);
        }, 1000)
    }
}

export default AlertService;

