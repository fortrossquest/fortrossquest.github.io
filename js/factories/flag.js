var flag = angular.module('flag', []);

flag.factory('flag', function(){
  var factory = {};

  factory.flags = [];

  factory.addFlag = function (flag) {
    if (!factory.isFlagSet(flag))
      factory.flags.push(flag);
    console.log('set flag ' + flag);
  };

  factory.isFlagSet = function (flag) {
    return $.inArray(flag, factory.flags) != -1;
  };

  factory.removeFlag = function (flag) {
    var index = factory.flags.indexOf(flag);
    if (index > -1) {
      factory.flags.splice(index, 1);
    }
  };

  return factory;
});
