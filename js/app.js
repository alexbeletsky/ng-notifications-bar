var app = angular.module('app', ['ngNotificationsBar']);

app.controller('main', function ($scope, notifications) {
	$scope.hide = true;
	$scope.hideDelay = 1500;

	$scope.showError = function () {
		notifications.showError({message: 'Oops! Something bad just happend!', hide: $scope.hide, hideDelay: $scope.hideDelay});
	};

	$scope.showWarning = function () {
		notifications.showWarning({message: 'Hey! Take a look here..', hide: $scope.hide});
	};

	$scope.showSuccess = function () {
		notifications.showSuccess({message: 'Congrats! Life is great!', hide: $scope.hide});
	};

});
