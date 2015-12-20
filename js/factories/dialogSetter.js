var dialogSetter = angular.module('dialogSetter', ['lang']);

dialogSetter.factory('dialogSetter', function($rootScope) {
  var dialogSetter = {};

  dialogSetter.id = '';
  dialogSetter.branch = '';

  dialogSetter.setDialog = function(id) {
    this.id = id;
    $rootScope.$broadcast('setDialog');
  };

  dialogSetter.setBranch = function(branch) {
    this.branch = branch;
    $rootScope.$broadcast('setDialogBranch');
  };

  dialogSetter.closeDialog = function() {
    $rootScope.$broadcast('closeDialog');
  };

  return dialogSetter;
});
