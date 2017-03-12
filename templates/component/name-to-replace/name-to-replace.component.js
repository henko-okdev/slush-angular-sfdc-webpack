import controller from './<%= componentNameSlug %>.controller';
import styles from './<%= componentNameSlug %>.less';

const <%= componentNameClassed %>Component = {
    bindings: {},
    controller,
    controllerAs: 'vm',
    template: require('./<%= componentNameSlug %>.html')
};

export default <%= componentNameClassed %>Component;