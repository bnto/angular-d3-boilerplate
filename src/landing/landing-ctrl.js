angular.module('%module%.landing')
.controller('LandingCtrl', function($scope, $http) {

  $scope.users = [];
  $scope.availableRoles = ['USER', 'EDITOR', 'ADMIN'];
  $scope.expand = false;

  $http.get('data/users.csv')
  .then(function(res) {
    $scope.users = Papa.parse(res.data, {
      header: true,
      delimiter: ',',
      dynamicTyping: true,
      skipEmptyLines: true
    }).data;
  });
  

  $scope.getUserInitials = function(firstname, lastname) {
  	// first (& second if applicable) initials of firstname + last initial of lastname
  	return firstname.match(/\b([a-zA-Z])/g).slice(0,2).join('') + lastname.match(/(\w)\w*$/)[1]
  };

  $scope.parseUserRoles = function(roles) {
  	return roles.split(';').join(', ');
  };
  $scope.checkRoles = function (item, list) {
  	return list.indexOf(item) > -1;
  };
  $scope.updateRoles = function (item, list) {
  	list = (list === '') ? [] : list.split(';');
  	var idx = list.indexOf(item);
  	if (idx > -1) {
  		list.splice(idx, 1);
  	}
  	else {
  		list.push(item);
  	};
  	return (list === []) ? '' : list.join(';');
  };

});
