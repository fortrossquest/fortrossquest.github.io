var InventoryCtrl = angular.module('InventoryCtrl', []);

InventoryCtrl.controller('InventoryCtrl', function ($scope) {
  open = false;

  $scope.isOpen = function () {
    return open;
  };

  $scope.hideOverlay = function () {
    open = false;
  };

  $scope.showOverlay = function () {
    open = true;
  };
});
