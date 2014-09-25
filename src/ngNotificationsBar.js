(function (window, angular) {
	var module = angular.module('ngNotificationsBar', []);

	module.provider('ngNotificationsBar', function () {
		this.$get = function () {
			return this;
		};
	});

	module.factory('notifications', ['$rootScope', function ($rootScope) {
		var showError = function (message) {
			$rootScope.$broadcast('notifications:error', message);
		};

		var showWarning = function (message) {
			$rootScope.$broadcast('notifications:warning', message);
		};

		var showSuccess = function (message) {
			$rootScope.$broadcast('notifications:success', message);
		};

		return {
			showError: showError,
			showWarning: showWarning,
			showSuccess: showSuccess
		};
	}]);

	module.directive('ngNotificationsBar', function () {
		return {
			restrict: 'EA',
			template: '\
				<div class="container" ng-repeat="error in errors">\
					<div class="{{error.type}}">\
						{{error.message}}\
						<span class="close-click" ng-click="close($index)">x</span>\
					</div>\
				</div>\
			',
			link: function (scope) {
				var errors = scope.errors = [];

				scope.$on('notifications:error', function (event, data) {
					errors.push({type: 'error', message: data});
				});

				scope.close = function (index) {
					errors.splice(index, 1);
				};
			}
		};
	});

})(window, angular);
