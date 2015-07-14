# ng-notifications-bar

[Angular.js](https://angularjs.org/) and [Animate.css](http://daneden.github.io/animate.css) based component for stylish and flexible application notifications.

[Demo](http://beletsky.net/ng-notifications-bar)

## Overview

Web applications requires notify users of ongoing events. Common cases are errors, successful completion notifications etc. With `ng-notifications-bar` it's as easy as,

```html
<body>
	<notifications-bar class="notifications"></notifications-bar>
	...
```

## Installation

Npm installation,

```bash
$ npm install ng-notifications-bar --save
```

Or bower installation,

```bash
$ bower install ng-notifications-bar --save
```

Update your scripts and styles section or use the require for browserified applications.

```html
<link rel="stylesheet" href="bower_components/ng-notifications-bar/dist/ngNotificationsBar.min.css" />
<script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
<script src="bower_components/ng-notifications-bar/dist/ngNotificationsBar.min.js"></script>
```

If you use Grunt, `wiredep` should inject the required `angular-sanitize.js` for you.

For `browserify` applications, require module in yours application module,

```js
require('ng-notifications-bar');
```

In case you are using `sass` in project, it's possible to just import `ngNotificationsBar` styles,

```scss
@import "../../node_modules/ng-notifications-bar/sass/ngNotificationsBar";
```

In application module,

```js
angular.module('app', ['ngNotificationsBar', 'ngSanitize']);
```

`ngSanitize` can be omitted if HTML support isn't needed.

## API

The module consists of there elements - directive, service and provider.

### Directive

`notifications-bar` element directive, should be placed once, typically right after `<body>` open tag.

```html
<notifications-bar class="notifications"></notifications-bar>
```

If you are using a icon library besides Glyphicons for the close button (such as [Font Awesome](http://fontawesome.io)), include a `closeIcon` attribute.

```html
<notifications-bar class="notifications" closeIcon="fa fa-times-circle"></notifications-bar>
```

The default is the `glyphicon-remove` icon so don't forget to import Glyphicons if you aren't defining a `closeIcon` attribute.  

Possible to use as attribute, as well

```html
<div notifications-bar class="notifications"></div notifications-bar>
```

### Service

`notification` service is used by controllers (or other directives), to show notifications.

```js
app.controllers('app', function ($scope, api, notifications) {
	api.get({resource: 'tasks'})
		.then(function (tasks) {
			$scope.tasks = tasks;
		}, function (error) {
			notifications.showError({message: error.message});
		});

	$scope.submitTask = function () {
		api.post({resource: 'tasks'}, {description: this.description})
			.then(function () {
				notifications.showSuccess({message: 'Your task posted successfully'});
			}, function (error) {
				notifications.showError({message: 'Oh no! Task submission failed, <em>please try again.</em>'});
			});
	}
});
```

### Provider

`notificationsConfigProvider` is used to override some notifications bar defaults.

```js
app.config(['notificationsConfigProvider'], function (notificationsConfigProvider) {
	// auto hide
	notificationsConfigProvider.setAutoHide(true)

	// delay before hide
	notificationsConfigProvider.setHideDelay(3000)
}])
```

## Settings
It is possible to setup the whole notifications bar module in module config and each notification separately in controller

Available options:

- autoHide
- hideDelay
- acceptHTML
- autoHideAnimation
- autoHideAniationDelay

Please **note**, HTML support is only configurable at a global level. If HTML is to be supported, make sure to inject the `'ngSanitize'` dependency.

```js
var app = angular.module('app', ['ngNotificationsBar', 'ngSanitize']);
```


### During configuration

```js
app.config(['notificationsConfigProvider'], function (notificationsConfigProvider) {
	// auto hide
	notificationsConfigProvider.setAutoHide(true);

	// delay before hide
	notificationsConfigProvider.setHideDelay(3000);

	// support HTML
	notificationsConfigProvider.setAcceptHTML(false);
	
	// Set an animation for hiding the notification
	notificationsConfigProvider.setAutoHideAnimation('fadeOutNotifications');
	
	// delay between animation and removing the nofitication
	notificationsConfigProvider.setAutoHideAnimationDelay(1200);
	
}])
```


### Override in controller

```js
app.controller('main', function ($scope, notifications) {
	$scope.showError = function () {
		notifications.showError({
			message: 'Oops! Something bad just happened! (hides faster)',
			hideDelay: 1500, //ms
			hide: true //bool
		});
	};
});
```


## Development

Install `bower` dependencies,

```bash
$ bower install
```

Install `npm` dependencies,

```bash
$ npm install
```

Run `grunt` build,

```bash
$ grunt
```

as result, `/dist` folder is created with ready to use `.js` and `.css` file.

Project doesn't have tests at the moment, so run `example` and check the functionality,

```bash
$ grunt start:example
```

## Licence

Copyright (c) 2014, alexander.beletsky@gmail.com

MIT
