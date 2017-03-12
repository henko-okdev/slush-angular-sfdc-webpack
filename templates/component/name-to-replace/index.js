import angular from 'angular';
import <%= componentNameClassed %>Component from './<%= componentNameSlug %>.component'

const <%= moduleNameClassed %>Module = angular
        .module('<%= moduleName %>', [])
        .config(() => {
            'ngInject';
        })
        .component('<%= componentNameCamel %>', <%= componentNameClassed %>Component)
        .name;

export default <%= moduleNameClassed %>;