var DialogCtrl = angular.module('DialogCtrl', ['lang', 'dialogSetter', 'inventory', 'flag']);

DialogCtrl.controller('DialogCtrl', function ($scope, $http, lang, dialogSetter, inventory, flag) {
  $scope.id = "";
  $scope.data = [];
  $scope.lang = lang;
  $scope.response = '';
  $scope.branches = [];
  $scope.person = '';
  $scope.show = false;
  $scope.close = {
    "eng": "Close",
    "rus": "Закрыть"
  };
  $scope.close_go_to = false;
  $scope.audio_path = "";
  $scope.visited_paths = [];

  $scope.openDialog = function (id) {
    $scope.id = id;
    $http.get('game/dialogs/' + id + '.json')
      .then(function (res) {
        $scope.data = res.data;
        if ($scope.isAllowedBranch('intro')) {
          $scope.show = true;
          $scope.goTo('intro', true);
        }
      });
  };

  $scope.isAllowedBranch = function (id) {
    var has_all = true;
    if ($scope.data[id].required_items) {
      $scope.data[id].required_items.forEach(function (item) {
        if (!inventory.hasItem(item))
          has_all = false;
      });
    }
    if ($scope.data[id].required_items_not) {
      $scope.data[id].required_items_not.forEach(function (item) {
        if (inventory.hasItem(item))
          has_all = false;
      });
    }
    if ($scope.data[id].required_flags) {
      $scope.data[id].required_flags.forEach(function (f) {
        if (!flag.isFlagSet(f))
          has_all = false;
      });
    }
    if ($scope.data[id].required_flags_not) {
      $scope.data[id].required_flags_not.forEach(function (f) {
        if (flag.isFlagSet(f))
          has_all = false;
      });
    }
    if ($.inArray(id, $scope.visited_paths) != -1)
      has_all = false;
    return has_all;
  };

  $scope.goTo = function (id, b) {
    e = $scope.data[id];
    if (!b) {
      if (e.required_items)
        e.required_items.forEach(function (item) {
          inventory.removeItem(item);
        });
      if (e.give_items)
        e.give_items.forEach(function (item) {
          inventory.addItem(item);
        });
      if (e.set_flags)
        e.set_flags.forEach(function (f) {
          flag.addFlag(f);
        });
      if (e.unset_flags)
        e.unset_flags.forEach(function (f) {
          flag.removeFlag(f);
        });
      dialogSetter.setBranch(id);
    }
    else {
      $scope.visited_paths.push(id);
      $scope.audio_path = "game/audio/" + $scope.id + "." + lang.id + "/" + id + ".mp3";
      $scope.response = e.response;
      $scope.branches = [];
      if (e.branches) {
        $scope.branches = e.branches.filter(function (en) {
          return $scope.isAllowedBranch(en);
        });
      }
      if (e.person)
        $scope.person = e.person;
      $scope.close_go_to = false;
      if (e.close_go_to)
        $scope.close_go_to = e.close_go_to;
      //var a = document.getElementsByTagName("audio")[0];
      //a.src = $scope.audio_path;
      //a.play();
    }
  };

  $scope.closeDialog = function (b) {
    $scope.show = false;
    if (!b)
      dialogSetter.closeDialog();
  };

  $scope.$on('setDialog', function() {
    $scope.openDialog(dialogSetter.id);
  });

  $scope.$on('setDialogBranch', function() {
    $scope.goTo(dialogSetter.branch, true);
  });

  $scope.$on('closeDialog', function() {
    $scope.closeDialog(true);
  });
});
