import { h, cloneElement, Component, toChildArray } from 'preact';

/** @example
 *	<Views view="home">
 *		<Home name="home" />
 *		<Other name="other" />
 *	</Views>
 */
export class Views extends Component {
	state = {
		// can pass default view in as a prop
		view: this.props.view,
		params: {}
	};

	// show a given view, optionally with params (props)
	route = (view, params) => {
		params = params || {};
		this.setState({ view, params });
	};

	// if re-rendered with a new "view" prop, set as active view
	componentWillReceiveProps({ view }) {
		if (view!==this.props.view) this.route(view);
	}

	// Expose route() into context so child components can invoke it:
	//   this.context.route('some-view');
	getChildContext() {
		return { route: this.route };
	}

	// Render the child whose `name` prop matches the current view
	render({ children }, { view, params }) {
		let child = toChildArray(children).filter( child => child.props.name===view )[0];
		return child ? cloneElement(child, params) : null;
	}
}


/** Renders an `<a>` that, when clicked, directs to the view indicated by a `to` prop.
*	@param {Object} props
*	@param {String} props.to			The name of a view to switch to
*	@param {Object} [props.params={}]	Props to pass to the view
 *	@example
 *	<Link to="home">Home</Link>
 *	<Link to="foo" params={{ foo:'bar' }}>Foo</Link>
 */
export function Link({ to, params, ...props }, context) {
	if (!props.onClick) props.onClick = () => context.route(to, params);
	return h('a', props);
}


// commonjs is the real king
Views.Views = Views;
Views.Link = Link;
export default Views;
