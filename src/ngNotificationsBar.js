(function (root, factory) {
	if (typeof exports === 'object') {
		// CommonJS
		module.exports = factory(root, require('angular'));
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define(['angular'], function (angular) {
			return (root.ngNotificationsBar = factory(root, angular));
		});
	} else {
		// Global Variables
		root.ngNotificationsBar = factory(root, root.angular);
	}
}(this, function (window, angular) {
	return ngNotificationsBar(window, angular);
}));

function ngNotificationsBar(window, angular) {
	var module = angular.module('ngNotificationsBar', []);

	module.provider('notificationsConfig', function() {
		var config = {};

		function setHideDelay(value){
			config.hideDelay = value;
		}

		function getHideDelay(){
			return config.hideDelay;
		}

		function setAutoHide(value){
			config.autoHide = value;
		}

		function getAutoHide(){
			return config.autoHide;
		}

		return {
			setHideDelay: setHideDelay,

			setAutoHide: setAutoHide,

			$get: function(){
				return {
					getHideDelay: getHideDelay,

					getAutoHide: getAutoHide
				};
			}
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

	module.directive('notificationsBar', function (notificationsConfig, $timeout) {
		return {
			restrict: 'EA',
			template: '\
				<div class="notifications-container" ng-if="notifications.length">\
					<div class="{{note.type}}" ng-repeat="note in notifications">\
						<span class="message">{{note.message}}</span>\
						<span class="glyphicon glyphicon-remove close-click" ng-click="close($index)"></span>\
					</div>\
				</div>\
			',
			link: function (scope) {
				var notifications = scope.notifications = [];
				var timers = [];
				var autoHideDelay = notificationsConfig.getHideDelay() || 3000;
				var autoHide = notificationsConfig.getAutoHide() || false;

				var removeById = function (id) {
					var found = -1;

					notifications.forEach(function (el, index) {
						if (el.id === id) {
							found = index;
						}
					});

					if (found >= 0) {
						notifications.splice(found, 1);
					}
				};

				var notificationHandler = function (event, data, type) {
					var message, hide = autoHide, hideDelay = autoHideDelay;

					if (typeof data === 'object') {
						message = data.message;
						hide = (typeof data.hide === 'undefined') ? autoHide : !!data.hide;
						hideDelay = data.hideDelay || hideDelay;
					} else {
						message = data;
					}

					var id = 'notif_' + (Math.floor(Math.random() * 100));
					notifications.push({id: id, type: type, message: message});
					if (hide) {
						var timer = $timeout(function () {
							removeById(id);
							$timeout.cancel(timer);
						}, hideDelay);
					}
				};

				scope.$on('notifications:error', function (event, data) {
					notificationHandler(event, data, 'error');
				});

				scope.$on('notifications:warning', function (event, data) {
					notificationHandler(event, data, 'warning');
				});

				scope.$on('notifications:success', function (event, data) {
					notificationHandler(event, data, 'success');
				});

				scope.close = function (index) {
					notifications.splice(index, 1);
				};
			}
		};
	});

	return module;
}
