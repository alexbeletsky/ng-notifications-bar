# ng-notifications-bar

[Angular.js](https://angularjs.org/), [Animate.css](http://daneden.github.io/animate.css), [Glyphicons](http://glyphicons.com/), based component for stylish and flexible application notifications.

[Demo](http://beletsky.net/ng-notifications-bar)

## Overview

Web applications requires notify users of ongoing events. Common cases are errros, successful completion notifications etc. With `ng-notifications-bar` it's as easy as,

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

In application module,

```js
angular.module('app', ['ngNotificationsBar']);
```

## API

The module consists of there elements - directive, service and provider.

### Directive

`notifications-bar` element directive, should be placed once, typically righ after `<body>` open tag.

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
		api.post({resouce: 'tasks'}, {description: this.description})
			.then(function () {
				notifications.showSuccess({message: 'Your task posted successfully'});
			}, function (error) {
				notifications.showError({message: 'Oh no! Task submition failed, please try again.'});
			});
	}
});
```

### Provider

`notificationConfigProvider` is used to override some notifications bar defaults.

```js
app.config(['notificationConfigProvider'], function (notificationConfigProvider) {
	// predefined messages
	notificationConfigProvider.setMessage('error', 'Sorry, something bad just happend. Please try it again.');
	notificationConfigProvider.setMessage('success', 'Congrats! The operation completed successully.');

	// animation config
	notificationConfigProvider.animationMethod('fadeInDown')
}])
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
