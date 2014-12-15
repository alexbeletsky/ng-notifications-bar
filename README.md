# ng-notifications-bar

[Angular.js](https://angularjs.org/), [Animate.css](http://daneden.github.io/animate.css), [Glyphicons](http://glyphicons.com/), based component for stylish and flexible application notifications.

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
<script scr="bower_components/angular-notifications-bar/dist/ng-notifications-bar.min.js"></script>
```

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
angular.module('app', ['ngNotificationsBar']);
```

Please **note**, since `ng-notifications-bar` have a dependency on `glyphicons` you have to copy `/fonts` folder into yours `/public` folder manually.

## API

The module consists of there elements - directive, service and provider.

### Directive

`notifications-bar` element directive, should be placed once, typically right after `<body>` open tag.

```html
<notifications-bar class="notifications"></notifications-bar>
```

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
				notifications.showError({message: 'Oh no! Task submission failed, please try again.'});
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


### During configuration

```js
app.config(['notificationsConfigProvider'], function (notificationsConfigProvider) {
	// auto hide
	notificationsConfigProvider.setAutoHide(true);

	// delay before hide
	notificationsConfigProvider.setHideDelay(3000);
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
