var inventory = angular.module('inventory', []);

inventory.factory('inventory', function(){
  var factory = {};

  factory.items = [];
  factory.pickedup_items = [];

  factory.addItem = function (item, origin) {
    factory.items.push(item);
    factory.pickedup_items.push(origin + '@' + item);
  };

  factory.hasItem = function (item) {
    return $.inArray(item, factory.items) != -1;
  };

  factory.removeItem = function (item) {
    var index = factory.items.indexOf(item);
    if (index > -1) {
      factory.items.splice(index, 1);
    }
  };

  factory.isItemPickedUp = function (item, scene) {
    return $.inArray(scene + '@' + item, factory.pickedup_items) != -1;
  };

  return factory;
});
