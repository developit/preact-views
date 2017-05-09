# preact-views

[![Greenkeeper badge](https://badges.greenkeeper.io/developit/preact-views.svg)](https://greenkeeper.io/)

[![NPM](http://img.shields.io/npm/v/preact-views.svg)](https://www.npmjs.com/package/preact-views)
[![travis-ci](https://travis-ci.org/developit/preact-views.svg)](https://travis-ci.org/developit/preact-views)

**Named views for [Preact], with easy-as-pie linking between them!**

`preact-views` provides a `<Views />` component that renders its children only when their `name` prop is selected as the current "view". The current view name can be set via a prop, or automatically through the provided `<Link />` component.

> **Note:** `preact-views` is simple and does not do orchestration or routing for you. If you're looking for a URL router, try [preact-router](https://github.com/developit/preact-router).

#### [See a Real-world Example :arrow_right:](https://jsfiddle.net/developit/jz95kc33/)

---


### Complete Example

```js
import { Views, Link } from 'preact-views';
import { h, render } from 'preact';

const Home = () => (
	<div>
		<h1>Home!</h1>
		<Link to="other" params={{ value:1 }}>Go Other</Link>
	</div>
);

const Other = ({ value=0 }) => (
	<div>
		<h1>Other.</h1>
		<Link to="home">Go Home</Link>
		<p>value is {value}.</p>
		<Link to="other" params={{ value: value+1 }}>Increment</Link>
	</div>
);

render((
	<Views view="home">
		<Home name="home" />
		<Other name="other" />
	</Views>
), document.body);
```

[**See it running :arrow_right:**](https://jsfiddle.net/developit/jz95kc33/)


---


### Simple Example

```js
import Views from 'preact-views';
import { h, render } from 'preact';

render((
	<Views view="one">
		<div name="one">one</div>
		<div name="two">two</div>
	</Views>
), document.body);

// renders a div containing the text "one"
```


---


### License

[MIT]


[Preact]: https://github.com/developit/preact
[MIT]: http://choosealicense.com/licenses/mit/
