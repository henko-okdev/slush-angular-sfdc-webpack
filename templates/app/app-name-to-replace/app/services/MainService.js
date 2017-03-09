MainService.$inject = [];
class MainService {

    constructor() {}

    getData() {
        return [
            {
                name: 'John'
            },
            {
                name: 'Frank'
            }
        ];
    }
}

module.exports = (ngModule) => {
    ngModule.service('MainService', MainService);
};