var app = angular.module('app', ['ngNotificationsBar']);

app.controller('main', function ($scope, notifications) {
	$scope.showError = function () {
		notifications.showError('Oops! Something bad just happend!');
	};
});
