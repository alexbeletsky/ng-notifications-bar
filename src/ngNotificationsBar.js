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

	module.directive('notificationsBar', function ($timeout) {
		return {
			restrict: 'EA',
			template: '\
				<div class="container">\
					<div class="{{note.type}}" ng-repeat="note in notifications">\
						<span class="message">{{note.message}}</span>\
						<span class="glyphicon glyphicon-remove close-click" ng-click="close($index)"></span>\
					</div>\
				</div>\
			',
			link: function (scope) {
				var notifications = scope.notifications = [];
				var timers = [];

				scope.$on('notifications:error', function (event, data) {
					var message, hide;

					if (typeof data === 'object') {
						message = data.message;
						hide = data.hide;
					} else {
						message = data;
					}

					var index = notifications.push({type: 'error', message: message});

					if (hide) {
						var timer = $timeout(function () {
							// remove notification
							notifications.splice(index - 1, 1);
							// clear timeout
							$timeout.cancel(timer);
						}, 1000);
					}
				});

				scope.$on('notifications:warning', function (event, data) {
					notifications.push({type: 'warning', message: data});
				});

				scope.$on('notifications:success', function (event, data) {
					notifications.push({type: 'success', message: data});
				});

				scope.close = function (index) {
					notifications.splice(index, 1);
				};
			}
		};
	});

})(window, angular);
