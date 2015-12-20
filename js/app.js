var FortRossApp = angular.module('FortRossApp', [
  'SceneCtrl',
  'InventoryCtrl',
  'DialogCtrl',
  'ngRoute',
  'ngSanitize'
]);

FortRossApp.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
      when('/:lang/:sceneId', {
        templateUrl: 'partials/scene/index.html',
        controller: 'SceneCtrl'
      }).
      otherwise({
        redirectTo: '/eng/title'
      });
  }
]);
