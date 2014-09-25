var app = angular.module('app', ['ngNotificationsBar']);

app.controller('main', function ($scope, notifications) {
	$scope.showError = function () {
		notifications.showError('Oops! Something bad just happend!');
	};

	$scope.showWarning = function () {
		notifications.showWarning('Hey! Take a look here..');
	};

	$scope.showSuccess = function () {
		notifications.showSuccess('Congrats! Life is great!');
	};

});
