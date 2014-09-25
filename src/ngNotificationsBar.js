(function (window, angular) {
	var module = angular.module('ngNotificationsBar', []);

	module.provider('ngNotificationsBar', function () {
		this.$get = function () {
			return this;
		};
	});

	module.factory('notifications', function () {
		var showError = function (message) {
			console.log('error ' + message);
		};

		var showWarning = function (message) {
			console.log('warning' + message);
		};

		var showSuccess = function (message) {
			console.log('success' + message);
		};

		return {
			showError: showError,
			showWarning: showWarning,
			showSuccess: showSuccess
		};
	});

	module.directive('ngNotificationsBar', function () {

	});
})(window, angular);
