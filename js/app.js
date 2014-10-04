var app = angular.module('app', ['ngNotificationsBar']);

app.controller('main', function ($scope, notifications) {
	$scope.hide = true;

	$scope.showError = function () {
		notifications.showError({message: 'Oops! Something bad just happend!', hide: $scope.hide});
	};

	$scope.showWarning = function () {
		notifications.showWarning({message: 'Hey! Take a look here..', hide: $scope.hide});
	};

	$scope.showSuccess = function () {
		notifications.showSuccess({message: 'Congrats! Life is great!', hide: $scope.hide});
	};

});
