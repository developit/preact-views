import { Views, Link } from 'src';
import { h, render, options } from 'preact';

// sync is easier for simple tests
options.debounceRendering = f => f();

describe('preact-views', () => {
	let scratch = document.createElement('div'),
		$ = s => scratch.querySelector(s),
		mount = jsx => root = render(jsx, scratch, root),
		root;

	afterEach( () => {
		mount(<nothing />);
		scratch.innerHTML = '';
	});
	
	describe('<Views>', () => {
		it('should render initial view', () => {
			mount(
				<Views view="one">
					<div name="one" />
					<div name="two" />
				</Views>
			);
			
			expect(scratch.innerHTML).to.equal('<div name="one"></div>');
		});
		
		describe('switching', () => {
			const Home = () => (
				<div class="home">
					<h1>Home!</h1>
					<Link to="other" params={{ value:1 }}>Go Other</Link>
				</div>
			);
		
			const Other = ({ value=0 }) => (
				<div class="other">
					<h1>Other.</h1>
					<Link to="home">Go Home</Link>
					<p>value is {value}.</p>
					<Link to="other" params={{ value: value+1 }}>Increment</Link>
				</div>
			);
		
			it('should render when view prop changes', () => {
				mount(
					<Views view="home">
						<Home name="home" />
						<Other name="other" />
					</Views>
				);
				
				expect(scratch.innerHTML).to.equal(`<div class="home"><h1>Home!</h1><a>Go Other</a></div>`);
			
				mount(
					<Views view="other">
						<Home name="home" />
						<Other name="other" />
					</Views>
				);
				
				expect(scratch.innerHTML).to.equal(`<div class="other"><h1>Other.</h1><a>Go Home</a><p>value is 0.</p><a>Increment</a></div>`);
			});
			
			it('should render with props when clicking <Link>s', () => {
				mount(
					<Views view="home">
						<Home name="home" />
						<Other name="other" />
					</Views>
				);
				
				$('a:last-child').click();
				$('a:last-child').click();
				$('a:last-child').click();
				
				expect(scratch.innerHTML).to.equal(`<div class="other"><h1>Other.</h1><a>Go Home</a><p>value is 3.</p><a>Increment</a></div>`);
				
				$('a').click();
				
				expect(scratch.innerHTML).to.equal(`<div class="home"><h1>Home!</h1><a>Go Other</a></div>`);
			});
		});
	});
});
