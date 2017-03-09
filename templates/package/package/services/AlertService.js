SharedService.$inject = [ '$timeout' ];
class SharedService {

    constructor($timeout) {
        this.$timeout = $timeout;
    }

    alert(message) {
        this.$timeout(() => {
            alert(message);
        }, 1000)
    }
}

module.exports = function(ngModule) {
    ngModule.service('SharedService', SharedService);
};

