var app = angular.module('app', ['ngNotificationsBar']);
app.config(['notificationsConfigProvider', function(notificationsConfigProvider){
	notificationsConfigProvider.setHideDelay(3000);
	notificationsConfigProvider.setAutoHide(true);
}]);

app.controller('main', function ($scope, notifications) {
	$scope.showError = function () {
		notifications.showError({message: 'Oops! Something bad just happend! (hides faster)', hideDelay: 1500});
	};

	$scope.showWarning = function () {
		notifications.showWarning({message: 'Hey! Take a look here.. (doesn\'t hide)', hide: false});
	};

	$scope.showSuccess = function () {
		notifications.showSuccess({message: 'Congrats! Life is great! (uses default settings)'});
	};

});
