import controller from './slds-button.controller';
import styles from './slds-button.less';

const SldsButtonComponent = {
      template: require('./slds-button.html'),
      bindings: {
          title: '@',
          type: '@',

          onClick: '&'
      },
      controller,
      controllerAs: 'vm'
};

export default SldsButtonComponent;