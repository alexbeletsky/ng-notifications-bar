(function (window, angular) {
	var module = angular.module('ngNotificationsBar', []);

	module.provider('ngNotificationsBar', function () {
		this.$get = function () {
			return this;
		};
	});

	module.directive('ngNotificationsBar', function () {

	});

})(window, angular);
