CardController.$inject = [];
class CardController {

    constructor() {

    }

    $onInit() {
        // do some staff after controller initialization
    }

}

module.exports = (ngModule) => {
  ngModule.component('Card', {
      template: require('./sldsButton.html'),
      bindings: {
          title: '@',

          onClick: '&'
      },
      controller: CardController,
      controllerAs: 'vm'
  });
};