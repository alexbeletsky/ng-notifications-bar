# Animate.scss

*Sass 3.3 is required to use Animate.scss*

Based on the wildly popular [Animate.css](https://github.com/daneden/animate.css) by [@daneden](https://github.com/daneden) Animate.scss is a SASS-version of that same library.

## What is it?
Animate.scss is a collection of fun, easy-to-use css animations for your project. There great to draw attention to objects, sliders and other awe-inspiring effects on your site.

## How to
Just drop animate.scss into your project, import it into your main stylesheet and include one of the mixins in a selector that you want to animate.

## Why SASS 3.3?
On of the great additions to SASS 3.3 is the `@at-root` function, which lets you put rules att the root of your file, even from within selectors or mixins. This makes it possible to write mixins that outputs @keyframes that we can use to animate. Take the bounce-effect for example:
```
@mixin bounce($duration: $global-duration, $function: $global-function, $delay: $global-delay, $count: $global-count, $fill: $global-fill, $visibility: $global-visibility) {
	@include animation(bounce $duration $function $delay $count $fill);
	@include visibility($visibility);

	@at-root {
		@include keyframes(bounce) {
			0%, 20%, 50%, 80%, 100% {
				@include transform(translateY(0px));
			}
			40% {
				@include transform(translateY(-30px));
			}
			60% {
				@include transform(translateY(-15px));
			}
		}
	}
}
```
So when you want to bounce something on your screen you just include that in a selecter, say a button:
```
.bouncing-button {
	@include bounce();
}
```
Run it through SASS and the resulting CSS will be:
```
.bouncing-button {
	-webkit-animation: bounce 1s ease 0.2s 1 both;
	-moz-animation: bounce 1s ease 0.2s 1 both;
	animation: bounce 1s ease 0.2s 1 both;
	-webkit-animation-backface-visibility: hidden;
	-moz-animation-backface-visibility: hidden;
	-ms-animation-backface-visibility: hidden;
	-o-animation-backface-visibility: hidden;
	animation-backface-visibility: hidden;
}

@-webkit-keyframes bounce {
	0%, 20%, 50%, 80%, 100% {
		-webkit-transform: translateY(0px);
	}
	40% {
		-webkit-transform: translateY(-30px);
	}
	60% {
		-webkit-transform: translateY(-15px);
	}
}

@-moz-keyframes bounce {
	0%, 20%, 50%, 80%, 100% {
		-moz-transform: translateY(0px);
	}
	40% {
		-moz-transform: translateY(-30px);
	}
	60% {
		-moz-transform: translateY(-15px); }
	}

@-o-keyframes bounce {
	0%, 20%, 50%, 80%, 100% {
		-o-transform: translateY(0px);
	}
	40% {
		-o-transform: translateY(-30px);
	}
	60% {
		-o-transform: translateY(-15px); }
	}

@keyframes bounce {
	0%, 20%, 50%, 80%, 100% {
		-webkit-transform: translateY(0px);
		transform: translateY(0px);
	}
 	40% {
		-webkit-transform: translateY(-30px);
		transform: translateY(-30px);
	}
	60% {
		-webkit-transform: translateY(-15px);
		transform: translateY(-15px); }
	}
```
**Whoa, hold up! That's a lot of code dude!**

Yeah, I know it looks kind of bloated. But that's due to the state of CSS animations and browser vendors. It need a whole lot of prefixing... And that's also the reason why Daniel's original project is close to 3500 lines of CSS, or 50-some kb minified.

And here's the biggest reason why SASS 3.3 is perfect for this project - it gives you easy access to all animations without bloating your code or forcing you to make that extra HTTP-request. It just includes the animations that you actually use, nothing more and nothing less.

## The catch
The only downside to animate.scss is that you need SASS 3.3 installed. But that should be installed anyway if you're into web development...

## Credit
- @daneden for the original concept in animate.css
- @jackilyn for the scss port of Daniel's work

## License
[WFTPL](http://www.wtfpl.net/)

*Tested in Chrome, Safari, Firefox and Mobile Safari*