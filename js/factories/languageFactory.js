var lang = angular.module('lang', []);

lang.factory('lang', function(){
  var factory = {};

  factory.id = "eng";

  factory.toggle = function () {
    if (factory.id == 'eng')
      factory.id = 'rus';
    else
      factory.id = 'eng';
  };

  factory.set = function (id) {
    factory.id = id;
  };

  return factory;
});
