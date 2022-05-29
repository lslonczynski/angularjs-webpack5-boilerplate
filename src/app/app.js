import angular from 'angular';

import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor() {
    this.repo = 'https://github.com/lslonczynski/angularjs-webpack5-boilerplate';
  }
}


angular.module('app', [])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);
